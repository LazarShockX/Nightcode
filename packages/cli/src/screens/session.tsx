import { useEffect, useMemo, useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router";
import { z } from "zod";
import type { InferResponseType } from "hono/client";

import { SessionShell } from "../components/session-shell";
import { BotMessage, ErrorMessage, UserMessage } from "../components/messages";
import { useToast } from "../providers/toast";
import { apiClient } from "../lib/api-client";
import { getErrorMessage } from "../lib/http-errors";

type SessionData = InferResponseType<(typeof apiClient.sessions)[":id"]["$get"], 200>;

const sessionLocationSchema = z.object({
    session: z.custom<SessionData>((value) => value != null && typeof value === "object" && "id" in value)
});

function ChatMessage({ message }: { message: SessionData["messages"][number] }) {
    if (message.role === "USER") {
        return <UserMessage message={message.content} />;
    }

    if (message.role === "ERROR") {
        return <ErrorMessage message={message.content} />;
    }

    return <BotMessage content={message.content} model={message.model} />;
}

export function Session() {
    const { id } = useParams();
    const location = useLocation();
    const navigate = useNavigate();
    const toast = useToast();

    const prefetched = useMemo(() => {
        const parsed = sessionLocationSchema.safeParse(location.state);
        return parsed.success ? parsed.data.session : null;
    }, [location.state]);

    const [session, setSession] = useState<SessionData | null>(prefetched);

    useEffect(() => {
        // Skip fetch if session was passed via location state
        if (prefetched) return;

        setSession(null);

        if (!id) return;

        let ignore = false;
        const fetchSession = async () => {
            try {
                const res = await apiClient.sessions[":id"].$get({ param: { id }});
                if (ignore) return;
                if (!res.ok) {
                    throw new Error(await getErrorMessage(res));
                }
                const resolved = await res.json();
                setSession(resolved);
            } catch (error) {
                if (ignore) return;
                toast.show({
                    variant: "error",
                    message: error instanceof Error ? error.message : "Failed to load session",
                });
                navigate("/", { replace: true });
            }
        }

        fetchSession();
        return () => {
            ignore = true;
        }
    }, [id, prefetched, toast, navigate]);

    if (!session) {
        return (
            <SessionShell onSubmit={() => {}} inputDisabled loading />
        );
    }

    return (
        <SessionShell onSubmit={() => {}} inputDisabled>
            {session.messages.map((message) => (
                <ChatMessage key={message.id} message={message} />
            ))}
        </SessionShell>
    );
}

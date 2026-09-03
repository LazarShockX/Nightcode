import { useEffect, useMemo, useRef } from "react";
import { z } from "zod";
import { DEFAULT_CHAT_MODEL_ID } from "@nightcode/shared";
import { useLocation, useNavigate } from "react-router";
import { SessionShell } from "../components/session-shell";
import { UserMessage } from "../components/messages";
import { useToast } from "../providers/toast";
import { apiClient } from "../lib/api-client";
import { getErrorMessage } from "../lib/http-errors";

const newSessionStateSchema = z.object({
    message: z.string(),
});

export function NewSession() {
    const location = useLocation();
    const navigate = useNavigate();
    const toast = useToast();
    const hasStartedRef = useRef(false);

    const state = useMemo(() => {
        const parsed = newSessionStateSchema.safeParse(location.state);
        return parsed.success ? parsed.data : null;
    }, [location.state]);

    // Guard: if navigated here without a message, redirect to home
    useEffect(() => {
        if (!state) {
            navigate("/", { replace: true });
        }
    }, [state, navigate]);

    // Optimistic mutation: start a new session with the initial message, but don't wait for the response
    useEffect(() => {
        if (!state || hasStartedRef.current) return;

        hasStartedRef.current = true;

        let ignore = false;
        const createSession = async () => {
            try {
                const res = await apiClient.sessions.$post({
                    json: {
                        title: state.message.slice(0, 100),
                        cwd: process.cwd(),
                        initialMessage: {
                            role: "USER",
                            content: state.message,
                            mode: "BUILD",
                            model: DEFAULT_CHAT_MODEL_ID,
                        },
                    },
                });

                if (ignore) return;
                if (!res.ok) {
                    throw new Error(await getErrorMessage(res));
                }
                const session = await res.json();
                navigate(`/sessions/${session.id}`, { replace: true, state: { session } });
            } catch (error) {
                if (ignore) return;
                toast.show({
                    variant: "error",
                    message: error instanceof Error ? error.message : "Failed to create session",
                });
                navigate("/", { replace: true });
            }
        }

        createSession();
        // Cleanup function to ignore the result of the async operation if the component unmounts
        return () => {
            ignore = true;
        }
    }, [state, navigate, toast]);

    if (!state) {
        return null;
    }

    return (
        <SessionShell onSubmit={() => {}} inputDisabled loading>
            <UserMessage message={state.message} />
        </SessionShell>
    );
}

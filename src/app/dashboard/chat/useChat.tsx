import type { TChatMessagewWithProfile } from "@/types/chat.types";
import { useRef, useState, useEffect } from "react";
import { createClient } from "@/utils/supabase/client";

export const useChat = ({ userId }: { userId: string }) => {
  const supabase = useRef(createClient());
  const [messages, setMessages] = useState<TChatMessagewWithProfile[]>([]);

  useEffect(() => {
    supabase.current
      .from("chat_message")
      .select(
        `
        *, 
        profile:profile (
          id,
          name,
          avatar_path,
          email
        )
        `
      )

      .order("created_at", { ascending: true })
      .then(({ data }) => {
        if (!data) return;
        setMessages(data);
      });

    const channel = supabase.current
      .channel("chat_messages")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "chat_message",
        },
        async (payload) => {
          const { data } = await supabase.current
            .from("chat_message")
            .select(
              `
              *, 
              profile:profile (
                id,
                name,
                avatar_path,
                email
              )
              `
            )
            .eq("id", payload.new.id)
            .single();

          if (data) {
            setMessages((prev) => {
              if (prev.some((msg) => msg.id === data.id)) return prev;
              return [...prev, data];
            });
          }
        }
      )
      .subscribe();

    return () => {
      supabase.current.removeChannel(channel);
    };
  }, []);

  const sendMessage = async (text: string) => {
    if (!text.trim()) return;

    await supabase.current.from("chat_message").insert({
      text,
      user_id: userId,
    });
  };

  return { messages, sendMessage };
};

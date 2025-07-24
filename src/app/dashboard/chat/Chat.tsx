import Image from "next/image";
import { USERS } from "../data/users.data";
import { Paperclip, Send } from "lucide-react";
import { createClient } from "@/utils/supabase/client";
import { useEffect, useRef, useState } from "react";
import { ChatMessage } from "./ChatMessage";
import type { TChatMessagewWithProfile } from "@/types/chat.types";

export function Chat({ userId }: { userId: string }) {
  const supabase = useRef(createClient());
  const [messages, setMessages] = useState<TChatMessagewWithProfile[]>([]);
  const [text, setText] = useState("");

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
            setMessages((prev) => [...prev, data]);
          }
        }
      )
      .subscribe();

    return () => {
      supabase.current.removeChannel(channel);
    };
  }, []);

  const sendMessage = async () => {
    if (!text.trim()) return;

    await supabase.current.from("chat_message").insert({
      text,
      user_id: userId,
    });

    setText("");
  };

  return (
    <div className="flex flex-col h-full">
      {/* Картинка (будет скрыта на низкой высоте) */}
      <div className="chat-header-image relative h-[40%] w-full">
        <Image
          alt="chat"
          src="/images/chat.jpg"
          fill
          className="object-cover"
        />
      </div>

      {/* Контейнер содержимого чата */}
      <div className="flex flex-col flex-1 bg-primary/30">
        {/* Header пользователя */}
        <div className="p-4 flex items-center gap-2 bg-primary/50">
          <Image
            alt="chat-owner"
            src={USERS[2].avatarPath || ""}
            width={40}
            height={40}
            className="rounded-full"
          />
          <div className="leading-snug text-white">
            <div className="font-medium">{USERS[2].name}</div>
            <div className="opacity-60 text-xs font-medium">
              Project Manager
            </div>
          </div>
        </div>

        {/* Сообщения */}
        <div className="flex-1 p-4 overflow-y-auto space-y-4">
          <div className="flex flex-col space-y-4">
            {messages.map((msg) => (
              <ChatMessage key={msg.id} message={msg} userId={userId} />
            ))}
          </div>
        </div>

        {/* Поле ввода */}
        <div className="flex items-center gap-2 bg-primary/50 p-4">
          <button>
            <Paperclip />
          </button>
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Type here..."
            className="flex-1 rounded-md bg-transparent p-2 focus:outline-none"
          />
          <button
            onClick={sendMessage}
            className="rounded-full bg-primary size-9 flex items-center justify-center hover:bg-primary/50 transition-colors"
          >
            <Send size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}

import Image from "next/image";
import { USERS } from "../data/users.data";
import ChatMessage from "./ChatMessage";
import ChatInput from "./ChatInput";
import { useChat } from "./useChat";
import { useMemo } from "react";

export function Chat({ userId }: { userId: string }) {
  const { messages, sendMessage } = useChat({ userId });
  const renderedMessages = useMemo(() => {
    return messages.map((msg) => (
      <ChatMessage key={msg.id} message={msg} userId={userId} />
    ));
  }, [messages, userId]);

  return (
    <div className="flex flex-col h-full">
      <div className="chat-header-image relative h-[40%] w-full">
        <Image
          alt="chat"
          src="/images/chat.jpg"
          fill
          className="object-cover"
        />
      </div>

      <div className="flex flex-col flex-1 bg-primary/30">
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

        <div className="flex-1 p-4 overflow-y-auto space-y-4">
          <div className="flex flex-col space-y-4">{renderedMessages}</div>
        </div>

        <ChatInput sendMessage={sendMessage} />
      </div>
    </div>
  );
}

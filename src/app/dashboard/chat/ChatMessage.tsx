import Image from "next/image";
import { cn } from "@/utils";
import { format } from "date-fns";
import type { TChatMessagewWithProfile } from "@/types/chat.types";
import { memo } from "react";

interface Props {
  message: TChatMessagewWithProfile;
  userId: string;
}

function ChatMessage({ message, userId }: Props) {
  const isOwnMessage = userId === message.user_id;

  return (
    <div
      key={message.id}
      className={cn(
        "flex items-end gap-2",
        isOwnMessage ? "justify-end" : "justify-start"
      )}
    >
      {!isOwnMessage && (
        <Image
          src={message?.profile?.avatar_path || ""}
          alt={message?.profile?.name || ""}
          width={32}
          height={32}
          className="rounded-full"
        />
      )}

      <div className="flex flex-col space-y-1 max-w-[75%]">
        <div
          className={cn(
            "flex items-center whitespace-nowrap text-xs text-gray-300",
            isOwnMessage ? "justify-end" : "justify-start"
          )}
        >
          {isOwnMessage ? (
            <>
              <span className="mr-2 opacity-60">
                {message.created_at
                  ? format(new Date(message.created_at), "hh:mm a")
                  : ""}
              </span>
              <span className="font-medium">Me</span>
            </>
          ) : (
            <>
              <span className="font-medium mr-2">{message?.profile?.name}</span>
              <span className="opacity-60">
                {" "}
                {message.created_at
                  ? format(new Date(message.created_at), "hh:mm a")
                  : ""}
              </span>
            </>
          )}
        </div>

        <div
          className={cn(
            "rounded-xl px-4 py-2 text-sm text-white shadow-md",
            isOwnMessage
              ? "rounded-br-none bg-primary"
              : "rounded-bl-none bg-primary/50"
          )}
        >
          {message.text}
        </div>
      </div>

      {isOwnMessage && (
        <Image
          src={message?.profile?.avatar_path || ""}
          alt={message?.profile?.name || ""}
          width={32}
          height={32}
          className="rounded-full"
        />
      )}
    </div>
  );
}

export default memo(ChatMessage);

import Image from "next/image";
import { USERS } from "../data/users.data";
import { Paperclip, Send } from "lucide-react";
import { cn } from "@/utils";

const messages = [
  {
    id: 1,
    text: "Morning! I've been working on the design elements",
    author: USERS[3],
    own: false,
    time: "09.28 am",
  },
  {
    id: 2,
    text: "That's great to hear! I've been focusing on market research",
    author: USERS[6],
    own: true,
    time: "09.40 am",
  },
  {
    id: 3,
    text: "Morning! I've been working on the",
    author: USERS[4],
    own: false,
    time: "09.47 am",
  },
];

export function Chat() {
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
              <div
                key={msg.id}
                className={cn(
                  "flex items-end gap-2",
                  msg.own ? "justify-end" : "justify-start"
                )}
              >
                {!msg.own && (
                  <Image
                    src={msg.author.avatarPath || ""}
                    alt={msg.author.name}
                    width={32}
                    height={32}
                    className="rounded-full"
                  />
                )}

                <div className="flex flex-col space-y-1 max-w-[75%]">
                  <div
                    className={cn(
                      "flex items-center whitespace-nowrap text-xs text-gray-300",
                      msg.own ? "justify-end" : "justify-start"
                    )}
                  >
                    {msg.own ? (
                      <>
                        <span className="mr-2 opacity-60">{msg.time}</span>
                        <span className="font-medium">Me</span>
                      </>
                    ) : (
                      <>
                        <span className="font-medium mr-2">
                          {msg.author.name}
                        </span>
                        <span className="opacity-60">{msg.time}</span>
                      </>
                    )}
                  </div>

                  <div
                    className={cn(
                      "rounded-xl px-4 py-2 text-sm text-white shadow-md",
                      msg.own
                        ? "rounded-br-none bg-primary"
                        : "rounded-bl-none bg-primary/50"
                    )}
                  >
                    {msg.text}
                  </div>
                </div>

                {msg.own && (
                  <Image
                    src={msg.author.avatarPath || ""}
                    alt={msg.author.name}
                    width={32}
                    height={32}
                    className="rounded-full"
                  />
                )}
              </div>
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
            placeholder="Type here..."
            className="flex-1 rounded-md bg-transparent p-2 focus:outline-none"
          />
          <button className="rounded-full bg-primary size-9 flex items-center justify-center hover:bg-primary/50 transition-colors">
            <Send size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}

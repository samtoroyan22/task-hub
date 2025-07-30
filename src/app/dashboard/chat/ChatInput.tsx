import { Paperclip, Send } from "lucide-react";
import { memo, useState } from "react";

interface Props {
  sendMessage: (text: string) => Promise<void>;
}

function ChatInput({ sendMessage }: Props) {
  const [text, setText] = useState("");

  return (
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
        onClick={() => sendMessage(text).then(() => setText(""))}
        className="rounded-full bg-primary size-9 flex items-center justify-center hover:bg-primary/50 transition-colors"
      >
        <Send size={18} />
      </button>
    </div>
  );
}

export default memo(ChatInput);

import { CheckCircle } from "lucide-react";
import { useMemo } from "react";
import cn from "clsx";
import { motion } from "framer-motion";

interface Props {
  progress: number;
}

export function ProgressBar({ progress }: Props) {
  const clamped = Math.min(100, Math.max(0, progress));

  const progressText = useMemo(() => {
    if (clamped >= 100)
      return (
        <>
          <CheckCircle className="mr-1.5" />
          Done
        </>
      );
    return `${clamped}%`;
  }, [clamped]);

  const colorProgressBar = useMemo(() => {
    if (clamped >= 100) return "bg-emerald-500";
    if (clamped >= 75) return "bg-primary";
    if (clamped >= 50) return "bg-amber-400";
    if (clamped >= 0) return "bg-rose-400";
    return "bg-neutral-300";
  }, [clamped]);

  return (
    <div className="w-full h-12 rounded-full bg-primary/12 overflow-hidden relative">
      <motion.div
        className={cn(
          `h-full cursor-default rounded-full 
          bg-[length:56px_56px] text-white font-medium 
          flex items-center justify-center`,
          colorProgressBar,
          { "animate-stripes": clamped < 100 }
        )}
        initial={{ width: 0 }}
        animate={{ width: `${clamped}%` }}
        transition={{ duration: 1.5, ease: "easeInOut" }}
        style={{
          backgroundImage: `repeating-linear-gradient(-45deg, rgba(255, 255, 255, 0.15) 0, 
              rgba(255, 255, 255, 0.15) 20px, transparent 20px, transparent 40px)`,
        }}
      >
        {progressText}
      </motion.div>
    </div>
  );
}

"use client";

import { observer } from "mobx-react-lite";
import { Plus } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import { createClientSubTask } from "@/services/tasks/task-client.service";

interface Props {
  taskId: string;
}

export const SubTaskCreateModal = observer(({ taskId }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState("");

  const { mutate, isPending } = useMutation({
    mutationKey: ["addSubTask", taskId],
    mutationFn: () => createClientSubTask(taskId, { title }),
    onSuccess: () => {
      toast.success("Subtask added successfully");
      setTitle("");
      setIsOpen(false);
    },
    onError: (error) => {
      toast.error("Failed to add sub task", {
        id: "subtask-add-error",
        description: error as unknown as string,
      });
    },
  });

  const handleAdd = () => {
    if (!title.trim()) {
      toast.error("Subtask title cannot be empty", {
        id: "subtask-empty-title",
      });
      return;
    }

    mutate();
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="bg-primary border border-primary hover:bg-primary/80 text-white transition-colors p-2 rounded-full"
      >
        <Plus size={15} />
      </button>
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
          onClick={() => {
            setIsOpen(false);
          }}
        >
          <div
            className="mx-4 max-h-[90vh] w-full max-w-sm overflow-y-auto rounded-lg bg-white p-6 dark:bg-gray-800"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-xl font-bold">Create a Subtask</h2>
              <button
                onClick={() => {
                  setIsOpen(false);
                }}
                className="text-2xl"
              >
                ×
              </button>
            </div>
            <div className="space-y-6">
              <div className="flex items-center gap-2">
                <Input
                  placeholder="Subtask title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="flex-1"
                />
                <Button onClick={handleAdd} disabled={isPending}>
                  {isPending ? "Adding..." : "Add"}
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
});

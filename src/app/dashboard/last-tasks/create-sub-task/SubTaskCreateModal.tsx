import { observer } from "mobx-react-lite";
import { Plus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import { taskStore } from "@/stores/task.store";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface Props {
  taskId: string;
  onClose: () => void;
}

export const SubTaskCreateModal = observer(({ taskId, onClose }: Props) => {
  const [title, setTitle] = useState("");

  const handleAdd = () => {
    if (!title.trim()) {
      toast.error("Subtask title cannot be empty", {
        id: "subtask-empty-title",
      });
      return;
    }

    taskStore.addSubTask(taskId, { title });
    toast.success("Subtask added successfully");
    setTitle("");
    onClose();
  };
  return (
    <div>
      <Dialog>
        <DialogTrigger className="bg-primary border border-primary hover:bg-primary/80 text-white transition-colors p-2 rounded-full">
          <Plus size={15} />
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create a subtask</DialogTitle>
            <DialogDescription></DialogDescription>
          </DialogHeader>
          <div className="flex items-center gap-2 mt-4">
            <Input
              placeholder="Subtask title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="flex-1"
            />
            <Button onClick={handleAdd}>Save</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
});

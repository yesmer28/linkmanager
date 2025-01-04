import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Plus } from "lucide-react";
import { useLinkStore } from "@/store/useLinkStore";
import { useToast } from "@/components/ui/use-toast";

export function AddLinkDialog() {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [description, setDescription] = useState("");
  const addLink = useLinkStore((state) => state.addLink);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !url) return;

    try {
      new URL(url);
      addLink({ title, url, description });
      toast({
        title: "Enlace agregado",
        description: `Agregado ${title} a tus enlaces`,
      });
      setOpen(false);
      setTitle("");
      setUrl("");
      setDescription("");
    } catch (error) {
      console.error(error);
      toast({
        title: "URL Invalida",
        description: "Por favor ingresa una URL valida",
        variant: "destructive",
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="fixed bottom-4 right-4">
          <Plus className="mr-2 h-4 w-4" /> Agregar Enlace
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Nuevo Enlace</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Input
              placeholder="Titulo"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Input
              placeholder="URL"
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Textarea
              placeholder="Descripcion (opcional)"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <Button type="submit" className="w-full">
            Agregar Enlace
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
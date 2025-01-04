import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Link } from "@/store/useLinkStore";

interface EditLinkDialogProps {
  link: Link;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (link: Partial<Link>) => void;
}

export function EditLinkDialog({ link, open, onOpenChange, onSave }: EditLinkDialogProps) {
  const [title, setTitle] = useState(link.title);
  const [url, setUrl] = useState(link.url);
  const [description, setDescription] = useState(link.description || "");

  useEffect(() => {
    setTitle(link.title);
    setUrl(link.url);
    setDescription(link.description || "");
  }, [link]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !url) return;

    try {
      new URL(url);
      onSave({ title, url, description });
      onOpenChange(false);
    } catch {
      // URL validation error will be handled by the parent component
      return;
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edita Enlace</DialogTitle>
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
            Guardar Cambios
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
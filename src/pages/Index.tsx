import { ThemeToggle } from "@/components/ThemeToggle";
import { AddLinkDialog } from "@/components/AddLinkDialog";
import { EditLinkDialog } from "@/components/EditLinkDialog";
import { LinkCard } from "@/components/LinkCard";
import { useLinkStore } from "@/store/useLinkStore";
import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";
import type { Link } from "@/store/useLinkStore";

const Index = () => {
  const links = useLinkStore((state) => state.links);
  const deleteLink = useLinkStore((state) => state.deleteLink);
  const editLink = useLinkStore((state) => state.editLink);
  const { toast } = useToast();
  const [editingLink, setEditingLink] = useState<Link | null>(null);

  const handleDelete = (id: string, title: string) => {
    deleteLink(id);
    toast({
      title: "Link deleted",
      description: `Removed ${title} from your collection`,
    });
  };

  const handleEdit = (link: Link) => {
    setEditingLink(link);
  };

  const handleSaveEdit = (updatedLink: Partial<Link>) => {
    if (!editingLink) return;
    
    try {
      new URL(updatedLink.url || "");
      editLink(editingLink.id, updatedLink);
      toast({
        title: "Link updated",
        description: `Successfully updated ${updatedLink.title}`,
      });
      setEditingLink(null);
    } catch {
      toast({
        title: "Invalid URL",
        description: "Please enter a valid URL",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-background p-8">
      <ThemeToggle />
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Mis Enlaces</h1>
        <div className="grid gap-4">
          {links.length === 0 ? (
            <div className="text-center text-muted-foreground py-12">
              Aún no tienes enlaces, pulsa el boton de abajo para agregar el primero!
            </div>
          ) : (
            links
              .sort((a, b) => b.createdAt - a.createdAt)
              .map((link) => (
                <LinkCard
                  key={link.id}
                  link={link}
                  onEdit={() => handleEdit(link)}
                  onDelete={() => handleDelete(link.id, link.title)}
                />
              ))
          )}
        </div>
      </div>
      <AddLinkDialog />
      {editingLink && (
        <EditLinkDialog
          link={editingLink}
          open={!!editingLink}
          onOpenChange={(open) => !open && setEditingLink(null)}
          onSave={handleSaveEdit}
        />
      )}
      <footer style={{position: "fixed", bottom: 0, width: "100%"}}>
        <p className="text-center text-muted-foreground">
          Made with ❤️ by{" "}
          <a
            href="https://github.com/yesmer28"
            target="_blank"
            rel="noopener noreferrer"
            className="underline"
          >
            Yesmer Castrillo
          </a>
          </p>
      </footer>
    </div>
  );
};

export default Index;
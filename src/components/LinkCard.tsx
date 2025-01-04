import { Link } from "@/store/useLinkStore";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2, ExternalLink } from "lucide-react";

interface LinkCardProps {
  link: Link;
  onEdit: () => void;
  onDelete: () => void;
}

export function LinkCard({ link, onEdit, onDelete }: LinkCardProps) {
  return (
    <div className="link-card group p-4 rounded-lg border bg-card text-card-foreground shadow-sm hover:shadow-md transition-all duration-200">
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <h3 className="text-lg font-semibold">{link.title}</h3>
          {link.description && (
            <p className="text-sm text-muted-foreground mt-1">{link.description}</p>
          )}
          <a
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-primary hover:underline mt-2 inline-flex items-center gap-1"
          >
            {link.url} <ExternalLink className="h-3 w-3" />
          </a>
        </div>
        <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <Button size="icon" variant="ghost" onClick={onEdit}>
            <Pencil className="h-4 w-4" />
          </Button>
          <Button size="icon" variant="ghost" onClick={onDelete}>
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
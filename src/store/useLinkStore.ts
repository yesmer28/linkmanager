import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { v4 as uuidv4 } from 'uuid';

export interface Link {
  id: string;
  title: string;
  url: string;
  description?: string;
  createdAt: number;
}

interface LinkStore {
  links: Link[];
  addLink: (link: Omit<Link, 'id' | 'createdAt'>) => void;
  deleteLink: (id: string) => void;
  editLink: (id: string, link: Partial<Omit<Link, 'id' | 'createdAt'>>) => void;
}

export const useLinkStore = create<LinkStore>()(
  persist(
    (set) => ({
      links: [],
      addLink: (link) =>
        set((state) => ({
          links: [
            ...state.links,
            {
              ...link,
              id: uuidv4(),
              createdAt: Date.now(),
            },
          ],
        })),
      deleteLink: (id) =>
        set((state) => ({
          links: state.links.filter((link) => link.id !== id),
        })),
      editLink: (id, updatedLink) =>
        set((state) => ({
          links: state.links.map((link) =>
            link.id === id ? { ...link, ...updatedLink } : link
          ),
        })),
    }),
    {
      name: 'links-storage',
    }
  )
);
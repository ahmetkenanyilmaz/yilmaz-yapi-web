type SortableProject = {
  featured: boolean;
  sortOrder: number;
  createdAt: string;
};

/** Öne çıkanlar önce, sonra sıra numarası (küçük = üstte), sonra en yeni. */
export function sortProjectsForDisplay<T extends SortableProject>(projects: T[]): T[] {
  return [...projects].sort((a, b) => {
    if (a.featured !== b.featured) {
      return Number(b.featured) - Number(a.featured);
    }
    if (a.sortOrder !== b.sortOrder) {
      return a.sortOrder - b.sortOrder;
    }
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });
}

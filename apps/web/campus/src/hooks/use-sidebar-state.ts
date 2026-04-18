import { create } from "zustand";

interface SidebarState {
  isSidebarCollapsed: boolean;
  openSidebarBar: () => void;
  closeSidebarBar: () => void;
  toggleSidebarBar: () => void;
}

export const useSidebarState = create<SidebarState>()((set) => ({
  isSidebarCollapsed: false,
  openSidebarBar: () => set({ isSidebarCollapsed: true }),
  closeSidebarBar: () => set({ isSidebarCollapsed: false }),
  toggleSidebarBar: () =>
    set((prev) => ({ isSidebarCollapsed: !prev.isSidebarCollapsed })),
}));

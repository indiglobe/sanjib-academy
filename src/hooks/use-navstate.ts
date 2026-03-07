import { create } from "zustand";

interface NavbarState {
  isNavOpen: boolean;
  openNavBar: () => void;
  closeNavBar: () => void;
  toggleNavBar: () => void;
}

export const useNavbarState = create<NavbarState>()((set) => ({
  isNavOpen: false,
  openNavBar: () => set({ isNavOpen: true }),
  closeNavBar: () => set({ isNavOpen: false }),
  toggleNavBar: () => set((prev) => ({ isNavOpen: !prev.isNavOpen })),
}));

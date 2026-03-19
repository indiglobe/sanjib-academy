import { create } from "zustand";
import { devtools } from "zustand/middleware";

type Animation = {
  played: Record<string, boolean>;
  hasPlayed: (id: string) => boolean;
  markPlayed: (id: string) => void;
};

export const useAnimation = create<Animation>()(
  devtools(
    (set, get) => ({
      played: {},

      hasPlayed: (id) => {
        return !!get().played[id];
      },

      markPlayed: (id) =>
        set(
          (state) => ({
            played: { ...state.played, [id]: true },
          }),
          false,
          "animation/markPlayed",
        ),
    }),
    { name: "animation-store" },
  ),
);

import { create } from "zustand"
import { persist } from "zustand/middleware"

import { chromeStorage } from "~lib/chromeStorage"
import type { BearState, BearValues } from "~types/bears"

import { initialBearState } from "./initialStates/initialBearState"

export const useBearStore = create<BearState>()(
  persist(
    (set, get) => ({
      ...initialBearState,
      setBears: (state) => set(state),
      addABear: () => set({ bears: get().bears + 1 }),
      removeABear: () => set({ bears: Math.max(0, get().bears - 1) }),
      reset: () => set(initialBearState)
    }),
    {
      name: "useBearStore",
      storage: chromeStorage
    }
  )
)

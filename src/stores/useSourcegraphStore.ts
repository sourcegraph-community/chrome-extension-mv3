import { create } from "zustand"
import { persist } from "zustand/middleware"

import { chromeStorage } from "~lib/chromeStorage"
import type { SourcegraphState } from "~types/sourcegraph"

import { initialSourcegraphState } from "./initialStates/initialSourcegraphState"

export const useSourcegraphStore = create<SourcegraphState>()(
  persist(
    (set) => ({
      ...initialSourcegraphState,
      setSourcegraphUrl: (url: string) => set({ url }),
      reset: () => set(initialSourcegraphState)
    }),
    {
      name: "useSourcegraphStore",
      storage: chromeStorage
    }
  )
)

import type { PlasmoCSConfig } from "plasmo"

import { listenForStorageChanges } from "~lib/listenForStorageChanges"
import { useSourcegraphStore } from "~stores/useSourcegraphStore"

export {}
export const config: PlasmoCSConfig = {
  matches: ["https://github.com/*"]
}

listenForStorageChanges("content-script", [
  {
    name: "useSourcegraphStore",
    setStateFunction: useSourcegraphStore.setState
  }
])

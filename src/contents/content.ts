import type { PlasmoCSConfig } from "plasmo"

import { trpcClient } from "~trpc/client"

export const config: PlasmoCSConfig = {
  matches: ["https://www.plasmo.com/*"],
  all_frames: true
}

console.log("Content script from", chrome.runtime.getManifest().name)
;(async () => {
  return
  const { success } = await trpcClient.openNewTab.mutate({
    url: "https://www.google.com"
  })
  console.log("success", success)
})()

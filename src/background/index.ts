import { createChromeHandler } from "trpc-chrome/adapter"

import { useBearStore } from "~stores/useBearStore"
import { appRouter } from "~trpc/server"

createChromeHandler({
  router: appRouter /* 👈 */
})

export {}

console.log(
  "Background script from",
  chrome.runtime.getManifest().name,
  chrome.runtime.getManifest()
)
setTimeout(() => {
  console.log("useBearStore.getState()", useBearStore.getState())
}, 1000)

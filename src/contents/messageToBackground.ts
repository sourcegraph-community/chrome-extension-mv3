import type { PlasmoCSConfig } from "plasmo"

import { sendToBackground } from "@plasmohq/messaging"

import type { RequestBody, ResponseBody } from "~background/messages/ping"

export const config: PlasmoCSConfig = {
  matches: ["https://www.plasmo.com/*"],
  all_frames: true
}

// listner for document ready
console.log("messageToBackground.ts", chrome.runtime.getManifest().name)
;(async () => {
  const resp = await sendToBackground<RequestBody, ResponseBody>({
    name: "ping",
    body: {
      id: 123
    }
  })

  console.log("Response from background:", resp.message)
})()

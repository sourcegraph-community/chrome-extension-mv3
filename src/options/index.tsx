import cssText from "data-text:~style.css"
import type { PlasmoCSConfig } from "plasmo"
import { useEffect } from "react"

import Bears from "~components/bears"
import { listenForStorageChanges } from "~lib/listenForStorageChanges"
import { useBearStore } from "~stores/useBearStore"

import "~style.css"

export const config: PlasmoCSConfig = {
  matches: ["https://www.plasmo.com/*"]
}

export const getStyle = () => {
  const style = document.createElement("style")
  style.textContent = cssText
  return style
}

const PlasmoOverlay = () => {
  useEffect(() => {
    listenForStorageChanges("options", [
      {
        name: "useBearStore",
        setStateFunction: useBearStore.setState
      }
    ])
  }, [])
  return <Bears />
}

export default PlasmoOverlay

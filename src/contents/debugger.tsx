import cssText from "data-text:~style.css"
import type { PlasmoCSConfig } from "plasmo"

import ChromeStorageViewer from "~components/ChromeStorageViewer"
import DevOnly from "~components/DevOnly"

export const config: PlasmoCSConfig = {
  matches: ["https://www.plasmo.com/*"]
}

export const getStyle = () => {
  const style = document.createElement("style")
  style.textContent = cssText
  return style
}

const Debugger = () => {
  return (
    <DevOnly>
      <ChromeStorageViewer />
    </DevOnly>
  )
}

export default Debugger

import cssText from "data-text:~style.css"
import type { PlasmoCSConfig } from "plasmo"

import Bears from "~components/bears"

export const config: PlasmoCSConfig = {
  matches: ["https://www.plasmo.com/*"]
}

export const getStyle = () => {
  const style = document.createElement("style")
  style.textContent = cssText
  return style
}

const PlasmoOverlay = () => {
  return (
    <div>
      <Bears />
    </div>
  )
}

export default PlasmoOverlay

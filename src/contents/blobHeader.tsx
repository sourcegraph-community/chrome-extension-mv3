"use client"

// Import the SVG directly
import sourcegraphLogo from "data-base64:~/../assets/sourcegraph-mark.svg"
import cssText from "data-text:~style.css"
import type {
  PlasmoCSConfig,
  PlasmoCSUIProps,
  PlasmoGetInlineAnchorList
} from "plasmo"

import { useSourcegraphStore } from "~stores/useSourcegraphStore"

export const config: PlasmoCSConfig = {
  matches: ["https://github.com/*"]
}

export const getInlineAnchorList: PlasmoGetInlineAnchorList = async () => {
  const anchors = document.querySelectorAll(
    ".react-blob-header-edit-and-raw-actions, .AppHeader-search, .file-actions>div>div"
  )
  //if (anchors.length !== 0) console.log("anchors founds", anchors)
  return Array.from(anchors).map((element) => ({
    element,
    insertPosition: "beforebegin"
  }))
}

export const getStyle = () => {
  const style = document.createElement("style")
  style.textContent = cssText
  return style
}

export default function FloatingWithProviders({ anchor }: PlasmoCSUIProps) {
  const { url: sourcegraphUrl } = useSourcegraphStore()
  const isDarkMode = !!document.documentElement
    .getAttribute("data-dark-theme")
    ?.startsWith("dark")

  let url: string = window.location.href
    .replace("https://", "")
    .split("/")
    .slice(0, 3)
    .join("/")
  if (anchor?.element.matches(".AppHeader-search")) {
  } else if (anchor?.element.matches(".file-actions>div>div")) {
    let diffHash: string | undefined
    const fragmentUrl = document
      .querySelector("details>details-menu.select-menu-modal[src*='sha1']")
      ?.getAttribute("src")
    if (!fragmentUrl) {
      //console.log("no fragmentUrl")
      return
    }
    // console.log("fragmentUrl", fragmentUrl)
    const urlParams = new URLSearchParams(fragmentUrl.split("?")[1] || "")
    const sha1 = urlParams.get("sha1")
    const sha2 = urlParams.get("sha2")

    if (sha1 && sha2) {
      diffHash = `${sha1}...${sha2}`
    }
    // console.log("diffHash", diffHash)

    // Find the closest ancestor with an ID that starts with "diff" using a CSS selector

    url = `${url}/-/compare/${diffHash}`
  } else {
    url = window.location.href
      .replace("https://", "")
      .replace("/blob/main", "/-/blob")
  }

  // Define classes based on dark mode
  const buttonClasses = isDarkMode
    ? "ml-2 pl-2 pr-2 h-8 flex items-center rounded-md border border-[#444c56] hover:bg-[#2d333b] transition-colors duration-200"
    : "ml-2 pl-2 pr-2 h-8 flex items-center border border-gray-300 rounded-md hover:bg-gray-200 transition-colors duration-200"

  return (
    <a
      href={`${sourcegraphUrl}/${url}`}
      className={buttonClasses}
      target="_blank"
      rel="noopener noreferrer"
      title="Open in Sourcegraph">
      <img src={sourcegraphLogo} alt="Sourcegraph" width="20" height="20" />
      {url.endsWith("ndefined") && "Undefined"}
    </a>
  )
}

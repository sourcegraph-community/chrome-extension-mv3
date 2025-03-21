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

// Keep a global ID for identifying button containers
let buttonContainerId = 0

// Remove duplicate buttons before adding new ones
const cleanupDuplicateButtons = () => {
  // Get all containers that have our data attribute
  const containers = document.querySelectorAll('[data-sourcegraph-button-container]')
  
  // Create a map to track unique containers by their path
  const uniqueContainers = new Map()
  
  containers.forEach(container => {
    const path = container.getAttribute('data-sourcegraph-path')
    const fileId = container.closest('[data-tagsearch-path]')?.getAttribute('data-tagsearch-path') || 
                 container.closest('[data-path]')?.getAttribute('data-path') || 
                 'unknown'
    
    const key = `${fileId}:${path}`
    
    if (uniqueContainers.has(key)) {
      // We already have a container for this path, remove this duplicate
      container.remove()
    } else {
      uniqueContainers.set(key, container)
    }
  })
}

export const getInlineAnchorList: PlasmoGetInlineAnchorList = async () => {
  // First clean up any duplicates
  cleanupDuplicateButtons()
  
  const anchors = document.querySelectorAll(
    ".react-blob-header-edit-and-raw-actions, .AppHeader-search, .file-actions>div>div"
  )
  
  return Array.from(anchors)
    .filter(element => {
      // Check if this element or any of its ancestors already has our button
      let parent = element.parentElement
      while (parent) {
        if (parent.querySelector('[data-sourcegraph-button-container]')) {
          return false
        }
        parent = parent.parentElement
      }
      return true
    })
    .map(element => {
      // Generate a unique identifier for this anchor position
      const id = `sourcegraph-button-${buttonContainerId++}`
      const path = window.location.pathname
      
      // Create a wrapper div to contain our button
      const wrapper = document.createElement('div')
      wrapper.setAttribute('data-sourcegraph-button-container', id)
      wrapper.setAttribute('data-sourcegraph-path', path)
      
      // Insert the wrapper before the anchor element
      element.parentElement?.insertBefore(wrapper, element)
      
      // Return the wrapper as the new anchor point
      return {
        element: wrapper,
        insertPosition: "beforeend" // Insert inside the wrapper
      }
    })
}

export const getStyle = () => {
  const style = document.createElement("style")
  style.textContent = cssText
  return style
}

export default function FloatingWithProviders({ anchor }: PlasmoCSUIProps) {
  const { url: sourcegraphUrl } = useSourcegraphStore()

  // github stores the theme in the document element.
  const githubTheme = window.location.host === 'github.com' ? document.documentElement.dataset.colorMode : 'auto'
  const osThemeIsDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
  const isDarkMode = githubTheme === 'dark' || (githubTheme === 'auto' && osThemeIsDark)

  let url: string = window.location.href
    .replace("https://", "")
    .split("/")
    .slice(0, 3)
    .join("/")

  // Find the closest file-actions or button group
  let actionContainer = anchor?.element.closest('.file-actions, .react-blob-header-edit-and-raw-actions')
  
  // Get file path information
  const filePath = actionContainer?.closest('[data-path]')?.getAttribute('data-path') ||
                 actionContainer?.closest('[data-tagsearch-path]')?.getAttribute('data-tagsearch-path')

  if (anchor?.element.matches(".AppHeader-search")) {
    // Search page handling
  } else if (actionContainer?.closest('.file-actions')) {
    // PR diff view handling
    let diffHash: string | undefined
    const fragmentUrl = document
      .querySelector("details>details-menu.select-menu-modal[src*='sha1']")
      ?.getAttribute("src")
    if (!fragmentUrl) {
      return
    }
    
    const urlParams = new URLSearchParams(fragmentUrl.split("?")[1] || "")
    const sha1 = urlParams.get("sha1")
    const sha2 = urlParams.get("sha2")

    if (sha1 && sha2) {
      diffHash = `${sha1}...${sha2}`
    }

    url = `${url}/-/compare/${diffHash}`
  } else {
    // Regular file view
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
      data-sourcegraph-button="true"
      title="Open in Sourcegraph">
      <img src={sourcegraphLogo} alt="Sourcegraph" width="20" height="20" />
      {url.endsWith("ndefined") && "Undefined"}
    </a>
  )
}

import { Bug, X } from "lucide-react"
import { useState, type ReactNode } from "react"
import Draggable from "react-draggable"

interface DevOnlyProps {
  children: ReactNode
}

const DevOnly = ({ children }: DevOnlyProps) => {
  const [isVisible, setIsVisible] = useState(true)
  if (process.env.NODE_ENV === "production") {
    return null
  }

  return (
    isVisible && (
      <Draggable
        handle=".drag-handle"
        defaultPosition={{ x: 0, y: 0 }}
        bounds="body">
        <div className="fixed top-10 left-6 z-50 flex flex-col bg-white p-4 rounded-lg shadow-lg">
          <div className="drag-handle cursor-move font-bold flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 ">
              <Bug
                size={20}
                className="  rounded-sm bg-[#1e1f1c] text-white p-1"
              />
              Only visible in development mode :<br />
              {chrome.runtime.getManifest().name}
            </div>
            <button
              onClick={() => setIsVisible(false)}
              className="hover:bg-gray-100 p-1 rounded-full">
              <X size={20} />
            </button>
          </div>
          {children}
        </div>
      </Draggable>
    )
  )
}

export default DevOnly

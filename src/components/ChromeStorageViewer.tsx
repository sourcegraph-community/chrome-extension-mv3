import ReactJson from "react-json-view"

import { useChromeStorage } from "~hooks/useChromeStorage"

const ChromeStorageViewer = () => {
  const storage = useChromeStorage()

  return (
    <div className="max-w-lg max-h-[500px] overflow-auto">
      <ReactJson
        src={storage}
        theme="monokai"
        collapsed={1}
        displayDataTypes={true}
        enableClipboard={true}
      />
    </div>
  )
}

export default ChromeStorageViewer

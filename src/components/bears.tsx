import { useBearStore } from "~stores/useBearStore"

import { Button } from "./ui/button"

const Bears = () => {
  const { bears, bigBears, reset, setBears } = useBearStore()
  return (
    <div className="flex items-center justify-center h-16 w-40">
      <p>Extension: {chrome.runtime.getManifest().name}</p>
      <Button
        onClick={() =>
          setBears({
            bears: bears + 5
          })
        }>
        add 5 bears {bears} - {bigBears}
      </Button>
      <Button
        onClick={() =>
          setBears({
            bigBears: bigBears + 5
          })
        }>
        add 5 big bears {bears} - {bigBears}
      </Button>
      <Button onClick={() => reset()}>
        reset {bears} - {bigBears}
      </Button>
    </div>
  )
}

export default Bears

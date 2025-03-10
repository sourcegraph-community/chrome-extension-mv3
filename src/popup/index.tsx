import { useEffect } from "react"

import Bears from "~components/bears"
import Example from "~components/Example"
import ChromeTrpcProvider from "~components/TRPCProvider"
import { listenForStorageChanges } from "~lib/listenForStorageChanges"
import { useBearStore } from "~stores/useBearStore"

import "~style.css"

function IndexPopup() {
  useEffect(() => {
    listenForStorageChanges("popup", [
      {
        name: "useBearStore",
        setStateFunction: useBearStore.setState
      }
    ])
  }, [])
  return (
    <ChromeTrpcProvider>
      <div className="w-44">
        <Example />
      </div>
      <Bears />
    </ChromeTrpcProvider>
  )
}

export default IndexPopup

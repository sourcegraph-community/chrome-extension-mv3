import { listenForStorageChanges } from "~lib/listenForStorageChanges"
import { useBearStore } from "~stores/useBearStore"

export {}
console.log("Storage change listener initialized!")

listenForStorageChanges("content-script", [
  {
    name: "useBearStore",
    setStateFunction: useBearStore.setState
  }
])

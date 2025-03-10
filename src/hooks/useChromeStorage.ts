import { useEffect, useState } from "react"

export const useChromeStorage = () => {
  const [storage, setStorage] = useState({})
  useEffect(() => {
    chrome.storage.local.get(null, (result) => {
      setStorage(result)
    })
    const listener = () => {
      chrome.storage.local.get(null, (result) => {
        setStorage(result)
      })
    }
    chrome.storage.onChanged.addListener(listener)

    return () => {
      chrome.storage.onChanged.removeListener(listener)
    }
  }, [])
  return storage
}

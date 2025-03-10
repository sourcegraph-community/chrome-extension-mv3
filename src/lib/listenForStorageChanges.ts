export type StoreConfig = {
  name: string
  setStateFunction: (state: any) => void
}

export const listenForStorageChanges = (
  page: string,
  stores: StoreConfig[]
) => {
  chrome.storage.onChanged.addListener((changes, namespace) => {
    console.log("changes on page", page, changes, "namespace", namespace)
    if (namespace === "local") {
      stores.forEach(({ name, setStateFunction }) => {
        if (changes[name]) {
          console.log(`${name} store changed!`)
          setStateFunction(changes[name].newValue.state)
        }
      })
    }
  })
}

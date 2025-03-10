export const chromeStorage = {
  getItem: <T = string>(name: string): Promise<T | null> => {
    return new Promise((resolve) => {
      chrome.storage.local.get([name], (result) => {
        resolve(result[name] || null)
      })
    })
  },
  setItem: <T = string>(name: string, value: T): Promise<void> => {
    return new Promise<void>((resolve) => {
      chrome.storage.local.set({ [name]: value }, () => {
        resolve()
      })
    })
  },
  removeItem: (name: string): Promise<void> => {
    return new Promise<void>((resolve) => {
      chrome.storage.local.remove(name, () => {
        resolve()
      })
    })
  }
}

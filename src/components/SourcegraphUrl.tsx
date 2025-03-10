import { useEffect, useState } from "react"

import { useSourcegraphStore } from "~stores/useSourcegraphStore"

import { Button } from "./ui/button"

const SourcegraphUrl = () => {
  const { url, setSourcegraphUrl } = useSourcegraphStore()
  const [inputValue, setInputValue] = useState(url)

  useEffect(() => {
    setInputValue(url)
  }, [url])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSourcegraphUrl(inputValue)
  }

  return (
    <div className="p-4">
      <h2 className="text-lg font-semibold mb-2">Sourcegraph URL</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <input
          type="text"
          value={inputValue}
          onChange={handleChange}
          className="border border-gray-300 rounded px-2 py-1"
          placeholder="Enter Sourcegraph URL"
        />
        <Button type="submit">Save</Button>
      </form>
    </div>
  )
}

export default SourcegraphUrl

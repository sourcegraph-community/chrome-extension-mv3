import { trpc } from "~trpc/client"

const Example = () => {
  // Query example
  const { data, isLoading } = trpc.ping.useQuery({ id: 1 })

  // Mutation example
  const { mutate } = trpc.openNewTab.useMutation({
    onSuccess: () => {
      console.log("Tab opened successfully!")
    }
  })

  return (
    <div>
      <p>Message: {data ? data.message : "Loading..."}</p>
      <button
        onClick={() => {
          mutate({ url: "https://www.google.com" })
        }}>
        Open New Tab
      </button>
    </div>
  )
}

export default Example

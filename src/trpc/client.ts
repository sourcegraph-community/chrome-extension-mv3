import { createTRPCProxyClient, createTRPCReact } from "@trpc/react-query"
import { chromeLink } from "trpc-chrome/link"

import type { AppRouter } from "~trpc/server"

const port = chrome.runtime.connect()
export const trpc = createTRPCReact<AppRouter>()
export const trpcClient = createTRPCProxyClient<AppRouter>({
  links: [chromeLink({ port })]
})

import type { SourcegraphValues } from "~types/sourcegraph"

export const initialSourcegraphState = {
  url: "https://sourcegraph.com"
} as const satisfies SourcegraphValues

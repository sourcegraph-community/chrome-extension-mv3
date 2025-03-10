export type SourcegraphValues = {
  url: string
}

export type SourcegraphState = SourcegraphValues & {
  setSourcegraphUrl: (url: string) => void
  reset: () => void
}

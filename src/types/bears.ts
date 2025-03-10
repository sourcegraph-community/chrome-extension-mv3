export type BearValues = {
  bears: number
  bigBears: number
}
export type BearState = BearValues & {
  setBears: (state: Partial<BearValues>) => void
  addABear: () => void
  removeABear: () => void
  reset: () => void
}

import { CONFIG } from "~constants/config"

export const sleep = (ms: number = CONFIG.delay) =>
  new Promise((resolve) => setTimeout(resolve, ms))

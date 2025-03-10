import { t } from "~trpc/t"

import { pingRouter } from "./routes/ping"
import { tabsRouter } from "./routes/tabs"

export const appRouter = t.mergeRouters(pingRouter, tabsRouter)

export type AppRouter = typeof appRouter

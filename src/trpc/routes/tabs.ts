import { z } from "zod"

import { t } from "~trpc/t"

export const tabsRouter = t.router({
  openNewTab: t.procedure
    .input(z.object({ url: z.string().url() }))
    .mutation(async ({ input }) => {
      await chrome.tabs.create({ url: input.url, active: false })
      return { success: true }
    })
})

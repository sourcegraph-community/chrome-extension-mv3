import { z } from "zod"

import { t } from "~trpc/t"

export const pingRouter = t.router({
  ping: t.procedure
    .input(
      z.object({
        id: z.number()
      })
    )
    .query(async ({ input }) => {
      const { id } = input
      await new Promise((resolve) => setTimeout(resolve, 2000))
      return {
        message: `👋 Hello from background ${id}`
      }
    })
})

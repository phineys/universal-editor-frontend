// server/cron/job.ts
import { defineCronHandler } from '#nuxt/cron'

export default defineCronHandler(
  () => '* * * * * ',
  () => {
    console.log('Hello, world!')
  }
)

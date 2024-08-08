import { defineEventHandler, H3Error, getQuery } from 'h3'

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const path = query.path as string

  const url = `${useRuntimeConfig().public.devAuthor}/${
    path.split(':/')[1]
  }.tidy.infinity.json`

  try {
    const response = await fetch(url, {
      headers: {
        Authorization: `${useRuntimeConfig().public.devCredentials}`
      }
    })

    if (!response.ok) {
      throw new H3Error('Failed to fetch data from the server')
    }

    const data = await response.json()

    return data
  } catch (error) {
    if (error instanceof H3Error) {
      return {
        statusCode: 500,
        statusMessage: error.message
      }
    } else {
      return {
        statusCode: 500,
        statusMessage: 'An unexpected error occurred'
      }
    }
  }
})

export const fetchData = async (path: String) => {
  let url = `${useRuntimeConfig().public.devAuthor}/${
    path.split(':/')[1]
  }.tidy.infinity.json`
  try {
    const data = await fetch(url, {
      method: 'GET',
      credentials: 'include',
      headers: {
        Authorization: `${useRuntimeConfig().public.devCredentials}`,
        mode: 'no-cors'
      }
    })
    const json = await data.json()
    return json
  } catch (error) {
    return 'ERROR'
  }
}

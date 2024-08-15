import { useRoute } from "vue-router";

export const fetchData = async (path: String) => {

 const route = useRoute();
 const hasEnvParam = route.query.env === 'ue';
 console.log('hasEnvParam', hasEnvParam)

  const url = `${hasEnvParam ? useRuntimeConfig().public.devAuthor : useRuntimeConfig().public.devPublisher }/${path.split(':/')[1]}.tidy.infinity.json`
  try {
    const data = await fetch(url, {
      method: 'GET',
      credentials: 'include',
      // headers: {
      //   'Authorization': `${useRuntimeConfig().public.devCredentials}`,
      // }
    })
    const json = await data.json()
    return json
  } catch (error) {
    return 'ERROR'
  }
}

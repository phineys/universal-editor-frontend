export const fetchData = async (path: String) => {

  var isInFrame = null
  var iframeUrl = null

if (typeof window !== 'undefined') {
    // Prüfen ob die Seite in einem iFrame geladen wurde
    isInFrame = window.self !== window.top
    
    // URL des iFrames ermitteln
    iframeUrl = document.referrer || 'Keine URL verfügbar'
  }

  console.log('isInFrame: ', isInFrame)
  console.log('iframeUrl: ', iframeUrl)

  let url = `${useRuntimeConfig().public.devAuthor}/${
    path.split(':/')[1]
  }.tidy.infinity.json`
  try {
    const data = await fetch(url, {
      // credentials: 'include',
      headers: {
        Authorization: useRuntimeConfig().public.devCredentials
      }
    })
    const json = await data.json()
    console.log('DATA: ', json)
    return json
  } catch (error) {
    return 'ERROR'
  }
}

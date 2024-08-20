export const fetchData = async (path: String) => {
  var isInFrame = null;
  var iframeUrl = null;

  if (typeof window !== 'undefined') {
    isInFrame = window.self !== window.top;
    iframeUrl = document.referrer || 'Keine URL verfügbar';
  }

  const isUE = isInFrame && iframeUrl === 'https://experience.adobe.com/' ? true : false;
  console.log('ISUE: ', isUE);

  const config = useRuntimeConfig();
  const baseUrl = isUE === true ? config.public.devAuthor : config.public.devPublisher;

  const url = `${baseUrl}/${path.split(':/')[1]}.tidy.infinity.json`;
  console.log('URL', url);

  const { data, error } = await useFetch('/api/get-content', {
    method: 'POST',
    body: {
      isUE: isUE,
      url: url,
    },
  });

  if (error.value) {
    console.log('Error', error);
  }

  return data.value;
};

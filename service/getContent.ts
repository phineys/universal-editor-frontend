export const fetchData = async (path: String) => {
  var isInFrame = null;
  var iframeUrl = null;
  var token = null;
  var fetchOptions = {};

  if (typeof window !== 'undefined') {
    isInFrame = window.self !== window.top;
    iframeUrl = document.referrer || 'Keine URL verfügbar';
  }

  const isUE = isInFrame && iframeUrl === 'https://experience.adobe.com/' ? true : false;
  console.log('ISUE: ', isUE);

  const url = `${isUE ? useRuntimeConfig().public.devAuthor : useRuntimeConfig().public.devPublisher}/${path.split(':/')[1]}.tidy.infinity.json`;

  if (isUE) {
    const { data, error } = await useFetch('/api/generateToken');
    console.log('RESPONSE: ', data);
    console.log('ERR: ', error);
    token = data?.value;
    console.log('TOKEN: ', token);
    fetchOptions = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
  }
  try {
    const data = await fetch(url, fetchOptions);
    const json = await data.json();
    console.log('DATA: ', json);
    return json;
  } catch (error) {
    return 'ERROR';
  }
};

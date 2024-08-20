export const fetchData = async (path: String) => {
  var isInFrame = null;
  var iframeUrl = null;

  if (typeof window !== 'undefined') {
    isInFrame = window.self !== window.top;
    iframeUrl = document.referrer || 'Keine URL verfügbar';
  }

  const isUE = isInFrame && iframeUrl === 'https://experience.adobe.com/' ? true : false;
  console.log('ISUE: ', isUE);

  const { data, error } = await useFetch('/api/get-content', {
    method: 'POST',
    body: {
      isUE: isUE,
      path: path,
    },
  });

  if (error.value) {
    console.log('Error', error);
  }

  console.log('DATA: ', data);
};

export const isUe = () => {
  var isInFrame = null;
  var iframeUrl = null;

  if (typeof window !== 'undefined') {
    isInFrame = window.self !== window.top;
    iframeUrl = document.referrer || 'Keine URL verfügbar';
  }

  const isUE = isInFrame && iframeUrl === 'https://experience.adobe.com/' ? true : false;

  return isUE;
};

export const extractAndRemoveNestedObjects = (obj: any) => {
  const nestedObjects = [];
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      nestedObjects.push({ key: key, value: obj[key] });
      delete obj[key];
    }
  }
  return nestedObjects;
};

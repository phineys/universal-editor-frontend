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
  console.log('originalObject', obj);
  const objCopy = { ...obj };
  const nestedObjects = [];

  for (const key in objCopy.value) {
    if (objCopy.hasOwnProperty(key)) {
      nestedObjects.push({ key: key, value: objCopy[key] });
      delete objCopy[key];
    }
  }
  console.log('nestedObject', nestedObjects);
  return nestedObjects;
};

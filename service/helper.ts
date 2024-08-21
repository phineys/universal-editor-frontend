import model from '../public/model-definition.json';

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
  // console.log('originalObject', obj._value);
  const objCopy = { ...obj._value };
  const nestedObjects = [];

  for (const key in objCopy) {
    if (objCopy.hasOwnProperty(key) && typeof objCopy[key] === 'object' && objCopy[key] !== null) {
      nestedObjects.push({ key: key, value: objCopy[key] });
      // delete objCopy[key];
    }
  }
  console.log('nestedObject', nestedObjects);
  return nestedObjects;
};

export const getComponentProps = (component: any, ressourceType: string) => {
  console.log('component', component);
  console.log('ressourceType', ressourceType);

  if (!ressourceType || !model || !model.length || !component) {
    return {};
  }

  const props: any = {};
  const componentModel = model.find((item: any) => `pf/components/${item.id}` === ressourceType);

  if (componentModel && componentModel.fields) {
    componentModel.fields.forEach((field: any) => {
      props[field.name] = component[field.name];
    });
  }

  return props;
};

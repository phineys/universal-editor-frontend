<script setup>
import { ref, onMounted } from 'vue';
import { isUe, extractAndRemoveNestedObjects, getComponentProps } from '@/service/helper';
import Hero from './Hero.vue';
import KeyFacts from './KeyFacts.vue';
// import TextImage from './TextImage.vue';

const nameToComponent = {
  'pf/components/hero': Hero,
  'pf/components/keyfacts': KeyFacts,
  // 'pf/components/textimage': TextImage
};

const props = defineProps({
  resource: {
    type: String,
    default: '',
    required: true,
  },
});

const config = useRuntimeConfig();
const baseUrl = isUe() === true ? config.public.devAuthor : config.public.devPublisher;

const url = `${baseUrl}/${props.resource.split(':/')[1]}.tidy.infinity.json`;
console.log('URL', url);

// const { data: containerData, error } = await useFetch('/api/get-content', {
//   method: 'POST',
//   body: {
//     isUE: isUe(),
//     url: url,
//   },
// });

// if (error.value) {
//   console.log('Error', error);
// }

const fetchOptions = {};

if (isUE === true) {
  const token = await $fetch('/api/generateToken').catch((error) => {
    throw createError({
      statusCode: 500,
      statusMessage: `Failed get token from ${url}: ${error.message}`,
    });
  });
  console.log('TOKEN: ', token);

  fetchOptions.headers = {
    Authorization: `Bearer ${token}`,
    'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
    Pragma: 'no-cache',
    Expires: '0',
    'Surrogate-Control': 'no-store',
  };
}

const containerData = await $fetch(url, fetchOptions).catch((error) => {
  throw createError({
    statusCode: 500,
    statusMessage: `Failed to fetch data from ${url}: ${error.message}`,
  });
});

const formattedData = extractAndRemoveNestedObjects(containerData);
</script>

<template>
  <div
    class="container"
    data-aue-filter="container"
    data-aue-model="container"
    data-aue-behavior="container"
    :data-aue-resource="props.resource"
    data-aue-type="container"
  >
    <component
      :is="nameToComponent[component.value['sling:resourceType']]"
      v-for="(component, i) in formattedData"
      :key="`${props.resource}/${component.key}`"
      :resource="`${props.resource}/${component.key}`"
      :values="getComponentProps(component.value, component.value['sling:resourceType'])"
    />
  </div>
</template>

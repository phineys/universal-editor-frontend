<script setup>
import { ref, onMounted } from 'vue';
import { isUe, extractAndRemoveNestedObjects } from '@/service/helper';
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

const { data: containerData, error } = await useFetch('/api/get-content', {
  method: 'POST',
  body: {
    isUE: isUe(),
    url: url,
  },
});

if (error.value) {
  console.log('Error', error);
}

const formattedData = extractAndRemoveNestedObjects(containerData);
</script>

<template>
  <h2>Container Data</h2>
  <p>{{ containerData }}</p>
  <h2>Cloned Data</h2>
  <p>{{ formattedData }}</p>
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
    />
  </div>
</template>

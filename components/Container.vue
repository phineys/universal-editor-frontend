<script setup>
import { ref, onMounted } from 'vue';
import { isUe, extractAndRemoveNestedObjects } from '@/service/helper';
// import Hero from './Hero.vue';
// import KeyFacts from './KeyFacts.vue';
// import TextImage from './TextImage.vue';

const props = defineProps({
  resource: {
    type: String,
    default: '',
    required: true,
  },
});

// const containerData = ref();
const loading = ref(false);
let nestedObjects = ref([]);

const config = useRuntimeConfig();
const baseUrl = isUe() === true ? config.public.devAuthor : config.public.devPublisher;

const url = `${baseUrl}/${props.resource.split(':/')[1]}.tidy.infinity.json`;
console.log('URL', url);

const { data: containerData, error } = await useFetch('/api/get-content', {
  method: 'POST',
  body: {
    isUE: isUe,
    url: url,
  },
});

if (error.value) {
  console.log('Error', error);
}

nestedObjects = toRef(() => extractAndRemoveNestedObjects(containerData.value));
// nestedObjects.value = extractAndRemoveNestedObjects(containerData.value);
// loading.value = true;

const nameToComponent = {
  // 'pf/components/hero': Hero,
  // 'pf/components/keyfacts': KeyFacts,
  // 'pf/components/textimage': TextImage
};
</script>

<template>
  <h2>containerData</h2>
  <p>{{ containerData }}</p>
  <h2>Nested Object</h2>
  <p>{{ nestedObjects }}</p>
  <!-- <div
    v-if="loading"
    class="container"
    data-aue-filter="container"
    data-aue-model="container"
    data-aue-behavior="container"
    :data-aue-resource="props.resource"
    data-aue-type="container"
  >
    <p>{{ nestedObjects }}</p>
    <component
      :is="nameToComponent[component.value['sling:resourceType']]"
      v-for="(component, i) in nestedObjects"
      :key="`${props.resource}/${component.key}`"
      :resource="`${props.resource}/${component.key}`"
    />
  </div> -->
</template>

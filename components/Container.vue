<script setup>
import { ref, onMounted } from 'vue';
import { fetchData } from '@/service/getContent';
import Hero from './Hero.vue';
import KeyFacts from './KeyFacts.vue';
// import TextImage from './TextImage.vue';

const props = defineProps({
  resource: {
    type: String,
    default: '',
    required: true,
  },
});

const containerData = ref();

const nestedObjects = ref([]);

function extractAndRemoveNestedObjects(obj) {
  const nestedObjects = [];
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      nestedObjects.push({ key: key, value: obj[key] });
      delete obj[key];
    }
  }
  return nestedObjects;
}

containerData.value = await fetchData(props.resource);
console.log(containerData.value);
nestedObjects.value = extractAndRemoveNestedObjects(containerData.value);
console.log(nestedObjects.value);

const nameToComponent = {
  'pf/components/hero': Hero,
  'pf/components/keyfacts': KeyFacts,
  // 'pf/components/textimage': TextImage
};
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
    <p>{{ nestedObjects }}</p>
    <component
      :is="nameToComponent[component.value['sling:resourceType']]"
      v-for="(component, i) in nestedObjects.value"
      :key="i"
      :resource="`${props.resource}/${component.key}`"
    />
  </div>
</template>

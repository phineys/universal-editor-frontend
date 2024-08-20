<script setup lang="ts">
import { fetchData } from '@/service/getContent';
import Hero from '@/components/Hero.vue';
import KeyFacts from '@/components/KeyFacts.vue';
// import TextImage from '@/components/TextImage.vue'

const props = defineProps({
  resource: {
    type: String,
    default: '',
    required: true,
  },
});

const containerData = fetchData(props.resource);

interface JSONObject {
  [key: string]: any;
}

interface NestedObject {
  key: string;
  value: JSONObject;
}

function extractAndRemoveNestedObjects(obj: JSONObject): NestedObject[] {
  const nestedObjects: NestedObject[] = [];
  for (const key in obj) {
    if (obj.hasOwnProperty(key) && typeof obj[key] === 'object' && !Array.isArray(obj[key])) {
      nestedObjects.push({ key: key, value: obj[key] });
      delete obj[key];
    }
  }
  return nestedObjects;
}

const nestedObjects = containerData.value ? extractAndRemoveNestedObjects(containerData.value) : [];

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
      v-for="(component, i) in nestedObjects"
      :key="i"
      :resource="`${props.resource}/${component.key}`"
    />
  </div>
</template>

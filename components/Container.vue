<script setup lang="ts">
import { fetchData } from '@/service/getContent'
import Hero from '@/components/Hero.vue'
import KeyFacts from '@/components/KeyFacts.vue'
import TextImage from '@/components/TextImage.vue'
import { ref, onMounted } from 'vue'

const props = defineProps({
  resource: {
    type: String,
    default: '',
    required: true
  }
})
// const route = useRoute()
// const data = ref<Content | null>(null)
// const error = ref<string | null>(null)

// const { data: responseData, error: fetchError } = await useAsyncData<Content>('getContentData', () => {
//   return $fetch(`/api/content?path=${props.resource}`)
// })

// if (fetchError.value) {
//   error.value = fetchError.value.message
// } else {
//   data.value = responseData.value
// }
// console.log('data', data.value)

let containerData = ref(await fetchData(props.resource))

interface JSONObject {
  [key: string]: any
}

interface NestedObject {
  key: string
  value: JSONObject
}

function extractAndRemoveNestedObjects(obj: JSONObject): NestedObject[] {
  const nestedObjects: NestedObject[] = []
  for (const key in obj) {
    if (
      obj.hasOwnProperty(key) &&
      typeof obj[key] === 'object' &&
      !Array.isArray(obj[key])
    ) {
      nestedObjects.push({ key: key, value: obj[key] })
      delete obj[key]
    }
  }
  return nestedObjects
}

const nestedObjects = extractAndRemoveNestedObjects(containerData.value)

const nameToComponent = {
  'pf/components/hero': Hero,
  'pf/components/keyfacts': KeyFacts,
  'pf/components/textimage': TextImage
}
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
      v-for="(component, i) in nestedObjects"
      :key="i"
      :resource="`${props.resource}/${component.key}`"
    />
  </div>
</template>

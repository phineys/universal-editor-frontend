<script setup lang="ts">
import { isUe } from '@/service/helper';

const props = defineProps({
  resource: {
    type: String,
    default: '',
    required: true,
  },
  values: {
    title: String,
    text: String,
  },
});

// const config = useRuntimeConfig();
// const baseUrl = isUe() === true ? config.public.devAuthor : config.public.devPublisher;

// const url = `${baseUrl}/${props.resource.split(':/')[1]}.tidy.infinity.json`;
// console.log('URL', url);

// const { data: heroData, error } = await useFetch('/api/get-content', {
//   method: 'POST',
//   body: {
//     isUE: isUe(),
//     url: url,
//   },
// });

// if (error.value) {
//   console.log('Error', error);
// }
</script>

<template>
  <div
    class="hero pb-24 sm:pb-32 pt-8 text-center mx-auto"
    :data-aue-resource="resource"
    data-aue-type="component"
    data-aue-label="Hero"
    data-aue-model="hero"
  >
    <h2
      class="hero__header text-white text-4xl font-extrabold tracking-normal md:text-6xl xl:text-8xl"
      data-aue-prop="title"
      data-aue-type="text"
      data-aue-label="title"
    >
      {{ values.title }}
    </h2>
    <span
      class="hero__description mx-auto mt-6 text-xl leading-relaxed text-white"
      data-aue-prop="text"
      data-aue-type="richtext"
      data-aue-label="text"
      >{{ values.text }}
    </span>
  </div>
</template>

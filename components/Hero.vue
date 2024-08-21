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
      {{ values?.title }}
    </h2>
    <span
      class="hero__description mx-auto mt-6 text-xl leading-relaxed text-white"
      data-aue-prop="text"
      data-aue-type="richtext"
      data-aue-label="text"
      >{{ values?.text }}
    </span>
  </div>
</template>

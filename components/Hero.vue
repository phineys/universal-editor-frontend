<script setup lang="ts">
import { fetchData } from '@/service/getContent';

const props = defineProps({
  resource: {
    type: String,
    default: '',
    required: true,
  },
});

const heroData = ref(await fetchData(props.resource));
console.log('----HERO DATA----');
console.log(heroData.value);
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
      {{ heroData?.title }}
    </h2>
    <span
      class="hero__description mx-auto mt-6 text-xl leading-relaxed text-white"
      data-aue-prop="text"
      data-aue-type="richtext"
      data-aue-label="text"
      >{{ heroData?.text }}
    </span>
  </div>
</template>

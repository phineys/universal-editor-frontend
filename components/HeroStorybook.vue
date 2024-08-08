<template>
  <div>
    <!-- Hier kommt dein HTML-Template für die Komponente -->
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
        {{ title }}
      </h2>
      <p
        class="hero__description mx-auto mt-6 text-xl leading-relaxed text-white"
        data-aue-prop="text"
        data-aue-type="richtext"
        data-aue-label="text"
      >
        {{ text }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  title: {
    type: String,
    default: 'Test Title',
    required: true
  },
  text: {
    type: String,
    default: 'Test Text',
    required: true
  }
})
</script>

<script setup lang="ts">

const props = defineProps({
  resource: {
    type: String,
    default: '',
    required: true
  }
})

let componentData = ref(await fetchData(props.resource))
</script>

<template>
  <div
    class="flex flex-col lg:border-0 lg:pt-20 2xl:pt-32 md:mb-0 mb-12"
  >
    <div
      class="lg:grid-cols-2 max-w-7xl lg:grid gap-x-20"
    >
      <!-- Text block -->
      <div
        class="lg:col-span-1"
      >
        <div>
          <h2
            v-if="componentData.title"
            class="text-3xl font-bold tracking-normal md:text-4xl xl:text-3xl text-white"
            v-html="componentData.title"
          />
          <p
            v-if="componentData.description"
            class="mt-8 text-xl text-white leading-relaxed"
            v-html="componentData.description"
          />
        </div>
      </div>
      <!-- Picture right -->
      <div
        class="lg:col-span-1 max-w-2xl lg:pt-0 lg:max-w-none items-center hidden lg:flex lg:py-0"
      >
        <nuxt-picture
          format="png,svg,jpeg,jpg"
          :src="`${runtimeConfig?.public?.devAuthor}${componentData.image}`"
          alt="KeyFacts Image"
          :preload="false"
          loading="lazy"
          fetchpriority="low"
          decoding="async"
          :width="320"
          :height="320"
          class="ml-auto object-center object-contain lg-w-auto mr-auto"
          style="max-width: 250px;max-height: 250px;"
        />
      </div>
    </div>
  </div>
</template>


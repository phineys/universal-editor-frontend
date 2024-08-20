<script setup lang="ts">
import { fetchData } from '@/service/getContent';

const runtimeConfig = useRuntimeConfig();

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

const { data: factsData, error } = await useFetch('/api/get-content', {
  method: 'POST',
  body: {
    isUE: isUe,
    url: url,
  },
});

if (error.value) {
  console.log('Error', error);
}
</script>

<template>
  <div
    class="grid grid-cols-3 mx-auto"
    :data-aue-resource="resource"
    data-aue-type="component"
    data-aue-label="Key Facts"
    data-aue-model="keyfacts"
    data-aue-behavior="container"
  >
    <div class="hidden md:block col-span-1 text-start mt-12">
      <p
        class="text-3xl md:text-5xl font-bold text-white mb-1"
        data-aue-prop="firstTitle"
        data-aue-type="text"
        data-aue-label="First Title"
      >
        {{ factsData.firstTitle }}
      </p>
      <p
        class="text-xl font-normal text-white border-t border-gray-300 mt-1"
        data-aue-prop="firstText"
        data-aue-type="text"
        data-aue-label="First Text"
      >
        {{ factsData.firstText }}
      </p>

      <p
        class="text-3xl md:text-5xl font-bold text-white mb-1 mt-24"
        data-aue-prop="secondTitle"
        data-aue-type="text"
        data-aue-label="Second Title"
      >
        {{ factsData.secondTitle }}
      </p>
      <p
        class="text-xl font-normal text-white border-t border-gray-300 mt-1"
        data-aue-prop="secondText"
        data-aue-type="text"
        data-aue-label="Second Text"
      >
        {{ factsData.secondText }}
      </p>
    </div>
    <div
      class="col-span-3 md:col-span-1"
      data-aue-prop="image"
      data-aue-type="media"
      data-aue-label="Image"
    >
      <nuxt-picture
        v-if="factsData.image"
        format="png,svg,jpeg,jpg"
        :src="`${runtimeConfig?.public?.devAuthor}${factsData.image}`"
        alt="KeyFacts Image"
        :width="320"
        :height="320"
        loading="lazy"
        fetchpriority="low"
        decoding="async"
        class="ml-auto md:block hidden lg:w-4/5 object-center object-contain"
      />
    </div>

    <div class="block md:hidden col-span-3 text-start md:mt-12">
      <p
        class="text-3xl md:text-5xl font-bold text-white mb-1"
        data-aue-prop="firstTitle"
        data-aue-type="text"
        data-aue-label="First Title"
      >
        {{ factsData.firstTitle }}
      </p>
      <p
        class="text-xl font-normal text-white border-t border-gray-300 mt-1 mb-6 md:mb-0"
        data-aue-prop="firstText"
        data-aue-type="text"
        data-aue-label="First Text"
      >
        {{ factsData.firstText }}
      </p>

      <p
        class="text-3xl md:text-5xl font-bold text-white mb-1 md:mt-24"
        data-aue-prop="secondTitle"
        data-aue-type="text"
        data-aue-label="Second Title"
      >
        {{ factsData.secondTitle }}
      </p>
      <p
        class="text-xl font-normal text-white border-t border-gray-300 mt-1 mb-6 md:mb-0"
        data-aue-prop="secondText"
        data-aue-type="text"
        data-aue-label="Second Text"
      >
        {{ factsData.secondText }}
      </p>
    </div>

    <div class="col-span-3 md:col-span-1 text-start md:text-end md:mt-12">
      <p
        class="text-3xl md:text-5xl font-bold text-white mb-1"
        data-aue-prop="thirdTitle"
        data-aue-type="text"
        data-aue-label="Third Title"
      >
        {{ factsData.thirdTitle }}
      </p>
      <p
        class="text-xl font-normal text-white border-t border-gray-300 mt-1 mb-6 md:mb-0"
        data-aue-prop="thirdText"
        data-aue-type="text"
        data-aue-label="Third Text"
      >
        {{ factsData.thirdText }}
      </p>

      <p
        class="text-3xl md:text-5xl font-bold text-white mb-1 md:mt-24"
        data-aue-prop="fourthitle"
        data-aue-type="text"
        data-aue-label="Fourth Title"
      >
        {{ factsData.fourthTitle }}
      </p>
      <p
        class="text-xl font-normal text-white border-t border-gray-300 mt-1 mb-6 md:mb-0"
        data-aue-prop="fourthText"
        data-aue-type="text"
        data-aue-label="Fourth Text"
      >
        {{ factsData.fourthText }}
      </p>
    </div>
  </div>
</template>

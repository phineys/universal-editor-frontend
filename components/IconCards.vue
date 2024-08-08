<script setup lang="ts">
import { fetchData } from '@/service/getContent'

const props = defineProps({
  resource: {
    type: String,
    default: '',
    required: true
  }
})

let iconCard = ref(await fetchData(props.resource))
</script>

<template>
  <div
    class="mx-auto mt-32 max-w-7xl px-6 sm:mt-40 lg:px-8"
    :data-aue-resource="`${resource}/iconcards`"
    data-aue-type="component"
    data-aue-label="IconCards"
    data-aue-model="iconcards"
    data-aue-behavior="container"
  >
    <h2
      class="text-3xl font-extrabold tracking-normal md:text-4xl xl:text-7xl text-white text-center"
      data-aue-prop="containerTitle"
      data-aue-type="text"
      data-aue-label="ContainerTitle"
    >
      {{ iconCard.containerTitle }}
    </h2>
    <div
      class="mx-auto mt-16 grid gap-12 md:grid-cols-3 lg:mx-0 lg:max-w-none lg:gap-x-16"
    >
      <div class="block justify-items-center">
        <div
          class="cmp-iconcard"
          :data-aue-resource="`${resource}/iconcards/iconcard`"
          data-aue-type="component"
          data-aue-label="IconCard"
          data-aue-model="iconCard"
          data-aue-behavior="component"
        >
          <div class="w-20 h-20 text-white mx-auto">
            <img
              data-aue-prop="icon"
              data-aue-type="media"
              data-aue-label="Icon"
              width="80"
              height="80"
            />
          </div>
          <h3
            class="md:h-[75px] h-auto text-xl md:text-2xl xl:text-3xl mt-4 font-medium uppercase text-white text-center"
            data-aue-prop="title"
            data-aue-type="text"
            data-aue-label="Title"
          >
            {{ iconCard?.iconcards?.iconcard?.title }}
          </h3>
          <p
            class="mt-4 text-xl text-white leading-relaxed text-center"
            data-aue-prop="text"
            data-aue-type="text"
            data-aue-label="Text"
          >
            {{ iconCard?.iconcards?.iconcard?.text }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

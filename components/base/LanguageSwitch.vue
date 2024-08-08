<template>
  <Listbox v-slot="{ open }" v-model="selectedLanguage">
    <div class="relative mt-[-15px]">
      <ListboxButton
        ref="listBoxButton"
        class="relative cursor-pointer text-white rounded py-1 pl-3 pr-10 text-left mr-2"
        :class="[
          open ? 'outline outline-2' : 'hover:outline rounded hover:outline-2'
        ]"
      >
        <span class="flex truncate items-center space-x-2 p-2">
          <LanguageIcon class="h-6 w-6 text-white mr-2" aria-hidden="true" />{{
            selectedLanguage.locale
          }}</span
        >
        <span
          class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2"
        >
          <ChevronDownIcon
            v-if="!open"
            class="h-5 w-5 text-white"
            aria-hidden="true"
          />
          <ChevronUpIcon
            v-if="open"
            class="h-5 w-5 text-white"
            aria-hidden="true"
          />
        </span>
      </ListboxButton>

      <transition
        leave-active-class="transition duration-100 ease-in"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <ListboxOptions
          class="min-w-40 grow absolute mt-1 max-h-60 overflow-y-auto py-1 border border-2 border-white bg-primary rounded sm:text-sm"
        >
          <ListboxOption
            v-for="lang in languages"
            v-slot="{ active, selected }"
            :key="lang.locale"
            :value="lang"
            as="template"
          >
            <li
              :class="[
                active ? 'text-bold' : 'text-white',
                'relative cursor-pointer select-none py-2 px-3 flex space-x-2'
              ]"
            >
              <span class="flex items-center justify-center h-5 w-5">
                <img
                  class="block h-10 w-auto"
                  :src="lang.icon"
                  width="5"
                  height="5"
                  :alt="lang.name"
                />
              </span>
              <span
                :class="[
                  selected ? 'font-medium underline' : 'font-normal',
                  'text-white block truncate hover:underline'
                ]"
              >
                {{ lang.name }}
              </span>
              <span class="flex items-center justify-center h-5 w-5">
                <CheckIcon
                  v-if="selected"
                  class="h-4 w-4 text-white"
                  aria-hidden="true"
                />
              </span>
            </li>
          </ListboxOption>
        </ListboxOptions>
      </transition>
    </div>
  </Listbox>
</template>

<script setup lang="ts">
import {
  Listbox,
  ListboxButton,
  ListboxOptions,
  ListboxOption
} from '@headlessui/vue'
import {
  ChevronDownIcon,
  ChevronUpIcon,
  CheckIcon,
  LanguageIcon
} from '@heroicons/vue/20/solid'

const { setLocale } = useI18n()

const languages = [
  {
    name: 'English',
    locale: 'en',
    icon: '/image/lang_en.svg'
  },
  {
    name: 'German',
    locale: 'de',
    icon: '/image/lang_de.svg'
  }
]
const selectedLanguage = ref(languages[0])

watch(
  () => selectedLanguage.value,
  (newLang) => {
    setLocale(newLang.locale)
  }
)
</script>

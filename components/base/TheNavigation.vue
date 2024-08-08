<template>
  <!-- Mobile menu -->
  <TransitionRoot as="template" :show="open">
    <Dialog
      as="div"
      class="fixed inset-0 flex z-40 lg:hidden"
      @close="open = false"
    >
      <TransitionChild
        as="template"
        enter="transition-opacity ease-linear duration-300"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="transition-opacity ease-linear duration-300"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <DialogOverlay class="fixed inset-0 bg-black bg-opacity-25" />
      </TransitionChild>

      <TransitionChild
        as="template"
        enter="transition ease-in-out duration-300 transform"
        enter-from="-translate-x-full"
        enter-to="translate-x-0"
        leave="transition ease-in-out duration-300 transform"
        leave-from="translate-x-0"
        leave-to="-translate-x-full"
      >
        <div
          class="relative max-w-sm w-full bg-primary shadow-xl pb-12 flex flex-col overflow-y-auto"
        >
          <div class="px-8 pt-5 pb-2 flex justify-between">
            <button
              type="button"
              class="-m-2 p-2 rounded-md inline-flex items-center justify-center text-white"
              @click="open = false"
            >
              <span class="sr-only">Close menu</span>
              <XMarkIcon class="h-6 w-6" aria-hidden="true" />
            </button>
          </div>

          <!-- Links -->
          <div
            class="border-t border-gray-200 border-opacity-60 py-6 px-8 space-y-6"
          >
            <div v-for="page in navigation" :key="page.name" class="flow-root">
              <nuxt-link
                :to="localePath(page.link)"
                class="-m-2 p-2 block text-xl font-bold text-white"
                @click="open = false"
              >
                {{ page.name }}
              </nuxt-link>
            </div>
          </div>
        </div>
      </TransitionChild>
    </Dialog>
  </TransitionRoot>

  <header class="relative overflow-hidden">
    <!-- Top navigation -->
    <nav
      aria-label="Top"
      class="relative z-20 bg-primary backdrop-filter backdrop-blur-xl py-4"
    >
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="h-16 flex items-center">
          <button
            type="button"
            class="bg-primary p-2 rounded-md text-white lg:hidden"
            @click="open = true"
          >
            <span class="sr-only">open menu</span>
            <Bars3Icon class="h-6 w-6" aria-hidden="true" />
          </button>

          <div class="hidden lg:flex ml-auto items-center text-white">
            <ol>
              <li v-for="(page, i) in navigation" :key="i" class="inline-block">
                <!-- Vue router child active class is 'buggy', use :class workaround
                       See: https://github.com/nuxt/nuxt/discussions/15888
                   -->
                <nuxt-link
                  :to="localePath(page.link)"
                  class="mr-6 text-lg font-bold text-white"
                  :class="{
                    'parent-router-link-active':
                      page.link !== '/' && $route.path.startsWith(page.link)
                  }"
                >
                  {{ page.name }}
                </nuxt-link>
              </li>
            </ol>
          </div>
        </div>
      </div>
    </nav>
  </header>
</template>

<script setup lang="ts">
import {
  Dialog,
  DialogOverlay,
  TransitionChild,
  TransitionRoot
} from '@headlessui/vue'
import { Bars3Icon, XMarkIcon } from '@heroicons/vue/24/outline/index'
const { locale, setLocale } = useI18n()
const localePath = useLocalePath()
const open = ref(false)

const navigation = [
  { name: 'Homepage', link: '/' },
  { name: 'test', link: '/test' }
]
</script>

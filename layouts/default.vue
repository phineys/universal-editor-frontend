<template>
  <div>
    <Html lang="en" />
    <main id="main">
      <TheNavigation />
      <NuxtPage class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 min-h-screen" />
      <div class="p-24 min-h-24">
        <LanguageSwitch />
      </div>
    </main>
  </div>
</template>

<script setup>
import TheNavigation from '../components/base/TheNavigation.vue'
import LanguageSwitch from '../components/base/LanguageSwitch.vue'
</script>

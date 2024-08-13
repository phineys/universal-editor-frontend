<script setup lang="ts"></script>

<template>
  <div class="bg-primary">
     <Hero
      resource="urn:aemconnection:/content/pf/us/en/jcr:content/root/container/container/hero"
    />
    <!-- <KeyFacts
      resource="urn:aemconnection:/content/pf/de/jcr:content/root/container/container/keyfacts"
    />
    <IconCards
      resource="urn:aemconnection:/content/pf/de/jcr:content/root/container/container/iconcards"
    /> -->
    <Container
      resource="urn:aemconnection:/content/pf/us/en/jcr:content/root/container/container/container"
    />
  </div>
</template>

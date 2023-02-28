<script setup>
import { ref, onMounted, watch } from "vue";

const selected_district = ref(0);
const districtInput = ref("test");
</script>

<template>
  <div class="flex flex-col gap-5 align-center justify-center m-10">
    <h1 class="text-center p-10 text-3xl">Search for a school district</h1>
    <input
      v-model="districtInput"
      class="border-black border-2 border-b-4 p-3 rounded-lg"
    />
    <div class="h-96 border-black border-2 border-b-4 p-5 rounded-lg">
      Data!
      {{ districtInput }}
    </div>
    <input class="border-black border-2 border-b-4 p-3 rounded-lg" />
  </div>
</template>

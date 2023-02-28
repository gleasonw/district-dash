<script setup lang="ts">
import { ref, onMounted, watch } from "vue";
const selected_district = ref(0);
const districtInput = ref("");
const districts = ref([]);

watch(districtInput, async () => {
  const { data: districts } = await useFetch(
    `https://nces.ed.gov/opengis/rest/services/K12_School_Locations/EDGE_GEOCODE_PUBLICLEA_1516/MapServer/0/query?where=UPPER(NAME)+LIKE+UPPER(%27%25${districtInput.value}%25%27)&orderByFields=NAME&resultRecordCount=20&f=json&outfields=*&outSR=4326`
  );
});
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
      {{ districts }}
    </div>
    <input class="border-black border-2 border-b-4 p-3 rounded-lg" />
  </div>
</template>

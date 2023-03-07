<script setup lang="ts">
import { District } from '~~/models';

const selected_district = ref(0);
const districtInput = ref("");

const query = computed(() => ({
    name: districtInput.value,
}));

const { data: districts } = useFetch<District[]>("/api/districts", {
    query: query
});

</script>

<template>
    <div class="flex flex-col gap-5 align-center justify-center m-10">
        <h1 class="text-center p-10 text-3xl">Search for a school district</h1>
        <input v-model="districtInput" class="border-black border-2 border-b-4 p-3 rounded-lg" />
        <div class="h-96 border-black border-2 border-b-4 p-5 rounded-lg">
            <li v-for="district in districts" :key="district.OBJECTID">
                {{ district.LEA_NAME }}
            </li>
        </div>
        <input class="border-black border-2 border-b-4 p-3 rounded-lg" />
    </div>
</template>
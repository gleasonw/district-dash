<script setup lang="ts">
import { District, School } from '~~/models';

const selected_district = ref(0);
const districtInput = ref("");
const schoolInput = ref("");
const currentFadeIndex = ref(0);

const districtQuery = computed(() => ({
    name: districtInput.value,
}));

const schoolQuery = computed(() => ({
    name: schoolInput.value,
}));

const { data: districtsForFade } = useFetch<District[]>("/api/districts", {
    query: {
        name: "",
    }
});

const { data: districts } = useFetch<District[]>("/api/districts", {
    query: districtQuery
});

const { data: schools } = useFetch<School[]>("/api/schools", {
    query: schoolQuery
});

const showDistricts = computed(() => {
    return districtInput.value.length > 0;
});

const showSchools = computed(() => {
    return schoolInput.value.length > 0;
});

const handleDistrictClick = (district: District) => {
    selected_district.value = district.OBJECTID;
    districtInput.value = "";
};

const handleSchoolClick = (school: School) => {
    schoolInput.value = "";
};

function iterateFade() {
    if (districtsForFade.value && currentFadeIndex.value < districtsForFade.value.length - 1) {
        currentFadeIndex.value++;
    } else {
        currentFadeIndex.value = 0;
    }
}

onMounted(() => {
    setInterval(iterateFade, 5000);
})

</script>

<template>
    <div class="flex flex-col gap-5 align-center justify-center m-10">
        <h1 class="text-center p-10 text-3xl">Search for a school district</h1>
        <div v-if="!showDistricts" class="flex flex-row justify-center items-center gap-2">
            <Transition name="slide-fade" mode="out-in">
                <p :key="currentFadeIndex">{{ districtsForFade && districtsForFade[currentFadeIndex].LEA_NAME }}</p>
            </Transition>
        </div>
        <div class="relative">
            <input v-model="districtInput" class="border-black border-2 border-b-4 p-3 rounded-lg w-full" />
        </div>
        <div class="h-96 border-black border-2 border-b-4 p-5 rounded-lg">
            <div v-for="district in districts" :key="district.OBJECTID">
                <button @click=handleDistrictClick(district) class="hover:bg-zinc-100">
                    {{ district.LEA_NAME }}
                </button>
            </div>
        </div>
        <div class="relative">
            <input v-model="schoolInput" class="border-black border-2 border-b-4 p-3 rounded-lg w-full" />
            <div v-if="showSchools"
                class="absolute z-40 bg-white rounded-sm border-l border-r border-b pl-2 pr-2 pb-2 w-full">
                <ul v-for="school in schools" :key="school.OBJECTID">
                    {{ school.SCH_NAME }}
                </ul>
            </div>
        </div>
    </div>
</template>

<style>
.slide-fade-enter-active {
    transition: all 1s ease-out;
}

.slide-fade-leave-active {
    transition: all 1s ease-out;
}

.slide-fade-enter-from {
    transform: translateX(20px);
    opacity: 0;
}

.slide-fade-leave-to {
    transform: translateX(-20px);
    opacity: 0;
}
</style>
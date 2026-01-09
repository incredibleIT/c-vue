<script setup lang="ts">
import { useRoute } from 'vue-router'

const route = useRoute()
const flowId = route.params.flowId as string
const instanceId = route.params.instanceId as string
</script>

<template>
    <div class="flow-runtime-page">
        <h2>Flow Runtime</h2>
        <div>flowId: {{ flowId }}</div>
        <div>instanceId: {{ instanceId }}</div>
    </div>
</template>

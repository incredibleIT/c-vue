<script setup lang="ts">
import CardList from "@/components/base/CardList.vue";
import { pageFlows } from "@/api/flow.ts";  // TODO 之后调用分页
import {onMounted, ref, Ref} from "vue";
import type {Flow} from "@/types/flow.ts";
import { listFlows } from "@/api/flow.ts";
import { useRouter } from "vue-router";

const isLoading: Ref<boolean> = ref(true)
const hasError: Ref<boolean> = ref(false)
const data : Ref<Flow[]> = ref([])
const router = useRouter()


const handleItemClick = (flow: Flow, index: number) => {
    console.log("click now: ", flow, index)
    router.push(`/flow/${flow.id}`)
}

const handleEdit = (flow: Flow, index: number) => {
    console.log("edit now: ", flow, index)
}

const handleDelete = (flow: Flow, index: number) => {
    console.log("delete now: ", flow, index)

    if (confirm("Are you sure?")) {
        console.log("delete confirmed")
    }
}

onMounted(async () => {
    isLoading.value = true
    await listFlows().then((res) => {
        data.value = res.data
    })
    isLoading.value = false
})
</script>


<template>
    <div>
        <h1>Flows</h1>
        <CardList
            :items="data"
            :loading="isLoading"
            :error="hasError"
            :editable="true"
            :deletable="true"
            @item-click="handleItemClick"
            @edit="handleEdit"
            @delete="handleDelete"
        >
            <template #default="{ item }">
                <div class="card">
                    <div class="card-left"> {{ (item as Flow).name }} </div>

                    <div class="card-right"> {{ (item as Flow).status }} </div>
                </div>

            </template>

        </CardList>

    </div>
</template>


<style scoped>
.card {
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.card-left {
    flex: 1;
    margin-right: 10px;
    font-size: 16px;
}
.card-right {
    flex: 1;
    margin-left: 10px;
    text-align: right;
    font-size: 16px;
}

</style>
import {ref} from "vue";
import type {Ref} from "vue";
import { debounce } from "lodash-es";
import { saveFlowSnapshot } from "@/api/flow.ts"
import type {Flow} from "@/types/flow.ts";
import {ElMessage} from "element-plus";


export function useFlowPersistence(flow: Ref<Flow>) {
    const isDirty = ref(false)

    const commit = debounce(async () => {
        if (!isDirty.value) return

        await saveFlowSnapshot(flow.value)

        isDirty.value = false
        ElMessage({message: 'Auto saved!', type: 'success'})
    }, 10000)

    const markDirty = () => {
        isDirty.value = true
        commit()

    }

    return {
        markDirty,
        isDirty
    }
}

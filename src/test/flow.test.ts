import request from "./http.ts";
import {mockFlow} from "./mock/mockFlow.ts";
import type {PageResult} from "@/types/page-result.ts";
async function testListFlows() {
    console.log("测试流程列表中...")
    const res: Promise<PageResult<any>> = await request.get("/api/flow/list");
    const {data, code, msg} = res;
    console.log("流程列表测试完成", data, code, msg)
}

async function testCreateFlow() {
    console.log("测试创建流程中...")
    const res = await request.post("/api/flow/create", mockFlow)
    console.log("创建结果: ", res)
}

async function testUpdateFlow() {
    console.log("测试更新流程中...")
    mockFlow.name = "测试flow更新逻辑";
    const res = await request.put("/api/flow/update", mockFlow)
    console.log("更新结果: ", res)
}

async function testDeleteFlow() {
    console.log("测试删除流程中...")
    const res = await request.delete(`/api/flow/delete/${mockFlow.id}`)
    console.log("删除结果: ", res)
}


/**
 * TODO BUG 删除flow时未级联删除节点
 */
async function main() {
    await testListFlows();
    // await testCreateFlow();
    // await testListFlows();
    // await testUpdateFlow();
    // await testListFlows();
    // await testDeleteFlow();
    // await testListFlows();
}


main().catch(e => console.error(e))
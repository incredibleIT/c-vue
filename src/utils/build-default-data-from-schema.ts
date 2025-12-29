/**
 * 用于从schema中获取默认数据
 * @param schema
 */
export function buildDefaultDataFromSchema(
    schema?: {
        properties?: Record<string, any>
    }
): Record<string, any> {
    const data: Record<string, any> = {}

    if (!schema?.properties) return data

    for (const [key, value] of Object.entries(schema.properties)) {
        if (value.default !== undefined) {
            data[key] = value.default
        }
    }

    return data
}
import type { Result } from './result'

export interface PageResult<T> extends Result<T[]> {
    page: number
    size: number
    total: number
    pages: number
}
/**
 * 节点运行状态
 * 'pending','running','completed','failed','skipped','waiting','retrying'
 */

export type NodeRunStatus =
    | 'pending'
    | 'running'
    | 'completed'
    | 'failed'
    | 'skipped'
    | 'waiting'
    | 'retrying'
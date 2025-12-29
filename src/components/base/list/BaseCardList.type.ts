export interface CardListProps <T> {
    /**
     * 列表数据
     */
    items: T[];

    /**
     * 加载状态
     */
    loading?:boolean;

    /**
     * 加载时候的提示语
     */
    loadingMessage?:string;

    /**
     * 是否发生错误
     */
    error?: boolean;

    /**
     * 错误消息
     */
    errorMessage?: string;

    /**
     * 列表为空的消息
     */
    emptyMessage?: string;

    /**
     * 是否可编辑卡片
     */
    editable?: boolean;

    /**
     * 是否允许删除
     */
    deletable?: boolean;

    /**
     * 是否在卡片上显示操作按钮
     */
    showActions?: boolean;

    /**
     * 卡片容器自定义类名
     */
    cardClass?: string | string[] | { [key: string] : boolean }

    /**
     * 列表容器自定义类名
     */
    listClass?: string | string[] | { [key: string] : boolean }

    /**
     * 定义如何取出卡片作为键的值
     * @param item
     */
    getKey?: (item: T) => string;
}
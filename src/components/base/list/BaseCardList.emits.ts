export interface CardListEmits<T> {
    /**
     * 点击卡片触发
     * @param e 事件对象
     * @param item 被点击的卡片
     * @param index 被点击的卡片索引
     */
    (e: "item-click", item: T, index: number): void;

    /**
     * 点击编辑按钮触发
     * @param e 事件对象
     * @param item 要编辑的卡片
     * @param index 要编辑的卡片索引
     */
    (e: "edit", item: T, index: number): void;

    /**
     * 点击删除按钮触发
     * @param e 事件对象
     * @param item 要删除的卡片
     * @param index 要删除的卡片索引
     */
    (e: "delete", item: T, index: number): void;
}
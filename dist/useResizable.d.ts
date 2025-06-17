import { type Ref } from 'vue';
export interface UseResizableOptions {
    /** 初始宽度 */
    initialWidth?: number;
    /** 最小宽度（可以是数字或百分比字符串如 '25%'） */
    minWidth?: number | string;
    /** 最大宽度（可以是数字或百分比字符串如 '50%'） */
    maxWidth?: number | string;
    /** 拖拽方向，'left' 表示从左侧拖拽，'right' 表示从右侧拖拽 */
    direction?: 'left' | 'right';
    /** 是否启用拖拽 */
    enabled?: boolean;
}
export declare function useResizable(options?: UseResizableOptions): {
    width: Ref<number, number>;
    isDragging: Ref<boolean, boolean>;
    minWidthPx: import("vue").ComputedRef<number>;
    maxWidthPx: import("vue").ComputedRef<number>;
    startDragging: (e: MouseEvent) => void;
    setWidth: (newWidth: number) => void;
    resetWidth: () => void;
    getPixelValue: (value: number | string) => number;
};
//# sourceMappingURL=useResizable.d.ts.map
# Container Resizable

一个Vue 3可拖拽调整容器宽度的组合式API和组件库。

## 安装

```bash
npm install container-resizable
```

## 使用

### 1. 使用 useResizable Hook

```vue
<template>
  <div class="container">
    <div 
      :style="{ width: width + 'px' }"
      class="resizable-panel"
    >
      可调整宽度的面板
      <div 
        class="resize-handle"
        @mousedown="startDragging"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useResizable } from 'container-resizable'

const { width, startDragging, isDragging } = useResizable({
  initialWidth: 400,
  minWidth: '25%',
  maxWidth: '50%',
  direction: 'left',
  enabled: true
})
</script>
```

### 2. 使用 ResizeHandle 组件

```vue
<template>
  <div class="container">
    <div 
      :style="{ width: width + 'px' }"
      class="resizable-panel"
    >
      可调整宽度的面板
      <ResizeHandle 
        :direction="'left'"
        :theme="'blue'"
        @mousedown="startDragging"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useResizable, ResizeHandle } from 'container-resizable'

const { width, startDragging } = useResizable({
  initialWidth: 400,
  minWidth: '25%',
  maxWidth: '50%',
  direction: 'left'
})
</script>
```

## API

### useResizable(options)

#### 参数

```typescript
interface UseResizableOptions {
  /** 初始宽度（像素） */
  initialWidth?: number
  /** 最小宽度（可以是数字或百分比字符串如 '25%'） */
  minWidth?: number | string
  /** 最大宽度（可以是数字或百分比字符串如 '50%'） */
  maxWidth?: number | string
  /** 拖拽方向，'left' 表示从左侧拖拽，'right' 表示从右侧拖拽 */
  direction?: 'left' | 'right'
  /** 是否启用拖拽 */
  enabled?: boolean
}
```

#### 返回值

```typescript
{
  // 响应式状态
  width: Ref<number>           // 当前宽度
  isDragging: Ref<boolean>     // 是否正在拖拽
  minWidthPx: ComputedRef<number>  // 最小宽度（像素）
  maxWidthPx: ComputedRef<number>  // 最大宽度（像素）
  
  // 方法
  startDragging: (e: MouseEvent) => void  // 开始拖拽
  setWidth: (newWidth: number) => void    // 手动设置宽度
  resetWidth: () => void                  // 重置为初始宽度
  getPixelValue: (value: number | string) => number // 转换为像素值
}
```

### ResizeHandle 组件属性

```typescript
interface ResizeHandleProps {
  /** 拖拽方向，'left' 表示从左侧拖拽，'right' 表示从右侧拖拽 */
  direction?: 'left' | 'right'
  /** 手柄宽度（像素） */
  handleWidth?: number
  /** 指示器宽度（像素） */
  indicatorWidth?: number
  /** 指示器高度（像素） */
  indicatorHeight?: number
  /** 主题样式 */
  theme?: 'default' | 'blue' | 'gray' | 'green' | 'black'
}
```

#### 事件

- `@mousedown`: 鼠标按下事件，传递MouseEvent对象

## 特性

- ✅ **Vue 3 组合式API** - 使用最新的Vue 3 Composition API
- ✅ **TypeScript支持** - 完整的类型定义
- ✅ **灵活配置** - 支持百分比和像素值的最小/最大宽度限制
- ✅ **双向拖拽** - 支持左侧或右侧拖拽
- ✅ **响应式** - 实时响应窗口大小变化
- ✅ **轻量级** - 无额外依赖，仅依赖Vue 3
- ✅ **开箱即用的组件** - 提供预设样式的ResizeHandle组件

## 许可证

ISC
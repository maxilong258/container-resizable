<template>
  <div
    :class="[
      'resize-handle absolute top-0 h-full cursor-col-resize transition-colors duration-200 z-10',
      direction === 'left' ? 'left-0' : 'right-0',
      theme
    ]"
    :style="{ width: handleWidth + 'px' }"
    @mousedown="onMouseDown"
  >
    <!-- 拖拽指示器 -->
    <div 
      :class="[
        'resize-indicator absolute top-1/2 transform -translate-y-1/2 rounded-full transition-all duration-200',
        direction === 'left' ? 'left-1/2 -translate-x-1/2' : 'right-1/2 translate-x-1/2'
      ]"
      :style="{
        width: indicatorWidth + 'px',
        height: indicatorHeight + 'px'
      }"
    ></div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  /** 拖拽方向 */
  direction?: 'left' | 'right'
  /** 手柄宽度 */
  handleWidth?: number
  /** 指示器宽度 */
  indicatorWidth?: number
  /** 指示器高度 */
  indicatorHeight?: number
  /** 主题样式 */
  theme?: 'default' | 'blue' | 'gray' | 'green' | 'black'
}

const props = withDefaults(defineProps<Props>(), {
  direction: 'left',
  handleWidth: 16,
  indicatorWidth: 6,
  indicatorHeight: 60,
  theme: 'default'
})

const emit = defineEmits<{
  mousedown: [e: MouseEvent]
}>()

const onMouseDown = (e: MouseEvent) => {
  emit('mousedown', e)
}
</script>

<style scoped>

.resize-handle.default .resize-indicator {
  background-color: rgba(255, 255, 255, 0.6);
}

.resize-handle.default:hover .resize-indicator {
  background-color: rgba(255, 255, 255, 1);
}

.resize-handle.black .resize-indicator {
  background-color: gray;
}

.resize-handle.black:hover .resize-indicator {
  background-color: black;
}

/* 蓝色主题 */
.resize-handle.blue {
  background-color: rgba(59, 130, 246, 0.2);
}

.resize-handle.blue:hover {
  background-color: rgba(59, 130, 246, 0.4);
}

.resize-handle.blue .resize-indicator {
  background-color: rgba(255, 255, 255, 0.6);
}

.resize-handle.blue:hover .resize-indicator {
  background-color: rgba(255, 255, 255, 1);
}

/* 灰色主题 */
.resize-handle.gray {
  background-color: rgba(107, 114, 128, 0.2);
}

.resize-handle.gray:hover {
  background-color: rgba(107, 114, 128, 0.4);
}

.resize-handle.gray .resize-indicator {
  background-color: rgba(255, 255, 255, 0.6);
}

.resize-handle.gray:hover .resize-indicator {
  background-color: rgba(255, 255, 255, 1);
}

/* 绿色主题 */
.resize-handle.green {
  background-color: rgba(34, 197, 94, 0.2);
}

.resize-handle.green:hover {
  background-color: rgba(34, 197, 94, 0.4);
}

.resize-handle.green .resize-indicator {
  background-color: rgba(255, 255, 255, 0.6);
}

.resize-handle.green:hover .resize-indicator {
  background-color: rgba(255, 255, 255, 1);
}
</style> 
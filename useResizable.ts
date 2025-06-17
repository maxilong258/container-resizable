import { ref, computed, onMounted, onUnmounted, type Ref } from 'vue'

export interface UseResizableOptions {
  /** 初始宽度 */
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

export function useResizable(options: UseResizableOptions = {}) {
  const {
    initialWidth = 400,
    minWidth = '25%',
    maxWidth = '50%',
    direction = 'left',
    enabled = true
  } = options

  // 响应式状态
  const width = ref(initialWidth)
  const isDragging = ref(false)
  const startX = ref(0)
  const startWidth = ref(0)

  // 计算实际的最小和最大宽度
  const getPixelValue = (value: number | string): number => {
    if (typeof value === 'string' && value.endsWith('%')) {
      const percentage = parseFloat(value) / 100
      return window.innerWidth * percentage
    }
    return typeof value === 'number' ? value : parseInt(value)
  }

  const minWidthPx = computed(() => getPixelValue(minWidth))
  const maxWidthPx = computed(() => getPixelValue(maxWidth))

  // 初始化宽度
  onMounted(() => {
    width.value = Math.max(minWidthPx.value, Math.min(maxWidthPx.value, initialWidth))
  })

  // 拖拽处理函数
  const startDragging = (e: MouseEvent) => {
    if (!enabled) return
    
    isDragging.value = true
    startX.value = e.clientX
    startWidth.value = width.value
    
    // 设置拖拽时的样式
    document.body.style.cursor = 'col-resize'
    document.body.style.userSelect = 'none'
    
    document.addEventListener('mousemove', handleDragging)
    document.addEventListener('mouseup', stopDragging)
    e.preventDefault()
  }

  const handleDragging = (e: MouseEvent) => {
    if (!isDragging.value) return
    
    const deltaX = direction === 'left' 
      ? startX.value - e.clientX  // 左侧拖拽：向左移动增加宽度
      : e.clientX - startX.value  // 右侧拖拽：向右移动增加宽度
    
    const newWidth = startWidth.value + deltaX
    
    // 应用宽度限制
    width.value = Math.max(minWidthPx.value, Math.min(maxWidthPx.value, newWidth))
  }

  const stopDragging = () => {
    isDragging.value = false
    
    // 恢复默认样式
    document.body.style.cursor = ''
    document.body.style.userSelect = ''
    
    document.removeEventListener('mousemove', handleDragging)
    document.removeEventListener('mouseup', stopDragging)
  }

  // 组件卸载时清理
  onUnmounted(() => {
    document.removeEventListener('mousemove', handleDragging)
    document.removeEventListener('mouseup', stopDragging)
    document.body.style.cursor = ''
    document.body.style.userSelect = ''
  })

  // 手动设置宽度的方法
  const setWidth = (newWidth: number) => {
    width.value = Math.max(minWidthPx.value, Math.min(maxWidthPx.value, newWidth))
  }

  // 重置为初始宽度
  const resetWidth = () => {
    width.value = Math.max(minWidthPx.value, Math.min(maxWidthPx.value, initialWidth))
  }

  return {
    // 响应式状态
    width,
    isDragging,
    minWidthPx,
    maxWidthPx,
    
    // 方法
    startDragging,
    setWidth,
    resetWidth,
    
    // 工具方法
    getPixelValue
  }
} 
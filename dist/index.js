'use strict';

var vue = require('vue');

function useResizable(options = {}) {
  const { initialWidth = 400, minWidth = "25%", maxWidth = "50%", direction = "left", enabled = true } = options;
  const width = vue.ref(initialWidth);
  const isDragging = vue.ref(false);
  const startX = vue.ref(0);
  const startWidth = vue.ref(0);
  const getPixelValue = (value) => {
    if (typeof value === "string" && value.endsWith("%")) {
      const percentage = parseFloat(value) / 100;
      return window.innerWidth * percentage;
    }
    return typeof value === "number" ? value : parseInt(value);
  };
  const minWidthPx = vue.computed(() => getPixelValue(minWidth));
  const maxWidthPx = vue.computed(() => getPixelValue(maxWidth));
  vue.onMounted(() => {
    width.value = Math.max(minWidthPx.value, Math.min(maxWidthPx.value, initialWidth));
  });
  const startDragging = (e) => {
    if (!enabled)
      return;
    isDragging.value = true;
    startX.value = e.clientX;
    startWidth.value = width.value;
    document.body.style.cursor = "col-resize";
    document.body.style.userSelect = "none";
    document.addEventListener("mousemove", handleDragging);
    document.addEventListener("mouseup", stopDragging);
    e.preventDefault();
  };
  const handleDragging = (e) => {
    if (!isDragging.value)
      return;
    const deltaX = direction === "left" ? startX.value - e.clientX : e.clientX - startX.value;
    const newWidth = startWidth.value + deltaX;
    width.value = Math.max(minWidthPx.value, Math.min(maxWidthPx.value, newWidth));
  };
  const stopDragging = () => {
    isDragging.value = false;
    document.body.style.cursor = "";
    document.body.style.userSelect = "";
    document.removeEventListener("mousemove", handleDragging);
    document.removeEventListener("mouseup", stopDragging);
  };
  vue.onUnmounted(() => {
    document.removeEventListener("mousemove", handleDragging);
    document.removeEventListener("mouseup", stopDragging);
    document.body.style.cursor = "";
    document.body.style.userSelect = "";
  });
  const setWidth = (newWidth) => {
    width.value = Math.max(minWidthPx.value, Math.min(maxWidthPx.value, newWidth));
  };
  const resetWidth = () => {
    width.value = Math.max(minWidthPx.value, Math.min(maxWidthPx.value, initialWidth));
  };
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
  };
}

var _sfc_main = /* @__PURE__ */ vue.defineComponent({
  __name: "ResizeHandle",
  props: {
    direction: { type: String, required: false, default: "left" },
    handleWidth: { type: Number, required: false, default: 16 },
    indicatorWidth: { type: Number, required: false, default: 6 },
    indicatorHeight: { type: Number, required: false, default: 60 },
    theme: { type: String, required: false, default: "default" }
  },
  emits: ["mousedown"],
  setup(__props, { emit: __emit }) {
    const emit = __emit;
    const onMouseDown = (e) => {
      emit("mousedown", e);
    };
    return (_ctx, _cache) => {
      return vue.openBlock(), vue.createElementBlock(
        "div",
        {
          class: vue.normalizeClass([
            "resize-handle absolute top-0 h-full cursor-col-resize transition-colors duration-200 z-10",
            _ctx.direction === "left" ? "left-0" : "right-0",
            _ctx.theme
          ]),
          style: vue.normalizeStyle({ width: _ctx.handleWidth + "px" }),
          onMousedown: onMouseDown
        },
        [
          vue.createCommentVNode(" \u62D6\u62FD\u6307\u793A\u5668 "),
          vue.createElementVNode(
            "div",
            {
              class: vue.normalizeClass([
                "resize-indicator absolute top-1/2 transform -translate-y-1/2 rounded-full transition-all duration-200",
                _ctx.direction === "left" ? "left-1/2 -translate-x-1/2" : "right-1/2 translate-x-1/2"
              ]),
              style: vue.normalizeStyle({
                width: _ctx.indicatorWidth + "px",
                height: _ctx.indicatorHeight + "px"
              })
            },
            null,
            6
            /* CLASS, STYLE */
          )
        ],
        38
        /* CLASS, STYLE, NEED_HYDRATION */
      );
    };
  }
});

function styleInject(css, ref) {
  if ( ref === void 0 ) ref = {};
  var insertAt = ref.insertAt;

  if (!css || typeof document === 'undefined') { return; }

  var head = document.head || document.getElementsByTagName('head')[0];
  var style = document.createElement('style');
  style.type = 'text/css';

  if (insertAt === 'top') {
    if (head.firstChild) {
      head.insertBefore(style, head.firstChild);
    } else {
      head.appendChild(style);
    }
  } else {
    head.appendChild(style);
  }

  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }
}

var css_248z = ".resize-handle.default .resize-indicator[data-v-52c72172]{background-color:hsla(0,0%,100%,.6)}.resize-handle.default:hover .resize-indicator[data-v-52c72172]{background-color:#fff}.resize-handle.black .resize-indicator[data-v-52c72172]{background-color:gray}.resize-handle.black:hover .resize-indicator[data-v-52c72172]{background-color:#000}.resize-handle.blue[data-v-52c72172]{background-color:rgba(59,130,246,.2)}.resize-handle.blue[data-v-52c72172]:hover{background-color:rgba(59,130,246,.4)}.resize-handle.blue .resize-indicator[data-v-52c72172]{background-color:hsla(0,0%,100%,.6)}.resize-handle.blue:hover .resize-indicator[data-v-52c72172]{background-color:#fff}.resize-handle.gray[data-v-52c72172]{background-color:hsla(220,9%,46%,.2)}.resize-handle.gray[data-v-52c72172]:hover{background-color:hsla(220,9%,46%,.4)}.resize-handle.gray .resize-indicator[data-v-52c72172]{background-color:hsla(0,0%,100%,.6)}.resize-handle.gray:hover .resize-indicator[data-v-52c72172]{background-color:#fff}.resize-handle.green[data-v-52c72172]{background-color:rgba(34,197,94,.2)}.resize-handle.green[data-v-52c72172]:hover{background-color:rgba(34,197,94,.4)}.resize-handle.green .resize-indicator[data-v-52c72172]{background-color:hsla(0,0%,100%,.6)}.resize-handle.green:hover .resize-indicator[data-v-52c72172]{background-color:#fff}";
styleInject(css_248z);

var _export_sfc = (sfc, props) => {
  const target = sfc.__vccOpts || sfc;
  for (const [key, val] of props) {
    target[key] = val;
  }
  return target;
};

var ResizeHandle = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-52c72172"], ["__file", "/Users/gaojian/workspace/container-resizable/package/ResizeHandle.vue"]]);

exports.ResizeHandle = ResizeHandle;
exports.useResizable = useResizable;

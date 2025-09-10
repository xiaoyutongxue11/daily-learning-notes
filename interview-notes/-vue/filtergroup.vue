<template>
  <el-form class="filter-group" ref="form" :model="data" v-bind="curFormProps">
    <transition
      name="collapse"
      @before-enter="beforeEnter"
      @enter="enter"
      @after-enter="afterEnter"
      @before-leave="beforeLeave"
      @leave="leave"
      @after-leave="afterLeave"
    >
      <el-row
        v-show="state === 'close' || displayFieldsMain.length > 0"
        type="flex"
        class="flex-row"
      >
        <el-col
          v-for="(col, cIndex) in displayFieldsMain"
          :key="cIndex"
          :span="colspan"
        >
          <template v-if="$scopedSlots[col.prop]">
            <slot :name="col.prop" v-bind="col"></slot>
          </template>
          <el-form-item
            v-else
            :ref="col.prop"
            :key="col.prop"
            v-bind="col"
            :prop="col.prop"
            :label="col.label"
            :rules="col.rules || rules[col.prop]"
          >
            <template slot="label">
              <slot :name="`${col.prop}_label`" v-bind="col">
                {{ col.label }}
              </slot>
            </template>
            <slot :name="col.prop" v-bind="col">
              <FormItem v-model="data[col.prop]" :field="col" />
            </slot>
          </el-form-item>
        </el-col>
      </el-row>
    </transition>
    <transition
      name="collapse"
      @before-enter="beforeEnter"
      @enter="enter"
      @after-enter="afterEnter"
      @before-leave="beforeLeave"
      @leave="leave"
      @after-leave="afterLeave"
    >
      <el-row
        v-show="state === 'open' && displayFieldsExtra.length > 0"
        :gutter="2"
        type="flex"
        class="flex-row"
      >
        <el-col
          v-for="(col, cIndex) in displayFieldsExtra"
          :key="cIndex"
          :span="colspan"
        >
          <template v-if="$scopedSlots[col.prop]">
            <slot :name="col.prop" v-bind="col"></slot>
          </template>
          <el-form-item
            v-else
            :ref="col.prop"
            :key="col.prop"
            v-bind="col"
            :prop="col.prop"
            :label="col.label"
            :rules="col.rules || rules[col.prop]"
          >
            <template slot="label">
              <slot :name="`${col.prop}_label`" v-bind="col">
                {{ col.label }}
              </slot>
            </template>
            <slot :name="col.prop" v-bind="col">
              <FormItem v-model="data[col.prop]" :field="col" />
            </slot>
          </el-form-item>
        </el-col>
      </el-row>
    </transition>
    <el-row class="btns-wrap">
      <el-button
        v-show="displayFieldsAll.length > perRow * 2"
        type="text"
        size="small"
        :class="['toggle_btn', state]"
        @click="toToggle"
      >
        {{ state == "open" ? "收起" : "展开" }}<i class="px-down"></i>
      </el-button>
      <slot name="operation">
        <el-button size="small" @click="restFilter">重置</el-button>
        <el-button type="primary" size="small" @click="doFilter"
          >查询</el-button
        >
      </slot>
    </el-row>
  </el-form>
</template>

<script>
import FormItem from "../FormItem.vue";

export default {
  name: "filter-group",
  props: {
    data: {
      type: Object,
      default: () => ({}),
    },
    fields: {
      type: Array,
      default: () => [],
    },
    formProps: {
      type: Object,
      default: () => ({}),
    },
    rules: {
      type: Object,
      default: () => ({}),
    },
    column: {
      // 仅支持1，2，3，4等分
      type: Number,
      default: 4,
    },
  },
  components: {
    FormItem,
  },
  data() {
    return {
      curFormProps: {
        inline: false,
        labelWidth: "120px",
        size: "small",
      },
      state: "close", // 默认收起
      breakPoint: "lg", // 默认断点
    };
  },
  computed: {
    form() {
      return this.$refs.form;
    },
    colspan() {
      if (this.breakPoint === "xl") return 4;
      else if (this.breakPoint === "lg") return 6;
      else if (this.breakPoint === "md") return 8;
      else if (this.breakPoint === "sm") return 12;
      return 24;
    },
    perRow() {
      return Math.floor(24 / this.colspan);
    },
    displayFieldsAll() {
      return this.fields.filter((field) => field.display !== false);
    },
    displayFieldsMain() {
      // 收起时显示前两行，展开时也显示前两行
      return this.displayFieldsAll.slice(0, this.perRow * 2);
    },
    displayFieldsExtra() {
      // 展开时显示两行之外的
      if (this.state === "open") {
        return this.displayFieldsAll.slice(this.perRow * 2);
      }
      return [];
    },
  },
  watch: {
    formProps: {
      deep: true,
      immediate: true,
      handler: "initFormProps",
    },
  },
  mounted() {
    this.updateBreakPoint();
    window.addEventListener("resize", this.updateBreakPoint);
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.updateBreakPoint);
  },
  methods: {
    // 获取当前屏幕断点
    updateBreakPoint() {
      const width = window.innerWidth;
      if (width < 768) this.breakPoint = "xs";
      else if (width >= 768 && width < 992) this.breakPoint = "sm";
      else if (width >= 992 && width < 1200) this.breakPoint = "md";
      else if (width >= 1200 && width < 1920) this.breakPoint = "lg";
      else this.breakPoint = "xl";
    },

    initFormProps() {
      Object.assign(this.curFormProps, this.formProps);
    },
    validate() {
      // 整个表单校验
      return this.form.validate();
    },
    validateField(props) {
      // 针对传入的字段列表进行校验
      this.form.validateField(props);
    },
    resetFields(props) {
      // 如果传入字段数组，则对数组内的字段重置，否则重置全部
      if (props) {
        props.forEach((prop) => {
          const field = this.$refs[prop];
          field && field.resetField();
        });
      } else {
        this.form.resetFields();
      }
    },
    clearValidate(props) {
      // 如果传入字段数组，则对数组内的字段进行清除校验痕迹，否则清除整个表单的校验痕迹
      this.form.clearValidate(props);
    },
    toToggle() {
      this.state = this.state === "open" ? "close" : "open";
    },
    restFilter() {
      this.$emit("restFilter", this.data);
    },
    doFilter() {
      this.$emit("doFilter", this.data);
    },
    beforeEnter(el) {
      if (!el.dataset) el.dataset = {};
      el.dataset.oldPaddingTop = el.style.paddingTop;
      el.dataset.oldPaddingBottom = el.style.paddingBottom;
      el.style.height = "0";
      el.style.paddingTop = 0;
      el.style.paddingBottom = 0;
      el.style.opacity = 0;
    },
    enter(el) {
      el.dataset.oldOverflow = el.style.overflow;
      if (el.scrollHeight !== 0) {
        el.style.height = el.scrollHeight + "px";
        el.style.paddingTop = el.dataset.oldPaddingTop;
        el.style.paddingBottom = el.dataset.oldPaddingBottom;
      } else {
        el.style.height = "";
        el.style.paddingTop = el.dataset.oldPaddingTop;
        el.style.paddingBottom = el.dataset.oldPaddingBottom;
      }
      el.style.overflow = "hidden";
      el.style.opacity = 1;
    },
    afterEnter(el) {
      el.style.height = "";
      el.style.overflow = el.dataset.oldOverflow;
      el.style.opacity = 1;
    },
    beforeLeave(el) {
      if (!el.dataset) el.dataset = {};
      el.dataset.oldPaddingTop = el.style.paddingTop;
      el.dataset.oldPaddingBottom = el.style.paddingBottom;
      el.dataset.oldOverflow = el.style.overflow;
      el.style.height = el.scrollHeight + "px";
      el.style.overflow = "hidden";
      el.style.opacity = 1;
    },
    leave(el) {
      if (el.scrollHeight !== 0) {
        el.style.height = 0;
        el.style.paddingTop = 0;
        el.style.paddingBottom = 0;
        el.style.opacity = 0;
      }
    },
    afterLeave(el) {
      el.style.height = "";
      el.style.overflow = el.dataset.oldOverflow;
      el.style.paddingTop = el.dataset.oldPaddingTop;
      el.style.paddingBottom = el.dataset.oldPaddingBottom;
      el.style.opacity = 1;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@common/style/icon.scss";
.collapse-enter-active,
.collapse-leave-active {
  transition: all 0.4s ease-in-out;
}

.filter-group {
  background: #fff;
  border-radius: 8px;
  margin-bottom: 16px;
  padding: 18px 24px 24px;

  ::v-deep {
    .el-form-item {
      .el-form-item__label {
        line-height: 32px;
        text-align: right;
        padding-right: 12px;
      }
    }
    .el-input-number,
    .el-select,
    .el-cascader,
    .el-date-editor.el-input,
    .el-date-editor.el-input__inner {
      width: 100%;
    }
  }

  .btns-wrap {
    display: flex;
    align-items: center;
    justify-content: end;
    .toggle_btn {
      i {
        display: inline-block;
        font-size: inherit;
        height: inherit;
        transition: all 0.4s;
      }
      &.open {
        i {
          transform: rotate(180deg);
        }
      }
    }
  }
}
.flex-row {
  flex-wrap: wrap;
}
.operation-col {
  flex: 230px 1 0;
}
</style>



<script>
import lodash from "lodash";

const getObjectType = obj => Object.prototype.toString.call(obj).slice(8, -1);

const controlAttrs = ["placeholder"];

// 将原生属性从controlProps里分离
const getAttrs = props => {
  const attrs = {};

  for (const prop in props) {
    if (controlAttrs.indexOf(prop) !== -1) {
      attrs[prop] = props[prop];
    }
  }

  return attrs;
};

// 生成选择框下拉列表
const getOptions = (
  h,
  { options = [], optionLabelKey = "label", optionValueKey = "value" },
) => {
  const optionList = [];
  if (getObjectType(options) === "Array") {
    options.forEach(option => {
      const label = optionLabelKey ? option[optionLabelKey] : option;
      const value = optionValueKey ? option[optionValueKey] : option;
      optionList.push(h("el-option", { props: { label, value } }));
    });
  } else {
    for (const key in options) {
      optionList.push(
        h("el-option", {
          props: { label: options[key], value: key },
        }),
      );
    }
  }

  return optionList;
};

const getCheckboxList = (
  h,
  { type, options, optionLabelKey, optionValueKey },
) => {
  const checkboxList = [];
  const tag = type === "checkbox-group" ? "el-checkbox" : "el-radio";

  if (getObjectType(options) === "Array") {
    options.forEach(option => {
      if (option.display !== false) {
        const label = optionLabelKey ? option[optionLabelKey] : option;
        const value = optionValueKey ? option[optionValueKey] : option;
        const checkboxProps = lodash.pick(options, [
          "disabled",
          "border",
          "size",
        ]);

        checkboxList.push(
          h(
            tag,
            {
              props: Object.assign({}, checkboxProps, {
                label: value,
              }),
            },
            label,
          ),
        );
      }
    });
  } else {
    for (const key in options) {
      checkboxList.push(h(tag, { props: { label: key } }, options[key]));
    }
  }

  return checkboxList;
};

/**
 * 获取组件props
 */
const getControlProps = (type, value, props) => {
  let collapseTags;

  if (type === "select") {
    collapseTags = props && props.multiple && props.collapseTags !== false;
  }

  return Object.assign({}, props, {
    value,
    collapseTags,
  });
};

export default {
  name: "CiaFormControl",

  functional: true,

  props: {
    field: Object,
    value: {},
  },

  render(h, { props, data }) {
    const { field, value } = props;
    const type = field.type || "input";
    const attrs = getAttrs(field.controlProps);
    let children = [];

    switch (type) {
      case "input":
        field.append &&
          children.push(h("template", { slot: "append" }, field.append));
        break;
      case "select":
        children = getOptions(h, field);
        break;
      case "checkbox-group":
      case "radio-group":
        children = getCheckboxList(h, field);
        break;
    }

    // 限制字段名包含id的input只能输入数字，字段名包含phone只能输入11位数字
    let listeners = Object.assign({}, data.on, field.on);
    if (type === "input" && field.prop) {
      if (/id/i.test(field.prop)) {
        listeners.input = function (val) {
          // 只保留数字
          const num = val.replace(/\D+/g, "");
          data.on && data.on.input && data.on.input(num);
          field.on && field.on.input && field.on.input(num);
          console.log(num,"num")
        };
      } else if (/phone/i.test(field.prop)) {
        listeners.input = function (val) {
          // 只保留数字并限制为11位
          const num = val.replace(/\D+/g, "").slice(0, 11);
          // 触发v-model更新
          data.on && data.on.input && data.on.input(num);
          field.on && field.on.input && field.on.input(num);
        };
      }
    }

    return h(
      `el-${type}`,
      {
        class: field.class,
        style: field.style,
        attrs,
        props: getControlProps(type, value, field.controlProps),
        on: listeners, // 这里必须用 listeners
        nativeOn: field.nativeOn,
      },
      children,
    );
  },
};
</script>
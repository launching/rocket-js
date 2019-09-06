<template>
  <div class="r-form" :style="style">
    <el-form ref="form" v-bind="formProps">
      <template v-for="(child, i) in targetChildrenHandler">
        <el-form-item
          v-if="!isArray(child)"
          :label="child.label"
          :prop="propName(child)"
          :required="child.required"
          :size="child.size"
          :key="i"
        >
          <component
            ref="widgets"
            :is="itemType(child)"
            v-bind="child"
            @ready="widgetReady"
          ></component>
        </el-form-item>
        <el-row v-if="isArray(child)" :key="i" :gutter="10">
          <el-col
            v-for="(item, n) in child"
            :span="item.col"
            :key="`${i}-${n}`"
          >
            <el-form-item
              :label="item.label"
              :prop="propName(item)"
              :required="item.required"
              :size="item.size"
            >
              <component
                ref="widgets"
                :is="itemType(item)"
                v-bind="item"
                @ready="widgetReady"
              ></component>
            </el-form-item>
          </el-col>
        </el-row>
      </template>

      <el-form-item :size="handlerSize">
        <r-toolbar :children="toolbar" @click="toolbarHandler" :ctx="model">
        </r-toolbar>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import _ from "lodash";
import widgets from "../widgets";
import RToolbar from "../Toolbar/Toolbar";
import ChildrenMixins from "@/mixins/Children";

export default {
  mixins: [ChildrenMixins],
  components: {
    ...widgets,
    RToolbar,
  },
  props: {
    defaultModel: Object,
    toolbar: {
      type: [Array, Boolean],
      default() {
        return [
          {
            type: "primary",
            text: "提交",
            action: "SUBMIT",
          },
          {
            type: "default",
            text: "取消",
            action: "CANCEL",
          },
        ];
      },
    },
    labelWidth: String,
    width: String,
    size: String,
    handlerSize: String,
    inline: Boolean,
    statusIcon: String,
    labelPosition: String,
  },
  data() {
    return {
      rules: {},
      model: {},
      widgets: {},
      defaultModelCache: {},
    };
  },
  provide() {
    return {
      model: this.model,
      changeModelItem: this.changeModelItem,
      initModelItemValidate: (name, value) => {
        this.$set(this.rules, name, value);
      },
    };
  },
  computed: {
    validateOnRuleChange() {
      return Object.keys(this.widgets).some(key => !this.widget[key]);
    },
    targetChildrenHandler() {
      return this.targetChildren.reduce((total, current, index) => {
        const last = total[total.length - 1];
        if (current.col && current.col !== 24) {
          if (!last.widget || _.isArray(last)) {
            last.push(current);
          } else {
            total.push([current]);
          }
        } else {
          total.push(current);
        }
        return total;
      }, []);
    },
    formProps() {
      const { widgetList, toolbar, handlerSize, ...props } = this.$props;
      return {
        ...props,
        model: this.model,
        rules: this.rules,
        validateOnRuleChange: this.validateOnRuleChange,
      };
    },
    style() {
      return {
        width: `${this.width}px`,
      };
    },
  },
  watch: {
    defaultModel: {
      handler: "refreshDefaultModel",
      immediate: true,
      deep: true,
    },
  },
  methods: {
    changeModelItem(name, value) {
      this.$set(this.model, name, value);
    },
    async defaultModelHandler() {
      return _.isFunction(this.defaultModel)
        ? this.defaultModel()
        : this.defaultModel;
    },
    async refreshDefaultModel() {
      const res = await this.defaultModelHandler();
      res &&
        Object.keys(res).forEach(key => {
          this.$set(this.model, key, res[key]);
          this.defaultModelCache[key] = _.cloneDeep(res[key]);
        });
    },
    isArray: _.isArray,
    toolbarHandler(child, ctx) {
      if (_.isString(child.action)) {
        this.$emit("onClick", child.action, this.model);
        if (child.action === "SUBMIT") {
          this.submit();
        } else if (child.action === "CANCEL") {
          this.cancel();
        } else if (child.action === "SEARCH") {
          this.$emit("onSearch", this.model);
        }
      } else {
        child.action(ctx);
      }
    },
    propName(child) {
      const unPropWidget = ["datePickerGroup"];
      if (unPropWidget.indexOf(child.widget) > -1) return undefined;
      return child.name;
    },
    itemType(child) {
      const widget = child.widget || "input";
      const widgetName = widget.replace(/([A-Z])/g, e => `-${e.toLowerCase()}`);
      return `w-${widgetName}`;
    },
    validate() {
      return new Promise(resolve => {
        this.$refs.form.validate(valid => resolve(valid));
      });
    },
    async submit() {
      const valid = await this.validate();
      this.$emit("onSubmit", valid, this.model);
    },
    async cancel() {
      const form = this.$refs.form;
      form.clearValidate();
      _.forEach(this.defaultModelCache, (value, key) =>
        this.changeModelItem(key, value || "")
      );
      this.$emit("onCancel", this.model);
    },
    widgetReady(name) {
      this.defaultModelCache[name] = _.cloneDeep(this.model[name]);
    },
  },
  created() {
    this.children.forEach(item => this.$set(this.model, item.name, null));
  },
};
</script>

<style></style>

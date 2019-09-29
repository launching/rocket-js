<template>
  <el-button v-bind="btnProps" @click="click">
    <slot>{{ text }}</slot>
  </el-button>
</template>

<script>
import Disabled from "@/mixins/Disabled";
import Premise from "@/mixins/Premise";
import _ from "lodash";
export default {
  mixins: [Disabled, Premise],
  props: {
    size: String,
    type: String,
    icon: String,
    text: String,
    confirm: [String, Boolean],
    ctx: Object,
  },
  computed: {
    btnProps() {
      const { size, type, icon } = this.$props;

      return {
        size,
        type,
        icon,
        disabled: this.targetDisabled,
      };
    },
  },
  methods: {
    async _disabledHandler() {
      return _.isFunction(this.disabled)
        ? this.disabled(this.ctx)
        : this.disabled;
    },
    async click() {
      let message = this.confirm;
      let res = true;
      if (message) {
        if (_.isBoolean(message)) {
          message = this.text;
        }
        try {
          await this.$confirm(`确认要进行${message}操作吗？`);
        } catch (e) {
          res = false;
        }
      }
      res && this.$emit("click");
    },
  },
};
</script>

<style></style>

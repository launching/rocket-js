<template>
  <el-button v-bind="btnProps" @click="click">
    <slot>{{ text }}</slot>
  </el-button>
</template>

<script>
import Disabled from "@/mixins/Disabled";
import Premise from "@/mixins/Premise";
export default {
  mixins: [Disabled, Premise],
  props: {
    size: String,
    type: String,
    icon: String,
    text: String,
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
    click() {
      this.$emit("click");
    },
  },
};
</script>

<style></style>

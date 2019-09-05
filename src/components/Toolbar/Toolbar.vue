<template>
  <div class="r-toolbar">
    <r-button
      :key="index"
      v-for="(child, index) in children"
      v-bind="child"
      @click="handlerClick(child, index)"
    ></r-button>
  </div>
</template>

<script>
import RButton from "@/components/Button/Button";
import ChildrenMixins from "@/mixins/Children";
import _ from "lodash";
export default {
  mixins: [ChildrenMixins],
  components: {
    RButton,
  },
  props: {
    ctx: Object,
  },
  methods: {
    handlerClick(child, index) {
      if (_.isFunction(child.action)) {
        child.action(this.ctx);
      }
      this.$emit("click", child, this.ctx);
    },
  },
};
</script>

<style></style>

<template>
  <div class="r-input">
    <el-input
      :type="type"
      v-model="store.value"
      :disabled="targetDisabled"
      autocomplete="off"
    ></el-input>
  </div>
</template>

<script>
import BaseWidget from "@/mixins/BaseWidget";
export default {
  mixins: [BaseWidget],
  data() {
    return {
      type: "string",
    };
  },
};
</script>

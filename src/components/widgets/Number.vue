<template>
  <div class="r-input-number">
    <el-input-number
      v-model="store.value"
      :disabled="targetDisabled"
      autocomplete="off"
    ></el-input-number>
  </div>
</template>
<script>
import BaseWidget from "@/mixins/BaseWidget";
export default {
  mixins: [BaseWidget],
};
</script>

<template>
  <div>
    <keep-alive v-if="keep">
      <router-view />
    </keep-alive>
    <router-view v-else />
  </div>
</template>

<script>
export default {
  props: {
    keep: Boolean,
  },
};
</script>

<style></style>

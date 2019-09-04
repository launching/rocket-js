<template>
  <div class="rv-login">
    <r-form
      :children="children"
      @onSubmit="onSubmit"
      width="500"
      label-width="80px"
    ></r-form>
  </div>
</template>

<script>
import RForm from "@/components/Form/Form.vue";
export default {
  components: {
    RForm,
  },
  data() {
    return {
      children: [
        {
          label: "用户名",
          name: "username",
          widget: "input",
          defaultValue: "admin",
          validate: [
            {
              required: true,
              trigger: "blur",
            },
          ],
        },
        {
          label: "密码",
          name: "password",
          widget: "password",
          defaultValue: "admin",
          validate: [
            {
              required: true,
              trigger: "blur",
            },
          ],
        },
      ],
    };
  },
  methods: {
    onSubmit(validate, model) {
      if (model.username === "admin" && model.password === "admin") {
        this.$router.push({ name: "users" });
      } else {
        this.$message.error("账号密码错误");
      }
    },
  },
};
</script>

<style></style>

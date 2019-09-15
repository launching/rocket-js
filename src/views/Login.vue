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
import { login } from "@/api/auth";
export default {
  components: {
    RForm,
  },
  data() {
    return {
      children: [
        {
          label: "用户名",
          name: "name",
          widget: "input",
          defaultValue: "op_service",
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
          defaultValue: "xp123456@",
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
      login(model).then(res => {
        this.$router.push({ name: "users" });
      });
    },
  },
};
</script>

<style></style>

<template>
  <div class="rv-user-edit">
    <r-form
      width="500"
      label-width="80px"
      label-position="top"
      :children="children"
      @onSubmit="onSubmit"
      @onCancel="onCancel"
    ></r-form>
  </div>
</template>

<script>
import RForm from "@/components/Form/Form";
import { register } from "@/api/users";

export default {
  props: {},
  components: {
    RForm,
  },

  data() {
    return {
      children: [
        {
          label: "姓名",
          name: "name",
          widget: "input",
          validate: [
            {
              required: true,
              trigger: "blur",
            },
          ],
        },
        {
          label: "角色",
          name: "role",
          widget: "select",
          validate: [
            {
              required: true,
              trigger: "blur",
            },
          ],
          options: ["client", "admin"],
        },
        {
          label: "密码",
          name: "password",
          widget: "password",
          validate: [
            {
              required: true,
              trigger: "blur",
            },
          ],
        },
        {
          label: "年龄",
          name: "age",
          widget: "number",
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
      if (validate) {
        register(model).then(res => {
          this.$message.success(`${model.name}修改成功`);
        });
      }
    },
    onCancel(model) {
      this.$router.push({ name: "users" });
    },
  },
};
</script>

<style></style>

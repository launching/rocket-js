<template>
  <div class="rv-user-edit">
    <r-form
      width="500"
      :children="children"
      @onSubmit="onSubmit"
      @onCancel="onCancel"
      :default-model="{ name, password, role, age }"
    ></r-form>
  </div>
</template>

<script>
import RForm from "@/components/Form/Form";
import { updateUser } from "@/api/users";
export default {
  props: {
    name: String,
    role: String,
    age: [String, Number],
    password: String,
    id: [String, Number],
  },
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
        updateUser(this.id, model).then(res => {
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

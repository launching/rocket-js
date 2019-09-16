<template>
  <div class="rv-user-edit">
    <r-form
      width="500"
      label-width="80px"
      label-position="top"
      :children="children"
      @onSubmit="onSubmit"
      @onCancel="onCancel"
      :default-model="{ name, password, roleId, age }"
    ></r-form>
  </div>
</template>

<script>
import RForm from "@/components/Form/Form";
import { updateUser } from "@/api/users";
import { getRoles } from "@/api/roles";
export default {
  props: {
    name: String,
    roleId: [Number],
    age: [Number],
    password: String,
    id: [Number],
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
          name: "roleId",
          widget: "select",
          validate: [
            {
              required: true,
              trigger: "blur",
            },
          ],
          options: () =>
            getRoles().then(res =>
              res.map(n => ({
                label: n.name,
                value: n.id,
              }))
            ),
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
      console.dir(model);
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

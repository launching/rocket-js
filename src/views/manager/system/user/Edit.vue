<template>
  <div class="rv-user-edit">
    <r-form
      width="500"
      :children="children"
      @onSubmit="onSubmit"
      @onCancel="onCancel"
      :default-model="{ name, id, role }"
    ></r-form>
  </div>
</template>

<script>
import RForm from "@/components/Form/Form";
export default {
  props: {
    name: String,
    role: String,
    id: String,
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
      ],
    };
  },
  methods: {
    onSubmit(validate, model) {
      if (validate) {
        this.$message.success(`${model.name}修改成功`);
        this.$router.push({ name: "users" });
      }
    },
    onCancel(model) {
      this.$router.push({ name: "users" });
    },
  },
};
</script>

<style></style>

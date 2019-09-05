<template>
  <div class="rv-user-create">
    <r-form
      :children="children"
      @onSubmit="onSubmit"
      @onCancel="onCancel"
    ></r-form>
  </div>
</template>

<script>
import RForm from "@/components/Form/Form";
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
          options: ["admin", "client"],
        },
      ],
    };
  },
  methods: {
    onSubmit(validate, model) {
      if (validate) {
        this.$message.success(`${model.name}添加成功`);
        this.$emit("onSubmit");
      }
    },
    onCancel(model) {
      this.$emit("onCancel");
    },
  },
};
</script>

<style></style>

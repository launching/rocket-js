<template>
  <div class="rv-user-edit">
    <r-form
      :children="children"
      @onSubmit="onSubmit"
      @onCancel="onCancel"
      :default-model="role"
    ></r-form>
  </div>
</template>

<script>
import RForm from "@/components/Form/Form";
export default {
  props: {
    role: Object,
  },
  components: {
    RForm,
  },

  data() {
    return {
      children: [
        {
          label: "角色名",
          name: "name",
          widget: "input",
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
        this.$message.success(`${model.name}修改成功`);
        this.$router.push({ name: "roles" });
      }
    },
    onCancel(model) {
      this.$router.push({ name: "roles" });
    },
  },
};
</script>

<style></style>

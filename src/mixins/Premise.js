import _ from "lodash";
export default {
  props: {
    premise: {
      default: true,
      type: [Function, Boolean],
    },
  },
  inject: ["initItemPremise"],
  watch: {
    premise: {
      async handler() {
        const res = await this.premiseHandler();
        this.initItemPremise(this.name, res);
      },
      immediate: true,
      deep: true,
    },
  },
  methods: {
    async premiseHandler() {
      return _.isFunction(this.premise) ? this.premise() : this.premise;
    },
  },
};

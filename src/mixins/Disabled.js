import _ from "lodash";
export default {
  props: {
    disabled: [Function, Boolean],
  },
  data() {
    return {
      targetDisabled: false,
    };
  },

  watch: {
    disabled: {
      async handler() {
        const res = await this.disabledHandler();
        this.targetDisabled = !!res;
      },
      immediate: true,
      deep: true,
    },
  },

  methods: {
    async disabledHandler() {
      return _.isFunction(this.disabled) ? this.disabled() : this.disabled;
    },
  },
};

import _ from "lodash";
export default {
  props: {
    disabled: [Function, Boolean],
    ctx: Object,
  },
  data() {
    return {
      targetDisabled: false,
    };
  },

  watch: {
    disabled: {
      async handler() {
        const res = await this._disabledHandler();
        this.targetDisabled = !!res;
      },
      immediate: true,
      deep: true,
    },
  },

  methods: {
    async _disabledHandler() {
      return _.isFunction(this.disabled)
        ? this.disabled(this.ctx)
        : this.disabled;
    },
  },
};

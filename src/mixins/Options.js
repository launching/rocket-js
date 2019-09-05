import _ from "lodash";
export default {
  props: {
    options: [Function, Array],
  },
  data() {
    return {
      targetOptions: [],
    };
  },

  watch: {
    options: {
      async handler() {
        const res = await this.optionsHandler();

        this.targetOptions = res.map(item => {
          if (_.isString(item)) {
            return {
              label: item,
              value: item,
            };
          } else {
            return item;
          }
        });
      },
      immediate: true,
      deep: true,
    },
  },

  methods: {
    async optionsHandler() {
      return _.isFunction(this.options) ? this.options() : this.options;
    },
  },
};

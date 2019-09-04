import _ from "lodash";
import Disabled from "./Disabled";
import Premise from "./Premise";
export default {
  mixins: [Disabled, Premise],
  props: {
    validate: Array,
    defaultValue: "",
    name: "",
  },
  inject: ["model", "changeModelItem", "initModelItemValidate"],
  data() {
    return {
      store: {
        value: "",
      },
    };
  },
  watch: {
    defaultValue: {
      handler(defaultValue) {
        this.$set(this.store, "value", defaultValue);
      },
      immediate: true,
      deep: true,
    },
    store: {
      handler(store) {
        this.changeModelItem(this.name, store.value);
      },
      immediate: true,
      deep: true,
    },
    model: {
      handler(model) {
        if (!_.isUndefined(model[this.name])) {
          this.$set(this.store, "value", model[this.name]);
        }
      },
      deep: true,
    },
  },
  methods: {},

  created() {
    this.initModelItemValidate(this.name, this.validate);
    this.$emit("ready", this.name);
  },
};

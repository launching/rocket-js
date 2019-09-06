import _ from "lodash";
export default {
  props: {
    children: Array,
  },
  data() {
    return {
      premises: {},
    };
  },
  provide() {
    return {
      initItemPremise: (name, value) => {
        this.$set(this.premises, name, value);
      },
    };
  },
  computed: {
    targetChildren() {
      const target = [];
      const showTarget = this.children.filter(item => {
        if (!_.isUndefined(this.premises[item.name])) {
          return this.premises[item.name];
        }
        return true;
      });
      return showTarget;
    },
  },
};

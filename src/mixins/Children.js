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
      const showTarget = this.children
        .filter(item => {
          if (!_.isUndefined(this.premises[item.name])) {
            return this.premises[item.name];
          }
          return true;
        })
        .reduce((total, current, index) => {
          const last = total[total.length - 1];
          if (current.col && current.col !== 24) {
            if (!last.widget || _.isArray(last)) {
              last.push(current);
            } else {
              total.push([current]);
            }
          } else {
            total.push(current);
          }

          return total;
        }, []);
      return showTarget;
    },
  },
};

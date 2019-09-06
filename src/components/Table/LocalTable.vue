<script>
import BaseTable from "./BaseTable.vue";
import _ from "lodash";
export default {
  mixins: [BaseTable],
  data() {
    return {
      originData: [],
    };
  },
  watch: {
    data: {
      handler: "refreshData",
      immediate: true,
      deep: true,
    },
  },
  computed: {
    totalTable() {
      return this.originData.filter(item => {
        let temp = true;
        for (const key in this.filterData) {
          if (!this.filterData[key] && this.filterData[key] !== false) {
            continue;
          }

          if (_.isString(item[key])) {
            temp = temp && !!~item[key].indexOf(this.filterData[key]);
          } else {
            temp = temp && +item[key] === +this.filterData[key];
          }
        }
        return !!temp;
      });
    },
    targetData() {
      const { page, pageSize } = this.pagination;
      return this.totalTable.slice((page - 1) * pageSize, pageSize * page);
    },
    total() {
      return this.totalTable.length;
    },
  },
  methods: {
    async refreshData() {
      this.loading = true;
      const res = await this.dataHandler();
      this.loading = false;
      if (!_.isArray(res)) {
        throw new Error("data is must be Array type");
      }
      this.originData = res;
    },
    search(params, page) {
      this.filterData = {
        ...params,
      };
    },
    async dataHandler() {
      return _.isFunction(this.data) ? this.data() : this.data;
    },
  },
};
</script>

<style></style>

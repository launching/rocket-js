<script>
import BaseTable from "./BaseTable.vue";
import _ from "lodash";
export default {
  mixins: [BaseTable],
  data() {
    return {
      originData: [],
      total: 0,
    };
  },
  computed: {
    totalTable() {
      return this.originData;
    },
    targetData() {
      return this.totalTable;
    },
  },
  watch: {
    data: {
      handler: () => this.refreshData(),
      immediate: true,
      deep: true,
    },
    pagination: {
      handler() {
        this.refreshData();
      },
      deep: true,
    },
  },
  methods: {
    async dataHandler() {
      if (_.isFunction(this.data)) {
        throw new Error("data params must be Function");
      }
      return this.data({
        filter: this.filterData,
        pagination: this.pagination,
      });
    },
    async refreshData() {
      this.loading = true;
      const { items, total } = await this.dataHandler();
      this.loading = false;
      if (_.isArray(items) && _.isNumber(total)) {
        this.originData = items;
        this.total = total;
      } else {
        throw new Error(
          "data must return Object {items:Array, total: number} "
        );
      }
    },
    search(params, page) {
      this.filterData = params;
      this.pagination = {
        ...this.pagination,
        page,
      };
    },
  },
};
</script>

<style></style>

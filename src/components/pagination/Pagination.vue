<template>
  <el-pagination
    background
    :current-page.sync="page"
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
    :page-size="size"
    :total="total"
    :page-sizes="[10,15,20,30]"
    layout="total,sizes,prev, pager, next"
  ></el-pagination>
</template>

<script>
export default {
  name: 'Pagination',
  data() {
    return {
      page: 1
    }
  },
  props: {
    // 当前页数
    current: {
      type: Number,
      default: 1
    },
    // 没页条数
    size: {
      type: Number,
      default: 15
    },
    // 总条数
    total: {
      type: Number,
      default: 0
    }
  },
  methods: {
    handleSizeChange(val) {
      this.$emit('size-change', val)
    },
    handleCurrentChange(val) {
      this.$emit('current-change', val)
    }
  },
  created() {
    this.page = this.current
  },
  watch: {
    current(val) {
      this.page = val
    }
  }
}
</script>

<style scoped>
</style>

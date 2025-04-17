<template>
  <div class="tabChangeHead">
    <div class="tabNav">
      <div v-for="item in tabs" class="tabHeadItem" :class="currentTabName == item.name ? 'active' : ''" :key="item.name">
        <a @click="changeTab(item.name)">{{ item.des }}</a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tabs: []
    }
  },
  props: {
    tabNames: {
      type: Array,
      require: true
    },
    currentTabName: {
      type: String,
      require: true,
    }
  },
  watch: {
    tabNames: {
      handler(newVal, oldVal) {
        this.tabs = newVal
      },
      immediate: true
    }
  },
  methods: {
    changeTab(tabName) {
      this.$emit('changeTab', tabName)
    }
  },
  created() { },
  mounted() { }
}
</script>

<style scoped lang="scss">
.tabChangeHead {
  height: 37px;
  border-bottom: 1px solid #E9E9E9;
  padding-left: 20px;

  .tabNav {
    display: flex;
    text-align: center;
    align-items: center;
    font-size: 14px;
    height: 100%;

    .tabHeadItem {
      min-width: 84px;
      padding: 0 10px;
      height: 100%;
      border: 1px solid #E9E9E9;
      display: flex;
      justify-content: center;
      align-items: center;

      a {
        line-height: 37px;
        flex: 1;
        height: 100%;
      }
    }

    .active {
      border: 1px solid #E9E9E9;
      background-color: #409EFF;

      a {
        color: #ffffff;
      }
    }
  }
}</style>
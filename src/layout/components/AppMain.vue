<template>
  <section class="app-main">
    <transition name="fade-transform" mode="out-in">
      <subView></subView>
    </transition>
  </section>
</template>

<script>
import subView from '@/views/subView/index.vue'
export default {
  components:{
    subView
  },
  data(){
    return{
      
    }
  },
  name: 'AppMain',
  computed: {
    cachedViews() {
      return this.$store.state.tagsView.cachedViews
    },
    key() {
      return this.$route.path
    }
  },
  mounted(){

  }
}
</script>

<style lang="scss" scoped>
@import "~@/styles/variables.scss";
.app-main {
  /* 50= navbar  50  */
  height: calc(100vh - #{$navBarHeight});
  width: 100%;
  position: relative;
  overflow: hidden;
  background: #F2F2F2;
  padding: 20px;
}

.fixed-header+.app-main {
  padding-top: 50px;
}

.hasTagsView {
  .app-main {
    /* 84 = navbar + tags-view = 50 + 34 */
    min-height: calc(100vh - 84px);
  }

  .fixed-header+.app-main {
    padding-top: 84px;
  }
}
</style>

<style lang="scss">
// fix css style bug in open el-dialog
.el-popup-parent--hidden {
  .fixed-header {
    padding-right: 15px;
  }
}
</style>

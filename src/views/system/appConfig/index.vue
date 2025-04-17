<template>
  <div class="container">
    <div class="appStatusItem fontCSS">
      <span>应用状态：</span>
      <span class="appStatus">使能-运行</span>
    </div>
    <div>
      <el-button type="primary">
        使能应用
      </el-button>
      <el-button type="primary" plain>
        启动应用
      </el-button>
      <el-button type="primary" plain>
        停止应用
      </el-button>
      <el-button type="primary" plain>
        重启应用
      </el-button>
    </div>
    <div class="operateTableBtns">
      <el-button type="primary" plain>
        读取模板
      </el-button>
      <el-button type="primary">
        提交配置
      </el-button>
    </div>
    <div class="readFileContent">
      <framework v-if="$router.currentRoute.name=='initConfig'" />
      <univerView v-else/>
    </div>
  </div>
</template>
<script>
import framework from './framework.vue';
import univerView from './univerView.vue';
export default {
  name: "AppMain",
  components: {
    framework,
    univerView
  },
  mounted() {
  }
}
</script>
<style scoped lang="scss">
@import '@/styles/layout_common.scss';
@import '@/styles/table_scrollbar.scss';
.fontCSS{
  font-size: 18px;
}
.appStatus{
  color:#409EFF
}
.appStatusItem{
  margin-bottom: 20px;
}
::v-deep.el-button--primary.is-plain {
    color: #1890ff;
    background: #ffffff;
    border-color: #a3d3ff;
}
.operateTableBtns{
  margin-top: 20px;
  text-align: right;
}
.readFileContent{
  height: calc(100% - 141px);
}
</style>
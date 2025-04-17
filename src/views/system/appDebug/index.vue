<template>
  <div class="container">
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
    <div class="appStatusItem fontCSS">
      <el-button type="primary">
        进入调试
      </el-button>
    </div>
    <div class="operateTableBtns">
      <div class="searchCondition">
        <div class="searchConditionItem">
          <span>组号：</span>
          <el-select  size="mini">
            <el-option></el-option>
          </el-select>
        </div>
        <div class="searchConditionItem">
          <span>消息号：</span>
          <el-select  size="small">
            <el-option></el-option>
          </el-select>
        </div>
        <div class="searchConditionItem">
          <span>查找：</span>
          <el-input size="small"/>
          <el-button type="primary" plain size="small" style="margin-left: 10px;">
            查找
          </el-button>
        </div>
      </div>
      <div class="templateBtns">
        <el-button type="primary" size="small">
          刷新
        </el-button>
      </div>
    </div>
    <div class="readFileContent">
    </div>
  </div>
</template>
<script>

export default {
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
  margin-top: 20px;
}
::v-deep.el-button--primary.is-plain {
    color: #1890ff;
    background: #ffffff;
    border-color: #a3d3ff;
}
.operateTableBtns{
  height: 80px;
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
  .searchCondition{
    display: flex;
    align-items: center;
    .searchConditionItem{
      display: flex;
      align-items: center;
      margin-right: 10px;
      span{
        color: #606266;
        text-wrap:nowrap;
      }
    }
  }
}
.templateBtns{
  display: flex;
  align-items: center;
  text-wrap: nowrap;
}
.readFileContent{
  height: calc(100% - 200px);
  border-top: 1px solid #D8D8D8;

}
</style>
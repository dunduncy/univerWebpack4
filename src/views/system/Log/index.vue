<template>
  <div class="container">
    <div class="btns">

    </div>
    <div class="log">
      <div class="treeContainer">
        <el-tree :data="data" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
      </div>
      <div class="logContainer"></div>
  </div>
  </div>
</template>
<script>
export default {
    data() {
      return {
        data: [{
          label: '一级 1',
          children: [{
            label: '二级 1-1',
            children: [{
              label: '三级 1-1-1'
            }]
          }]
        }, {
          label: '一级 2',
          children: [{
            label: '二级 2-1',
            children: [{
              label: '三级 2-1-1'
            }]
          }, {
            label: '二级 2-2',
            children: [{
              label: '三级 2-2-1'
            }]
          }]
        }, {
          label: '一级 3',
          children: [{
            label: '二级 3-1',
            children: [{
              label: '三级 3-1-1'
            }]
          }, {
            label: '二级 3-2',
            children: [{
              label: '三级 3-2-1'
            }]
          }]
        }],
        defaultProps: {
          children: 'children',
          label: 'label'
        }
      };
    },
    methods: {
      handleNodeClick(data) {
        console.log(data);
      }
    }
  };
</script>
<style scoped lang="scss">
  @import '@/styles/layout_common.scss';
  @import '@/styles/table_scrollbar.scss';
  .flex{
    display: flex;
  }
  .btns{
    height: 40px;
    text-align: right;
  }
  .log{
    display: flex;
    height: calc(100% - 40px);
    border: 0.5px solid #c5c1c1;
  }
  .treeContainer{
    width: 270px;
    height: 100%;
    overflow: auto;
    border-right: 0.5px solid #c5c1c1;
  }
  .logContainer{
    height: 100%;
    overflow: auto;
    flex: 1;
  }
</style>
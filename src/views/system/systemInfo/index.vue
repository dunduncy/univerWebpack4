<template>
  <div class="container flex justifyCenter">
    <div class="infoContainer">
      <div class="title">
        EMU系统状态
      </div>
      <div class="subTitle">
        基础信息
      </div>
      <div class="infoItem flex justifyBetween">
        <div class="infoItemHalf itemBg infoCommonCss">
          <div class="infoIcon">
            <img src="@/assets/image/systemInfo/computer.png"/>
          </div>
          <div class="infoDes">
            <div class="infoName">名称：</div>
            <div class="infoValue">EMU/从控</div>
          </div>
        </div>
        <div class="infoItemHalf itemBg infoCommonCss">
          <div class="infoIcon">
            <img src="@/assets/image/systemInfo/platform.png"/>
          </div>
          <div class="infoDes">
            <div class="infoName">平台：</div>
            <div class="infoValue">RK3568</div>
          </div>
        </div>
      </div>
      <div class="infoItem itemBg infoCommonCss">
        <div class="infoIcon">
          <img src="@/assets/image/systemInfo/jincheng.png"/>
        </div>
        <div class="infoDes">
          <div class="infoName">协议簇版本：</div>
          <div class="infoValue">V3.1 R2</div>
        </div>
      </div>
      <div class="subTitle">
        运行信息
      </div>
      <div class="infoItem itemBg  infoCommonCss">
        <div class="infoIcon">
            <img src="@/assets/image/systemInfo/computer.png"/>
          </div>
          <div class="infoDes">
            <div class="infoName">系统：CPU(%):</div>
            <div class="infoValue blueColor">1</div>
          </div>
          <div class="infoDes">
            <div class="infoName">mem:</div>
            <div class="infoValue blueColor">1%(100kb)</div>
          </div>
          <div class="infoDes">
            <div class="infoName">运行时间：</div>
            <div class="infoValue blueColor">3day1h3s</div>
          </div>
          <div class="infoDes">
            <div class="infoName">负载：</div>
            <div class="infoValue blueColor">0.10.20.3</div>
          </div>
      </div>
      <div class="infoItem itemBg  infoCommonCss">
        <div class="infoIcon">
            <img src="@/assets/image/systemInfo/jincheng.png"/>
          </div>
          <div class="infoDes">
            <div class="infoName">进程1：CPU(%):</div>
            <div class="infoValue blueColor">1</div>
          </div>
          <div class="infoDes">
            <div class="infoName">mem:</div>
            <div class="infoValue blueColor">1%(100kb)</div>
          </div>
          <div class="infoDes">
            <div class="infoName">运行时间：</div>
            <div class="infoValue blueColor">3day1h3s</div>
          </div>
      </div>
      <div class="infoItem itemBg  infoCommonCss">
        <div class="infoIcon">
            <img src="@/assets/image/systemInfo/jincheng.png"/>
          </div>
          <div class="infoDes">
            <div class="infoName">进程2：CPU(%):</div>
            <div class="infoValue blueColor">1</div>
          </div>
          <div class="infoDes">
            <div class="infoName">mem:</div>
            <div class="infoValue blueColor">1%(100kb)</div>
          </div>
          <div class="infoDes">
            <div class="infoName">运行时间：</div>
            <div class="infoValue blueColor">3day1h3s</div>
          </div>
      </div>
    </div>
  </div>
</template>
<script>
</script>
<style scoped lang="scss">
@import '@/styles/layout_common.scss';
@import '@/styles/table_scrollbar.scss';
.infoContainer{
  max-width: 670px;
  padding: 0 20px;
}
.itemBg{
  background: #F5F7FA;
}
.title{
  height: 44px;
}
.subTitle{
  padding-left: 28px;
  height: 28px;
  line-height: 28px;
}
.infoCommonCss{
  display: flex;
  padding-left: 20px;
  align-items: center;
}

.infoItem{
  min-width: 600px;
  height:80px;
  margin-top: 12px;
  .infoItemHalf{
    width: calc(50% - 6px);
  }
  .infoIcon{
    img{
      width: 21px;
    }
    margin-right: 20px;
  }
  .infoDes{
    margin-right: 40px;
    .infoName{
      color:  #606266;
      font-size: 16px;
      font-weight: 400;
      margin-bottom: 5px;
    }
    .infoValue{
      font-size: 16px;
      font-weight: 600;
      color: #131414;
    }
    .blueColor{
      color:#0256FF;
    }
  }
  
}
.flex{
  display: flex;
}
.justifyCenter{
  justify-content: center;
}
.justifyBetween{
  justify-content: space-between;
}
</style>
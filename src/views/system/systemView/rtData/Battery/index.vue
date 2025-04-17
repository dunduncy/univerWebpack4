<template>
  <div class="content_box">
    <div class="tabBtnsContainer">
      <div class="tabBtns">
        <div class="tabBtn" :key="item.name" :class="{ 'active': currentTab == item.name }" @click="changeTab(item)"
          v-for="item in tabList">
          {{ item.label }}
        </div>
      </div>
    </div>
    <div class="tabContent">
      <component :is="currentComponet" :key="currentComponet"></component>
    </div>
  </div>
</template>

<script>
import overview from './components/overview.vue'
import parameter from './components/parameter.vue'
import singleBattery from './components/singleBattery.vue'
import Cookies from 'js-cookie'
export default {
  components: {
    overview,
    parameter,
    singleBattery
  },
  data() {
    return {
      currentLang: Cookies.get('language'),
      tabList: [
        {
          id: 1,
          label: this.$t('system$systemView$rtData$Battery$index_vue.overview'),
          name: 'overview',
          component: 'overview'
        },
        {
          id: 2,
          label: this.$t('system$systemView$rtData$Battery$index_vue.singlebattery'),
          name: 'single battery',
          component: 'singleBattery'
        },
        {
          id: 3,
          label: this.$t('system$systemView$rtData$Battery$index_vue.parameter'),
          name: 'parameter',
          component: 'parameter'
        }
      ],
      currentTab: 'overview',
      currentComponet: 'overview'
    }
  },
  methods: {
    changeTab(item) {
      this.currentTab = item.name
      this.currentComponet = item.component
    }
  },
  mounted() {
    this.bus.$on('changeLanguage', (params) => {
      this.currentLang = Cookies.get('language')
      this.tabList = [
        {
          id: 1,
          label: this.$t('system$systemView$rtData$Battery$index_vue.overview'),
          name: 'overview',
          component: 'overview'
        },
        {
          id: 2,
          label: this.$t('system$systemView$rtData$Battery$index_vue.singlebattery'),
          name: 'single battery',
          component: 'singleBattery'
        },
        {
          id: 3,
          label: this.$t('system$systemView$rtData$Battery$index_vue.parameter'),
          name: 'parameter',
          component: 'parameter'
        }
      ]
    })
  }
}
</script>

<style lang="scss" scoped>
.content_box {
  width: 100%;
  height: 100%;
}

.tabBtnsContainer {
  height: 40px;
  display: flex;

  .tabBtns {
    height: 100%;
    background-color: #F7F7F9;
    border-radius: 5px;
    padding: 5px;
    display: flex;

    .tabBtn {
      height: 100%;
      display: flex;
      align-items: center;
      padding: 10px;
      cursor: pointer;
      color: #9C9C9F;
    }

    .tabBtn.active {
      border-radius: 5px;
      background-color: #ffffff;
      box-shadow: 3px 3px 6px rgb(219, 218, 218);
      color: #000000;
    }
  }
}

.tabContent {
  height: calc(100% - 40px);
  padding: 40px;
}
</style>
<template>
  <div class="sidebar-logo-container" :class="{ collapse: collapse }">
    <transition name="sidebarLogoFade">
      <router-link
        v-if="collapse"
        key="collapse"
        class="sidebar-logo-link"
        to="/"
      >
        <img v-if="logo" :src="logo2" class="sidebar-logo" />
        <h1 v-else class="sidebar-title">{{ title }}</h1>
      </router-link>
      <router-link v-else key="expand" class="sidebar-logo-link" to="/">
        <img v-if="logo" :src="logo" class="sidebar-logo" />
        <!-- <h1 class="sidebar-title">{{ title }}</h1> -->
      </router-link>
    </transition>
      <!-- <img class="arrow" :class="{'move':!collapse}" :src="arrow0" @click="toggleSideBar" v-if="!collapse"/>
      <img class="arrow1" :class="{'move':collapse}" :src="arrow1" @click="toggleSideBar" v-else/> -->
  </div>
</template>

<script>
export default {
  name: "SidebarLogo",
  props: {
    collapse: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      title: "瑞能后台管理",
      // logo: require("@/assets/image/LOGO1.png"),
      logo: require("@/assets/image/logo_new.png"),
      logo2: require("@/assets/image/LOGO2.png"),
      arrow0:require("@/assets/image/向右.png"),
      arrow1:require("@/assets/image/向左.png"),
    };
  },
  methods:{
    toggleSideBar() {
      
      this.$store.dispatch("app/toggleSideBar");
    },
  }
};
</script>

<style lang="scss" scoped>
@import "~@/styles/variables.scss";

.sidebarLogoFade-enter-active {
  transition: opacity 1.5s;
}

.sidebarLogoFade-enter,
.sidebarLogoFade-leave-to {
  opacity: 0;
}

.sidebar-logo-container {
  position: relative;
  width: 100%;
  height: $navBarHeight;
  line-height: $navBarHeight;
  background: #64738C;
  text-align: center;
  overflow: hidden;

  & .sidebar-logo-link {
    height: 100%;
    width: 100%;

    & .sidebar-logo {
      //width: 110px;
      //height: 34px;
      width: 160px;
      vertical-align: middle;
      margin-right: 12px;
    }

    & .sidebar-title {
      display: inline-block;
      margin: 0;
      color: #fff;
      font-weight: 600;
      line-height: 50px;
      font-size: 14px;
      font-family: Avenir, Helvetica Neue, Arial, Helvetica, sans-serif;
      vertical-align: middle;
    }
  }

  &.collapse {
    .sidebar-logo {
      margin-right: 0px;
      width: 49px;
      height: 16px;
    }
  }
    
    img.arrow{
      position: fixed;
      left: 210px;
      top:10px;
      width:16px;
      height:30px;
      cursor: pointer;
    }
    img.arrow1{
      position: fixed;
      left: 53px;
      top:10px;
      width:16px;
      height:30px;
      cursor: pointer;
    }
}
</style>

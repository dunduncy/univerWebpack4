<template>
  <div class="navbar">
    <img class="logo" src="@/assets/image/logo_new.png" alt="" />
    <div class="time_lang_user">
      <div class="time">
        {{ time }}
      </div>
      <div class="lang" @click="showLangSelect" ref="lang">
        <img src="@/assets/image/navBar/lang.png" alt="" />
        <div
          :style="langSelectStyleObject"
          class="langSelect"
          v-if="langShow"
          ref="langSelect"
        >
          <div
            class="selectItem"
            :class="{ active: currentSelectLang == 'zh' }"
            @click="handleSetLanguage('zh')"
          >
            中文
          </div>
          <div
            class="selectItem"
            :class="{ active: currentSelectLang == 'en' }"
            @click="handleSetLanguage('en')"
          >
            English
          </div>
        </div>
      </div>
      <div class="user">
        <img src="@/assets/image/navBar/user.png" alt="" />
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";
import Cookies from "js-cookie";

export default {
  data() {
    return {
      time: "",
      langSelectStyleObject: {},
      langShow: false,
      currentSelectLang: "",
    };
  },
  computed: {
    handleShowActive() {
      return Cookies.get("language");
    },
  },
  methods: {
    handleSetLanguage(lang) {
      this.$i18n.locale = lang;
      this.currentSelectLang = lang;
      this.$store.dispatch("app/setLanguage", lang);
      this.bus.$emit("changeLanguage");
      this.$message({
        message: "Switch Language Success",
        type: "success",
      });
    },
    showLangSelect() {
      this.langShow = !this.langShow;
    },
    getTime() {
      let date = new Date();
      let offset = (0 - date.getTimezoneOffset()) / 60;
      offset = offset > 0 ? `+${offset}` : `-${offset}`;
      this.time = `UTC${offset} ${moment().format("YYYY-MM-DD HH:mm:ss")}`;
    },
  },
  mounted() {
    let that = this;
    window.addEventListener("click", (e) => {
      if (this.$refs.lang && !this.$refs.lang.contains(e.target)) {
        that.langShow = false;
      }
    });
  },
  created() {
    this.getTime();
    let lang = Cookies.get("language");
    if (lang) {
      this.currentSelectLang = lang;
    } else {
      this.$store.dispatch("app/setLanguage", "en");
      this.bus.$emit("changeLanguage");
    }
  },
};
</script>

<style lang="scss" scoped>
@import "~@/styles/variables.scss";

.navbar {
  height: $navBarHeight;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: $navBarBg;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
  color: #ffffff;

  .logo {
    margin-left: 43px;
    width: 200px;
  }

  .time_lang_user {
    display: flex;
    align-items: center;
    padding-right: 80px;
    .time {
      font-size: 16px;
      margin-right: 50px;
    }
    .lang {
      margin-right: 54px;
      cursor: pointer;
    }
    .langSelect {
      position: absolute;
      z-index: 1000;
      top: 57px;
      font-size: 14px;

      .selectItem {
        width: 100%;
        height: $navBarHeight;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 0 10px;
        text-align: center;
        //line-height: $navBarHeight;
        background-color: $navBarBg;
        cursor: pointer;
        border-top: 1px solid #d8d4d4;

        &.active {
          color: aqua;
        }
      }
    }
    .user {
    }
  }
}
</style>

<template>
  <div class="navbar">
    <hamburger id="hamburger-container" :is-active="sidebar.opened" class="hamburger-container"
      @toggleClick="toggleSideBar" />
      <div class="version">EMUConfig V1.02.250325</div>
    <!-- <breadcrumb id="breadcrumb-container" class="breadcrumb-container" /> -->
    <div class="flexCon">
      <!-- <div class="menuRow">
        <div class="circle">
          <img src="@/assets/image/navBar/dataIcon.png">
        </div>
        <span>运行数据</span>
      </div>
      <div class="menuRow">
        <div class="circle">
          <img src="@/assets/image/navBar/setIcon.png">
        </div>
        <span>配置设置</span>
      </div> -->
      <div class="time_lang_user">
        <!-- <div class="time">
          <span style="margin-right:20px">{{ timeZone }}</span>{{ time }}
        </div> -->
        <!-- <div class="setting" @click="setTimeZone">
          <i class="el-icon-setting"></i>
        </div> -->

        <div class="restart" @click="restartLccu" :title="$t('timeZone.restart')">
          <span>设备重启</span>
          <img src="@/assets/image/navBar/restart.png" alt="">
        </div>

        <div class="lang" @click="showLangSelect" ref="lang">
          <span>语言切换</span>
          <img src="@/assets/image/navBar/lang.png" alt="">
          <div :style="langSelectStyleObject" class="langSelect" v-if="langShow" ref="langSelect">
            <div class="selectItem" :class="{ 'active': currentSelectLang == 'zh' }" @click="handleSetLanguage('zh')">中文
            </div>
            <div class="selectItem" :class="{ 'active': currentSelectLang == 'en' }" @click="handleSetLanguage('en')">
              English
            </div>
          </div>
        </div>

        <div class="user" @click="showUserSelect" ref="user">
          <img src="@/assets/image/navBar/user.png" alt="">
          <span class="name">{{ userName }}</span>
          <i class="el-icon-caret-bottom" />

          <div :style="userSelectStyleObject" v-if="logoutShow" class="langSelect"  ref="userSelect">
            <div class="selectItem" @click="logout">
              <span>{{ $t('navbar.Logoutoflogin') }}</span>
            </div>
            <div class="selectItem" :class="{ 'active': dialogVisible }" @click="handleChangeUser">
              <span>切换用户</span>
            </div>
          </div>
        </div>
        <el-dialog
          title="切换用户"
          :close-on-click-modal="false"
          :visible.sync="dialogVisible"
          width="30%">
          <div class="userSelectContainer">
            <div class="userSelectItem" :class="{ 'active': currentUser=='admin' }" @click="changeUser('admin')">
              <img src="@/assets/image/navBar/user_blue.png"/>
              <div>管理员</div>
              <div class="current" v-if="currentUser=='admin'">当前</div>
            </div>
            <div class="userSelectItem" :class="{ 'active': currentUser=='common' }" @click="changeUser('common')">
              <img src="@/assets/image/navBar/user_blue.png"/>
              <div>普通用户</div>
              <div class="current" v-if="currentUser=='common'">当前</div>
            </div>
          </div>
          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
          </span>
        </el-dialog>
      </div>
    </div>
  </div>
</template>

<script>

import { mapGetters } from "vuex";
import Hamburger from "@/components/Hamburger";
import moment from 'moment';
import Cookies from "js-cookie";
import { getCurrDate_ysl, getATimeZone, justRestartLccuCedar } from '@/api/system/login.js'
import user from '@/store/modules/user';


export default {
  data() {
    return {
      time: '',
      timeZone: '',
      timer: null,
      userName: '',
      langSelectStyleObject: {

      },
      userSelectStyleObject: {},
      langShow: false,
      logoutShow: false,
      currentSelectLang: '',
      dialogVisible:false,
      currentUser:'admin'//普通用户common
    }
  },
  components: {
    Hamburger
  },
  computed: {
    ...mapGetters(["sidebar", "avatar", "device"]),
    handleShowActive() {
      return Cookies.get('language')
    }
  },
  methods: {
    handleSetLanguage(lang) {
      this.$i18n.locale = lang
      this.currentSelectLang = lang
      this.$store.dispatch('app/setLanguage', lang)
      this.bus.$emit('changeLanguage')
      this.$message({
        message: 'Switch Language Success',
        type: 'success'
      })
    },
    getTime() {
      let date = new Date()
      let offset = (0 - date.getTimezoneOffset()) / 60
      offset = offset > 0 ? `+${offset}` : `-${offset}`
      this.time = `UTC${offset} ${moment().format('YYYY-MM-DD HH:mm:ss')}`
    },
    async getCurrDate_ysl() {
      const { code,data } = await getCurrDate_ysl(null,false)
      const { code:code1,data:data1 } = await getATimeZone(null,false)
      this.time = data.time
      this.timeZone = `UTC${data1.utcHour}`
      let timeZone = data1.utcHour
      let UTC = 0;
      if (timeZone.indexOf('+') > -1) {
        UTC = parseInt(timeZone.split('+')[1].substring(0, 2))
      }
      if (timeZone.indexOf('-') > -1) {
        UTC = parseInt(timeZone.split('-')[1].substring(0, 2)) * (-1)
      }
      console.log(UTC)
      Cookies.set('UTC', UTC)
    },
    setTimeZone() {
      this.$router.push('/set/timeZone')
    },
    toggleSideBar() {
      this.$store.dispatch("app/toggleSideBar");
    },
    async logout() {
      // strongRemindMessage.methods.clearTimer();
      await this.$store.dispatch("user/logout");
      this.$router.push(`/login?redirect=${this.$route.fullPath}`);
    },
    showLangSelect() {
      this.langShow = !this.langShow
      if (this.langShow) {
        this.$nextTick(() => {
          let w1 = this.$refs.lang.offsetWidth
          let w2 = this.$refs.langSelect.offsetWidth

          // this.userSelectStyleObject = {
          //   width: '',
          //   transform: `translateX(${((w1 - w2) / 2) + 'px'})`
          // }
        })
      }
    },
    showUserSelect() {
      this.logoutShow = !this.logoutShow
      if (this.logoutShow) {
        this.$nextTick(() => {
          let w1 = this.$refs.user.offsetWidth
          let w2 = this.$refs.userSelect.offsetWidth
          // this.langSelectStyleObject = {
          //   width: '',
          //   transform: `translateX(${((w1 - w2) / 2) + 'px'})`
          // }
        })
      }
    },
    handleChangeUser(){
      this.dialogVisible = true
    },
    changeUser(user){
      this.currentUser = user
    },
    toUpdatePassword() {
      this.$router.push('/update/updatePassword')
    },
    restartLccu() {
      this.$confirm(this.$t('navbar.Areyousuretorestart'), this.$t('commonNotify.Prompt'), {
        confirmButtonText: this.$t('commonNotify.Confirm'),
        cancelButtonText: this.$t('commonNotify.Cancel'),
        type: 'warning'
      })
        .then(() => {
          
          try {
            // justRestartLccuCedar().then((res) => {
            //   if (res.code == 1) {
            //     this.$message({
            //       message: this.$t('navbar.Restartsuccessfully'),
            //       type: 'success'
            //     })
            //   }else{
            //     this.$message({
            //       message: res.message,
            //       type: 'error'
            //     })
            //   }
            // }).catch(() => {
            //   this.$message({
            //     message: this.$t('navbar.Restartfailed'),
            //     type: 'error'
            //   })
            // })
            justRestartLccuCedar()
            //this.logout()
          } catch (error) {
            //this.logout()
            // this.$message({
            //   message: error,
            //   type: 'error',
            //   duration: 3 * 1000
            // })
          }
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: this.$t('navbar.Cancelrestart')
          })
        })

    }
  },
  created() {
    this.getCurrDate_ysl()
    this.timer = setInterval(() => {
      if (this.time) {
        this.time = moment(this.time, 'YYYY-MM-DD HH:mm:ss').add(1, 'seconds').format('YYYY-MM-DD HH:mm:ss')
      }
    }, 1000)
    this.bus.$on('updateTime', () => {
      this.getCurrDate_ysl()
    })
  },
  mounted() {
    let that = this
    window.addEventListener('click', (e) => {
      if (this.$refs.lang && !this.$refs.lang.contains(e.target)) {
        that.langShow = false
      }
      if (this.$refs.user && !this.$refs.user.contains(e.target)) {
        that.logoutShow = false
      }
    })
    this.currentSelectLang = this.handleShowActive
  },
  beforeDestroy() {
    clearInterval(this.timer)
  },
};
</script>

<style lang="scss" scoped>
@import "~@/styles/variables.scss";

.navbar {
  height: $navBarHeight;
  display: flex;
  //justify-content: space-between;
  align-items: center;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
}

.flexCon {
  height: 100%;
  display: flex;
  align-self: right;
  margin-left: auto;
}
.version{
  color:#334E7C
}
.menuRow {
  height: 100%;
  display: flex;
  align-items: center;
  color: #64738C;
  padding: 0 34px;
  border-left: 1px solid rgba(187, 187, 187, 1);
  cursor: pointer;

  .circle {
    width: 50px;
    height: 50px;
    border-radius: 25px;
    background-color: $navBarBg;
    text-align: center;
    margin-right: 21px;

    img {
      margin-top: 13px;
    }
  }
}

.time_lang_user {
  float: right;
  display: flex;
  align-items: center;
  padding-right: 80px;
  //background-color: $navBarBg;
  height: 100%;
  color: #606266;
  >div{
    display: flex;
    align-items: center;
    >span{
      margin-right: 5px;
    }
  }
  .time {
    font-size: 16px;
    margin-right: 10px;
    margin-left: 26px;
  }

  .setting {
    cursor: pointer;
    margin-right: 30px;
  }

  .restart {
    cursor: pointer;
    margin-right: 50px;
    font-size: 14px;
    img{
      width: 20px;
    }
  }

  .lang {
    margin-right: 54px;
    cursor: pointer;
    img{
      width: 20px;
    }
  }

  .user {
    display: flex;
    align-items: center;
    font-size: 14px;
    cursor: pointer;

    img {
      width:17px
    }

    .name {
      margin-right: 5px;
    }
  }

  .langSelect {
    position: absolute;
    z-index: 1000;
    top: 57px;
    font-size: 14px;
    box-shadow: 3px 3px 3px #e0e0e0;

    .selectItem {
      width: 100%;
      height:40px;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 0 10px;
      text-align: center;
      //line-height: $navBarHeight;
      background-color: #ffffff;
      cursor: pointer;
      border-top: 1px solid #d8d4d4;
      box-shadow: inset 1px 0px 0px 0px #EBEEF5;
      &.active {
        color: #61AFFF
      }
    }
  }
}
.userSelectContainer{
  display: flex;
  flex-direction: column;
  align-items: center;
  .userSelectItem{
    width: 415px;
    height: 81px;
    display: flex;
    align-items: center;
    border-radius: 4px;
    background: #F5F7FA;
    padding: 0 20px;
    margin-top: 7px;
    cursor: pointer;
    img{
      width: 18px;
      height: 18px;
      margin-right: 20px;
    }
    &.active{
      background: #EBF3FF;
    }
    .current{
      color:#409EFF;
      margin-left: auto;
    }
  }
}
</style>

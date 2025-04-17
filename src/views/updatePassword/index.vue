<template>
  <div class="container">
    <div class="content">
      <div class="pannel">
        <div class="header">
          <img src="@/assets/image/pannel/user.png" alt="">
          <span>{{ $t('updatePassword.updatepassword') }}</span>
        </div>
        <div class="body">
          <div class="menu">
            <div class="menuItem" :class="{ 'active': activeMenu == 1 }" @click="changeMenu(1)">
              {{ $t('updatePassword.updatepassword') }}
            </div>
          </div>
          <div class="view" v-show="activeMenu === 1">
            <div class="formBody">
              <el-form label-position="left" label-width="auto" :model="updatePasswordForm" size="small" width="200px"
                :rules="rules1" ref="updateForm">
                <el-form-item :label="$t('login.username')" prop="username">
                  <el-input v-model="updatePasswordForm.username"></el-input>
                </el-form-item>
                <el-form-item :label="$t('updatePassword.oldpassword')" prop="oldPwd">
                  <el-input v-model="updatePasswordForm.oldPwd" show-password></el-input>
                </el-form-item>
                <el-form-item :label="$t('updatePassword.newpassword')" prop="newPwd">
                  <el-input v-model="updatePasswordForm.newPwd" show-password></el-input>
                </el-form-item>
                <el-form-item label="">
                  <el-button type="primary" plain style="float: inline-end;" @click="confirmUpdatePassword">{{ $t('updatePassword.confirmupdate') }}</el-button>
                </el-form-item>
              </el-form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { updatePwd } from '@/api/system/login.js'
import {
  getToken,
  setToken,
  removeToken
} from "@/utils/auth";
export default {
  data() {
    return {
      activeMenu: 1,
      updatePasswordForm: {
        username: '',
        oldPwd: '',
        newPwd1: '',
      },
      rules1: {
        username: [
          { required: true, message: this.$t('login.Pleaseentertheusername'), trigger: 'blur' },
        ],
        oldPwd: [
          { required: true, message: this.$t('updatePassword.Pleaseentertheoldpassword'), trigger: 'blur' },
        ],
        newPwd: [
          { required: true, message: this.$t('updatePassword.Pleaseenterthenewpassword'), trigger: 'blur' },
        ],
      }
    }
  },
  methods: {
    changeMenu(num) {
      this.activeMenu = num
    },
    confirmUpdatePassword() {
      this.$refs["updateForm"].validate(async valid => {
        if (!valid) {
          return;
        }
        let data = {
          username: this.updatePasswordForm.username,
          oldPwd: this.updatePasswordForm.oldPwd,
          newPwd: this.updatePasswordForm.newPwd
        }
        const res = await updatePwd(data)
        if (res.code == 1) {
          this.$message({
            type: 'success',
            message: res.data
          })
          await this.$store.dispatch("user/logout");
          this.$router.push(`/login?redirect=${this.$route.fullPath}`);
        }else{
          this.$message({
            type: 'warning',
            message: res.message
          })
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~@/styles/variables.scss';

.container {
  width: 100%;
  height: 100%;

  .content {
    width: 100%;
    height:calc(100% - #{$navBarHeight});
    overflow: hidden;
    position: relative;

    .pannel {
      width: 1176px;
      height: 651px;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);

      .header {
        width: 100%;
        height: 59px;
        line-height: 59px;
        color: rgba(100, 115, 140, 1);
        font-size: 28px;

        img {
          vertical-align: sub;
          margin-right: 20px;
        }

      }

      .body {
        width: 100%;
        height: 521px;
        border-top: 1px solid rgba(187, 187, 187, 1);
        display: flex;

        .menu {
          width: 260px;
          background-color: rgba(177, 196, 228, 0.13);
          color: rgba(16, 16, 16, 1);
          font-size: 16px;

          .menuItem {
            height: 50px;
            line-height: 50px;
            background-color: #ffffff;
            text-align: center;
            margin-top: 10px;
            cursor: pointer;
          }

          .menuItem.active {
            color: #4d85ec;
            background-color: #bfc6ca
          }
        }

        .view {
          flex: 1;
          display: flex;
          align-items: center;

          .formBody {
            width: 300px;
            margin-left: 50px;
          }
        }
      }
    }
  }
}
</style>
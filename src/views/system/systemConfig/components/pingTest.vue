<template>
  <div class="container pd20_0">
    <el-form ref="form" :model="form" :rules="rules" label-width="120px">
      <el-form-item :label="$t('timeZone.ipaddress')" prop="ip_addr">
        <el-input v-model="form.ip_addr"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">{{
          $t("timeZone.pingtest")
        }}</el-button>
      </el-form-item>
      <el-form-item :label="$t('timeZone.pingresult')">
        <el-input type="textarea" v-model="form.result" :rows="10"></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { ping_addr } from "@/api/system/login.js";
export default {
  data() {
    let validatServer1 = (rule, value, callback) => {
      let that = this;
      if (value === "") {
        callback(new Error(that.$t("timeZone.pleaseentertheserver")));
      } else {
        const ipRegex =
          /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
        //const urlRegx = /^(?:[^:\/?#]+:)?(?:\/\/[\w-]+(\.[\w-]+)+([:\d+]*)?)?([^?#:]+)?(\?[^#]*)?(#.*)?$/;
        const urlRegx =
          /^([a-zA-Z0-9]([a-zA-Z0-9\-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,6}$/;
        let flag1 = ipRegex.test(value);
        let flag2 = urlRegx.test(value);
        if (flag1 || flag2) {
          callback();
        } else {
          callback(new Error(that.$t("timeZone.formaterror")));
        }
      }
    };

    return {
      form: {
        ip_addr: "",
        result: "",
      },
      rules: {
        ip_addr: [
          {
            validator: validatServer1,
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    onSubmit() {
      this.$refs.form.validate(
        (valid) => {
          if (valid) {
            ping_addr({ ip_addr: this.form.ip_addr }).then((res) => {
              if (res.code == 1) {
                this.form.result = res.data.data;
              } else {
                this.$message({
                  message: res.message,
                  type: "error",
                });
              }
            });
          }
        },
        (error) => {
          console.log(error);
        }
      );
    },
  },
};
</script>
<style lang="scss" scoped>
@import "~@/styles/variables.scss";
@import "@/styles/layout_common.scss";
@import "@/styles/table_scrollbar.scss";
</style>
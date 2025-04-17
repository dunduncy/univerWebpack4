<template>
    <div class="container">
        <Navbar />
        <div class="content">
            <div class="pannel">
                <div class="header">
                    <img src="@/assets/image/pannel/user.png" alt="">
                    <span>{{ $t('login.login') }}</span>
                </div>
                <div class="body">
                    <div class="menu"></div>
                    <div class="view">
                        <div class="formBody">
                            <el-form label-position="left" label-width="auto" :model="form" size="small" width="200px"
                                :rules="rules" ref="loginForm">
                                <el-form-item :label="$t('login.username')" prop="username">
                                    <el-input v-model="form.username"></el-input>
                                </el-form-item>
                                <el-form-item :label="$t('login.password')" prop="password">
                                    <el-input v-model="form.password" show-password @keyup.native.enter="login_ysl"></el-input>
                                </el-form-item>
                                <el-form-item label="">
                                    <!-- <el-button type="primary" plain style="float: inline-end;" @click="login">登录</el-button> -->
                                    <el-button type="primary" plain style="float: inline-end;"
                                        @click="login_ysl">{{ $t('login.login') }}</el-button>
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
import Navbar from './components/Navbar.vue'
import { login, login_ysl } from '@/api/system/login.js'
import {
    getToken,
    setToken,
    removeToken
} from "@/utils/auth";
import Cookies from 'js-cookie';
export default {
    components: {
        Navbar
    },
    data() {
        return {
            form: {
                username: '',
                password: ''
            },
            rules: {
                username: [
                    { required: true, message: this.$t('login.Pleaseentertheusername'), trigger: 'blur' },
                ],
                password: [
                    { required: true, message: this.$t('login.Pleaseenterthepassword'), trigger: 'blur' },
                ],
            }
        }
    },
    methods: {
        login() {
            this.$refs["loginForm"].validate(async valid => {
                if (!valid) {
                    return;
                }
                // 密码登录
                await this.$store
                    .dispatch("user/login", { username: this.form.username, password: this.form.password })
                    .then(async () => {
                        this.$router.push({
                            path: "/systemView/rtData/Overview"
                        });
                        this.loading = false;
                    })
                    .catch(error => {
                        console.log(error)
                        this.$message({
                            type: 'error',
                            message: error
                        })
                        this.loading = false;
                    });
            })
        },
        login_ysl() {
            this.$refs["loginForm"].validate(valid => {
                if (!valid) {
                    return;
                }
                login_ysl({ username: this.form.username, password: this.form.password }).then(res => {
                    if(res.code==1||res.token){
                        setToken(res.token)
                        Cookies.remove('tokeninvalid')
                        if(this.form.password=='admin_123456'){
                        Cookies.set('highPermission',1)
                        }else{
                        Cookies.remove('highPermission')
                        }
                        const chooseLanguage = Cookies.get('language')
                        if (!chooseLanguage){
                        Cookies.set('language','en') 
                        }
                        this.$router.push({
                            path: "/systemView/rtData/Overview"
                        });
                    }else{
                        this.$message({
                            type: 'error',
                            message: res.message
                        })
                    }
                }).catch(err => {
                    console.log(err)
                    this.$message({
                        type: 'error',
                        message: err
                    })
                })

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
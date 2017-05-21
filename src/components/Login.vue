<template>
    <div class="login-container">
        <div class="login-card">
            <p class="login-title">后台管理系统登录</p>
            <el-form ref="form" :model="form" :rules="rules">
                <el-form-item prop="username">
                    <el-input v-model.trim="form.username" placeholder="用户名"></el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input v-model.trim="form.password" placeholder="密码"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button class="login-btn" type="primary" @click="handleLogin" :loading="loading">{{loginText}}</el-button>
                </el-form-item>
                <el-form-item>
                    <el-button class="forget-btn" type="text" @click="">忘记密码？</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
    import types from '../store/mutation-types'
    export default{
        data() {
            return {
                loginText: '登 录',
                loading: false,
                form: {
                    username: '',
                    password: ''
                },
                rules: {
                    username: [
                        { required: true, message: '请输入用户名', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: '请输入密码', trigger: 'blur' }
                    ]
                }
            }
        },
        methods: {
            handleLogin(){
                this.$refs.form.validate((valid) => {
                    if (valid) {
                        this.loginText = '登录中...';
                        this.loading = true;
                        this.$http.post('/api/login', this.form).then((response) => {
                            if(response.data.success){
                                this.$store.commit(types.LOGIN, response.data.token);
                                const redirect = decodeURIComponent(this.$route.query.redirect || '/');
                                this.$router.push({
                                    path: redirect
                                })
                            }else{
                                this.loginText = '登 录';
                                this.loading = false;
                                this.$message.error(response.data.msg);
                            }
                        }).catch((err) => {
                            this.$message.error('登录失败，请重试！');
                            this.loginText = '登 录';
                            this.loading = false;
                        });
                    } else {
                        return false;
                    }
                })
            }
        }
    }
</script>

<style lang="scss">
$themeColor: #20A0FF;
$boxShadow: 20px 20px 10px 10px rgba(#000000, 0.3);
.login-container {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    overflow-y: hidden;
    background-color: $themeColor;
}

.login-card {
    margin: 50vh auto 0;
    transform: translateY(-50%);
    padding: 50px;
    width: 300px;
    background-color: #FFFFFF;
    box-shadow: $boxShadow;
    text-align: center;
}

.login-title {
    font-size: 26px;
    font-weight: 100;
    color: #666666;
}

.login-btn {
    width: 100%;
}
</style>
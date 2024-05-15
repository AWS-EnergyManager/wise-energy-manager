<template>
    <div class="login-container">
        <el-col :span="6">
            <h3>登入畫面</h3>
            <el-form class="login-container-items">
                <el-form-item label="帳號">
                    <el-input v-model="username"></el-input>
                </el-form-item>
                <el-form-item label="密碼">
                    <el-input type="password" v-model="password"></el-input>
                </el-form-item>
                <el-button type="primary"  @click="login">登入</el-button>
            </el-form>
        </el-col>
    </div>
</template>

<script>
export default {
    name: 'LoginPage',
    data() {
        return {
            username: '',
            password: ''
        }
    },
    methods: {
        login() {
            const portal_url = '/portal_url';
            fetch(portal_url+"/auth/api/v1/login", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    userName: this.username,
                    password: this.password
                })
            })
            .then(response => response.json())
            .then(data => {
                const token = data.accessToken.split('.');
                localStorage.setItem('accessToken', token[0]);
                document.cookie = `EIToken = ${data.accessToken}`;
                console.log("token",token[0]);
            })
            .then(() => {
                this.$router.push('/');
            })

        }
        
    }
}
</script>

<style lang="scss" scoped>
.login-container {
    display: flex;
    justify-content: center;
    // align-items: center;
    height: 100vh;
    h3 {
        text-align: center;
    }
    .login-container-items {
        display: flex;
        flex-direction: column;
        justify-content: center;
    }
}

</style>
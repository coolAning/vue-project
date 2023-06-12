<template>
    <div class="container">
        <div class="first">
            <el-form :model="form" label-width="120px">
                <el-form-item label="account">
                    <el-input v-model="form.account" />
                </el-form-item>
                <el-form-item label="password">
                    <el-input v-model="form.password" />
                </el-form-item>
            </el-form>
        </div>
        <div class="second">
            <el-row class="login_bt">
                <el-button type="primary" plain @click="onSubmit">登录</el-button>
            </el-row>
        </div>
    </div>
</template>
  
<script lang="ts" setup>
import { reactive } from 'vue'
import { ElMessage } from 'element-plus'
import users_ from '../store/users'
import router from '@/router'
import userapi from '../api/users'

const users=users_()

const form = reactive({
    account: '',
    password: ''
})

const onSubmit = () => {
    userapi.login({
        account:form.account,
        password:form.password
    })
    .then(function (response) {
        ElMessage("登录成功")
        users.setSelf(response.data);
        // localStorage.setItem('uuid', response.data.uuid)
        // localStorage.setItem('account', response.data.account)
        router.push('/user')
    })
    .catch(function (error) {
        console.log(error);
    })
}


</script>
  

<style scoped>
.container {
    position: absolute;
    top: 30%;
    left: 50%;
    transform: translate(-50%, -50%);
}
.second {
    position: relative;
    left: 50%;
}
</style>

  
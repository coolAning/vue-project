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
  
<script setup>
import { reactive } from 'vue'
import request from '../api/request'
import { h } from 'vue'
import { ElMessage } from 'element-plus'

const open = (message) => {
  ElMessage(message)
}

const form = reactive({
    account: '',
    password: ''
})

const onSubmit = () => {
    request.post(`/login`,{
        account:form.account,
        password:form.password
    })
    .then(function (response) {
        console.log(response.data);
        if(response.data.status==0){
            open("登录成功")
            
        }else{
            open(response.data.message)
        }
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

  
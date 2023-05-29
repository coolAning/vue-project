<template>
    <div>
        <el-transfer v-model="value" :data="data" target-order="push"/>
    </div>

    <div>
        <el-row class="create_bt">
            <el-button type="primary" plain @click="create">提交</el-button>
        </el-row>
    </div>
</template>
  
<script  setup>
import { ref } from 'vue'
import requset from '../api/request'
import users_ from '../store/users'

const users =users_()
const data = ref([])

const id = 2;
// 向给定ID的用户发起请求
requset.get(`/${id}/getUsers`)
    .then(function (response) {
        // 处理成功情况
        console.log(response.data.result);

        data.value = response.data.result.map((value)=>{
            return {
                key: value.uuid,
                label: value.account ,
            }
        })
        console.log(data);
    })
    .catch(function (error) {
        // 处理错误情况
        console.log(error);
    })

const value = ref([])

const create = () => {
    requset.post(`/${id}/add`,{
        uuids : value.value
    })
    .then(function (response) {
        console.log(response.data.result);
    })
    .catch(function (error) {
        console.log(error);
    })
}
users.set

</script>
  
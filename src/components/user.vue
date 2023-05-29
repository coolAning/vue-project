<template>
    <div>
        <el-transfer v-model="value" :data="data" target-order="push" />
    </div>

    <div>
        <el-row class="create_bt">
            <el-button type="primary" plain @click="create">提交</el-button>
        </el-row>
    </div>
</template>
  
<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import users_ from '../store/users'
import { ElMessage } from 'element-plus'
import userapi from '../api/users'

const users = users_()
const id = users.getUUID;



console.log(users.getUUID);
console.log(users.getAccount);

// 向给定ID的用户发起请求
userapi.getUsers({},id)
    .then(function (response) {

        data.value = response.data.map((value) => {
            return {
                key: value.uuid,
                label: value.account,
            }
        })
        console.log(data);
    })
    .catch(function (error) {
        // 处理错误情况
        console.log(error);
    })


const data = ref([])

const value = ref([])


const create = () => {
    userapi.add({
        uuids: value.value
    }, id)
        .then(function (response) {
            ElMessage("创建成功")
        })
        .catch(function (error) {

            console.log(error);
        })
}

</script>
  
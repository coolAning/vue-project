<template>
    <div>
        <el-transfer v-model="value" :data="data" target-order="push" />
    </div>

    <div>
        <el-row class="create_bt">
            <el-button type="primary" plain @click="create">提交</el-button>
        </el-row>
    </div>

    <div class="demo-collapse">
        <el-collapse v-model="activeNames" @change="handleChange">
            <el-collapse-item v-for="(group, index) in panelData" :title="group.guuid" :name="index" :key="index">
                <div v-for="(user, idx) in group.data" :key="idx">
                    {{ users.searchAccount(user.useruuid) + " 顺序：" + (user.num + 1) }}

                </div>
            </el-collapse-item>
        </el-collapse>
    </div>



    <div>
        <el-table :data="tableData" style="width: 100%">
            <el-table-column prop="id" label="id" width="180" />
            <el-table-column prop="name" label="Name" width="180" />

            <el-table-column label="Select">
                <template #default="scope">
                    <el-radio-group v-model="scope.row.radio">
                        <el-radio :label="1">同意</el-radio>
                        <el-radio :label="0">拒绝</el-radio>
                    </el-radio-group>
                    <el-button @click="submit_confirm(scope.row)">提交</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>
  
<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import users_ from '../store/users'
import { ElMessage } from 'element-plus'
import userapi from '../api/users'

const tableData = ref([
    { id: 1, name: '侯', radio: 1 },
    { id: 2, name: '刘', radio: 1 },
    { id: 3, name: '唐', radio: 1 },
]);

const users = users_()


const id = users.getUUID;
// 向给定ID的用户发起请求
userapi.getUsers({}, id)
    .then(function (response) {

        data.value = response.data.map((value) => {
            return {
                key: value.uuid,
                label: value.account,
            }
        })
        users.setOthers(response.data)


    })
    .catch(function (error) {
        // 处理错误情况
        console.log(error);
    })

const activeNames = ref(['1'])
const handleChange = (val: string[]) => {
    console.log(val)
}


const data = ref([])

const value = ref([])


const submit_confirm = (row) => {
    console.log(row.radio, row.name);
}

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

const panelData = ref([])

userapi.getInfo({
}, id)
    .then(function (response) {
        panelData.value = response.data
        console.log(panelData);

    })
    .catch(function (error) {

        console.log(error);
    })

</script>
  
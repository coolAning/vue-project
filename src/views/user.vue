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
            <el-collapse-item v-for="(group, index) in panelData" :title="'下一位：' + users.searchAccount(group.next)"
                :name="index" :key="index">
                <text v-for="(user, idx) in group.data" :key="idx">
                    {{ users.searchAccount(user.useruuid) + " " }}

                </text>
                <div v-if="group.next == users.getUUID">
                    <el-button :disabled="buttonState[index]" @click="addTx(group.guuid)">取外卖</el-button>
                </div>
                <div v-if="group.next == users.getUUID">
                    <el-button @click="getConfirmState(group.guuid)">检查</el-button>
                </div>
            </el-collapse-item>
        </el-collapse>
    </div>



    <div>
        <el-table :data="tableData" style="width: 100%">
            <el-table-column prop="time" label="time" width="180" />
            <el-table-column prop="members" label="members" width="180" />
            <el-table-column prop="account" label="account" width="180" />
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
import groups_ from '../store/groups'
import { ElMessage } from 'element-plus'
import userapi from '../api/users'

const tableData = ref([]);

const users = users_()
const groups = groups_()

const id = users.getUUID;

let buttonState = []
// 向给定ID的用户发起请求
const init = async () => {
    await userapi.getUsers({}, id)
        .then(function (response) {
            // if (localStorage.getItem('uuid') != null) {
            //     users.setSelf({
            //         uuid: localStorage.getItem('uuid'),
            //         account: localStorage.getItem('account')
            //     })
            // }
            data.value = response.data.filter(value => value.uuid != users.getUUID).map(value => {
                return {
                    key: value.uuid,
                    label: value.account
                }
            })

            users.setOthers(response.data)


        })
        .catch(function (error) {
            // 处理错误情况
            console.log(error);
        })

    await userapi.getInfo({}, id)
        .then(function (response) {
            response.data.forEach(element => {
                element.data.sort((a, b) => a.num - b.num)
            });

            panelData.value = response.data;

            let groups_ = []
            for (let i = 0; i < response.data.length; i++) {
                let uuid = response.data[i].guuid
                let users_uuid = []
                for (let j = 0; j < response.data[i].data.length; j++) {
                    users_uuid.push(response.data[i].data[j].useruuid)
                }
                groups_.push({
                    uuid: uuid,
                    n_tx: response.data[i].txuuid,
                    users_uuid: users_uuid
                })
                buttonState.push(false)
            }
            groups.setGroups(groups_)

        })
        .catch(function (error) {

            console.log(error);
        })

    await userapi.getConfirm({}, id)
        .then(function (response) {
            console.log(response.data);
            tableData.value = response.data.map(value => {
                return {
                    time: value.time,
                    members: groups.getGroupUsers_uuid(value.guuid).map(value => users.searchAccount(value)).join(" "),
                    account: users.searchAccount(value.useruuid),
                    txuuid: value.txuuid,
                    radio: 1.
                }
            })

        })
        .catch(function (error) {
            console.log(error);
        })
}
init()
const activeNames = ref(['1'])
const handleChange = (val: string[]) => {
    console.log(val)
}


const data = ref([])

const value = ref([])


const submit_confirm = async (row) => {
    console.log(row.radio, row.txuuid);
    if (row.radio == 1) {
        await userapi.confirm({
            txuuid: row.txuuid,
        }, id)
            .then(function (response) {
                ElMessage("确认成功")
                init()//刷新
            })
            .catch(function (error) {
                console.log(error);
            })
    } else {
        await userapi.cancel({
            txuuid: row.txuuid,
        }, id)
            .then(function (response) {
                ElMessage("拒绝成功")
                init()//刷新
            })
            .catch(function (error) {
                console.log(error);
            })
    }


}

const create = () => {
    userapi.add({
        uuids: value.value
    }, id)
        .then(function (response) {
            ElMessage("创建成功")
            init()//刷新
        })
        .catch(function (error) {

            console.log(error);
        })
}

const panelData = ref([])

const addTx = async (g_uuid) => {
    await userapi.addTx({ guuid: g_uuid }, id)
        .then(function (response) {
            ElMessage("取外卖成功")
            console.log(response.data);
            groups.setTxByUuid(g_uuid, response.data)
        })
        .catch(function (error) {
            console.log(error);
        })
}
const getConfirmState = async (g_uuid) => {
    if (groups.getTxByUuid(g_uuid) == undefined) {
        ElMessage("请先点击取外卖")
    } else {
        await userapi.getConfirmState({ txuuid: groups.getTxByUuid(g_uuid) }, id)
            .then(function (response) {
                let mes = response.data.map(value => 
                     users.searchAccount(value)
                ).join(" ")
                ElMessage(mes)
            })
            .catch(function (error) {
                console.log(error);
            })
    }
}





</script>
  
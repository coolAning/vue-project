// stores/counter.js
import { defineStore } from 'pinia'
export interface GroupInfo {
  uuid: string,
  users_uuid: string[]
  n_tx?:string
}
export const groups = defineStore('groups', {
  state: () => {
    return {
      groups: [] as GroupInfo[]
    }
  },
  getters: {
    getGroupUsers_uuid: (state) => (uuid_: string) => {
      let data = state.groups.find((v) => v.uuid == uuid_);
      return (data ?? {}).users_uuid
    },
    getTxByUuid: (state) => (uuid_: string) => {
      let data = state.groups.find((v) => v.uuid == uuid_);
      return (data ?? {}).n_tx
    }, 

  },
  actions: {
    setGroups(groups_: GroupInfo[]) {
      this.groups = groups_
    },  
    setTxByUuid(uuid_: string, n_tx: string) {
      let index = this.groups.findIndex((v: GroupInfo) => v.uuid == uuid_)
      this.groups[index].n_tx = n_tx
    },
  },
})
export default groups
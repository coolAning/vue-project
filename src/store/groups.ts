// stores/counter.js
import { defineStore } from 'pinia'
interface GroupInfo {
  uuid: string,
  users_uuid: string[]
}
export const groups = defineStore('groups', {
  state: () => {
    return {
      groups: [] as GroupInfo[]
    }
  },
  getters: {
    // getOtherAccount: (state) => { (uuid_ : string) => state.others.find((v) => v.uuid == uuid_).account },
    // searchAccount: (state) => (uuid_: string) => {
    //   if (uuid_ == state.self.uuid) {
    //     return state.self.account
    //   }
    //   return state.others.find((v) => v.uuid == uuid_).account
    // }
    getGroupUsers_uuid: (state) => (uuid_: string) => {
      return state.groups.find((v) => v.uuid == uuid_).users_uuid
    }

  },
  actions: {
    setGroups(groups: GroupInfo[]) {
      this.groups = groups
    }
  },
})
export default groups
// stores/counter.js
import { defineStore } from 'pinia'
interface UserInfo {
  account: string,
  uuid: string
}
export const users = defineStore('users', {
  state: () => {
    return {
      self: null as UserInfo | null,
      others: [] as UserInfo[]
    }
  },
  getters: {
    getUUID: (state) => state.self.uuid,
    getAccount(state) {
      return state.self.account
    },
    // getOtherAccount: (state) => { (uuid_ : string) => state.others.find((v) => v.uuid == uuid_).account },
    searchAccount: (state) => (uuid_: string) => {
      if (uuid_ == state.self.uuid) {
        return state.self.account
      }
      return state.others.find((v) => v.uuid == uuid_).account
    }

  },
  actions: {
    setSelf(self: UserInfo) {
      this.self = self;
      // this.self.account = self.account
      // this.self.uuid = self.uuid
    },
    setOthers(others: UserInfo[]) {
      this.others = others
    }
  },
})
export default users
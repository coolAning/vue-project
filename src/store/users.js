// stores/counter.js
import { defineStore } from 'pinia'

export const users = defineStore('users', {
  state: () => {
    return {
        self:{
            account:"",
            uuid:""
        },
        others:[]
    }
  },
  getters:{
    getUUID:()=>self.uuid,
    getAccount:()=>self.account,
    getOtherAccount:(uuid_)=>others.find((v)=>v.uuid==uuid_).account,
  },
  actions: {
    setSelf(self) {
      this.self=self
    },
    setOthers(others){
        this.others=others
    }
  },
})
export default users
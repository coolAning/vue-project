import{u as H,a as _}from"./users-ad751d83.js";import{d as J,a as K,r as b,b as g,c as U,e as k,f as o,w as s,u as c,F as B,E as h,o as x,g as y,h as N,i as w,j as P,k as Q,t as R,l as $}from"./index-13174695.js";const W=J("groups",{state:()=>({groups:[]}),getters:{getGroupUsers_uuid:i=>r=>(i.groups.find(d=>d.uuid==r)??{}).users_uuid,getTxByUuid:i=>r=>(i.groups.find(d=>d.uuid==r)??{}).n_tx},actions:{setGroups(i){this.groups=i},setTxByUuid(i,r){let n=this.groups.findIndex(d=>d.uuid==i);this.groups[n].n_tx=r}}}),X={class:"demo-collapse"},Y={key:0},Z={key:1},at=K({__name:"user",setup(i){const r=b([]),n=H(),d=W(),m=n.getUUID;let D=b([]);const C=async()=>{await _.getUsers({},m).then(function(t){I.value=t.data.filter(e=>e.uuid!=n.getUUID).map(e=>({key:e.uuid,label:e.account})),n.setOthers(t.data)}).catch(function(t){console.log(t)}),await _.getInfo({},m).then(function(t){t.data.forEach(a=>{a.data.sort((l,f)=>l.num-f.num)}),S.value=t.data;let e=[];for(let a=0;a<t.data.length;a++){let l=t.data[a].guuid,f=[];for(let p=0;p<t.data[a].data.length;p++)f.push(t.data[a].data[p].useruuid);e.push({uuid:l,n_tx:t.data[a].txuuid,users_uuid:f}),D.value.push(!1)}d.setGroups(e)}).catch(function(t){console.log(t)}),await _.getConfirm({},m).then(function(t){console.log(t.data),r.value=t.data.map(e=>{let a=d.getGroupUsers_uuid(e.guuid),l=n.searchAccount(e.useruuid);(a===void 0||l===void 0)&&h("前端的问题。别甩锅给后端");let f=a;return{time:e.time,members:f.map(p=>n.searchAccount(p)).join(" "),account:l,txuuid:e.txuuid,radio:1}})}).catch(function(t){console.log(t)})};C();const E=b(["1"]),j=t=>{console.log(t)},I=b([]),V=b([]),G=async t=>{console.log(t.radio,t.txuuid),t.radio==1?await _.confirm({txuuid:t.txuuid},m).then(function(e){h("确认成功"),C()}).catch(function(e){console.log(e)}):await _.cancel({txuuid:t.txuuid},m).then(function(e){h("拒绝成功"),C()}).catch(function(e){console.log(e)})},F=()=>{_.add({uuids:V.value},m).then(function(t){h("创建成功"),C()}).catch(function(t){console.log(t)})},S=b([]),L=async t=>{await _.addTx({guuid:t},m).then(function(e){h("取外卖成功"),console.log(e.data),d.setTxByUuid(t,e.data)}).catch(function(e){console.log(e)})},M=async t=>{d.getTxByUuid(t)===void 0?h("请先点击取外卖"):await _.getConfirmState({txuuid:d.getTxByUuid(t)},m).then(function(e){let a=e.data.map(l=>n.searchAccount(l)).join(" ");h(a)}).catch(function(e){console.log(e)})};return(t,e)=>{const a=g("el-transfer"),l=g("el-button"),f=g("el-row"),p=g("el-collapse-item"),O=g("el-collapse"),A=g("el-radio"),q=g("el-radio-group");return x(),U(B,null,[k("div",null,[o(a,{modelValue:V.value,"onUpdate:modelValue":e[0]||(e[0]=u=>V.value=u),data:I.value,"target-order":"push"},null,8,["modelValue","data"])]),k("div",null,[o(f,{class:"create_bt"},{default:s(()=>[o(l,{type:"primary",plain:"",onClick:F},{default:s(()=>[y("提交")]),_:1})]),_:1})]),k("div",X,[o(O,{modelValue:E.value,"onUpdate:modelValue":e[1]||(e[1]=u=>E.value=u),onChange:j},{default:s(()=>[(x(!0),U(B,null,N(S.value,(u,v)=>(x(),Q(p,{title:"下一位："+c(n).searchAccount(u.next),name:v,key:v},{default:s(()=>[(x(!0),U(B,null,N(u.data,(T,z)=>(x(),U("text",{key:z},R(c(n).searchAccount(T.useruuid)+" "),1))),128)),u.next==c(n).getUUID?(x(),U("div",Y,[o(l,{disabled:c(D)[v],onClick:T=>L(u.guuid)},{default:s(()=>[y("取外卖")]),_:2},1032,["disabled","onClick"])])):$("",!0),u.next==c(n).getUUID?(x(),U("div",Z,[o(l,{onClick:T=>M(u.guuid)},{default:s(()=>[y("检查")]),_:2},1032,["onClick"])])):$("",!0)]),_:2},1032,["title","name"]))),128))]),_:1},8,["modelValue"])]),k("div",null,[o(c(P),{data:r.value,style:{width:"100%"}},{default:s(()=>[o(c(w),{prop:"time",label:"time",width:"180"}),o(c(w),{prop:"members",label:"members",width:"180"}),o(c(w),{prop:"account",label:"account",width:"180"}),o(c(w),{label:"Select"},{default:s(u=>[o(q,{modelValue:u.row.radio,"onUpdate:modelValue":v=>u.row.radio=v},{default:s(()=>[o(A,{label:1},{default:s(()=>[y("同意")]),_:1}),o(A,{label:0},{default:s(()=>[y("拒绝")]),_:1})]),_:2},1032,["modelValue","onUpdate:modelValue"]),o(l,{onClick:v=>G(u.row)},{default:s(()=>[y("提交")]),_:2},1032,["onClick"])]),_:1})]),_:1},8,["data"])])],64)}}});export{at as default};
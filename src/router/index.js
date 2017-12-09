import Log from '../views/app/system/log.vue'
import RoleList from '../views/app/system/roleList.vue'
import UserList from '../views/app/userManagement/userList.vue'
import AddUser from '../views/app/userManagement/addUser.vue'
import UserInfo  from '../views/app/userManagement/userInfo.vue'
import UserInfoUpdate from '../views/app/userManagement/userInfoUpdate.vue'
import AppInfoList from '../views/app/appManagement/appInfoList.vue'


const ROUTES = [
  {
    path: '/',
    name: '默认',
    component: UserList
  },
  {
    path: '/log',
    name: '操作日志',
    component: Log
  },
  {
    path:'/userlist',
    name:'用户信息',
    component:UserList
  },
  {
    path:'/addUser',
    name:'添加用户',
    component:AddUser
  },
  {
    path:'/userInfo',
    name:'用户信息详情',
    component:UserInfo
  },
  {
    path:'/userInfoUpdate',
    name:'用户信息修改',
    component:UserInfoUpdate
  },
  {
    path:'/roleList',
    name:'角色信息',
    component:RoleList
  },
  {
    path:'/appInfoList',
    name:'应用信息',
    component:AppInfoList
  }
]
module.exports = {ROUTES}

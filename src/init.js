import Vue from 'vue'
import Vuex from 'vuex'
import VueRouter from 'vue-router'
import Element from 'element-ui'
import Table from './components/Table.vue'
import Page from './components/Page.vue'
import Select from './components/Select.vue'
import DatePicker  from './components/Date.vue'
import Radio from './components/Radio.vue'
import Toast from './components/Toast.vue'
import './const'
import 'element-ui/lib/theme-default/index.css'
import './assets/styles/base.css'
import vuex_store from './vuex/store'
import axios from './api/api'

Vue.use(VueRouter)
Vue.use(Element)
Vue.use(Vuex)
Vue.component(Table.name,Table);
Vue.component(Page.name,Page);
Vue.component(Select.name,Select);
Vue.component(DatePicker.name,DatePicker);
Vue.component(Radio.name,Radio);
Vue.component(Toast.name,Toast);

Vue.prototype.$http = axios;

export default{
  init(app, routes = []){
    const router = new VueRouter({
      routes
    })
    const store = new Vuex.Store(vuex_store)
    return new Vue({
      router,
      store,
      render: h=>h(app)
    }).$mount("#app");
  }
}


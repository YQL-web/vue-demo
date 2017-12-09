/**
 * Created by encore on 2017/5/18.
 */
import axios from 'axios'
import Qs from 'qs'

//axios.defaults.baseURL = 'http://121.49.99.131/biolo_center_backgroud/apiBack';
//axios.defaults.baseURL = 'http://121.49.99.131/biolo_backgroud/apiBack';
//axios.defaults.baseURL = 'http://192.168.1.80/apiBack';

axios.defaults.baseURL = 'http://127.0.0.1:1234/apiBack';
axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded';

export default{
  /**
   * 登陆接口
   * @param data
     */
  login(data){
    return axios.post('/login/doLogin.json',Qs.stringify(data));
  },
  /**
   * 注销接口
   */
  logout(){
    return axios.post('/login/logout.json');
  },
  /**
   * 获取会员列表
   */
  getMemberList(data){
    return axios.post('/userBaseInfo/list.json',Qs.stringify(data));
  },
  /**
   * 根据主键id查看当前会员信息详情
   * @param data
   * @returns {AxiosPromise|*}
     */
  getMemberInfo(data){
    return axios.post('/userBaseInfo/queryInfo.json',Qs.stringify(data));
  },
  /**
   * 新增会员
   * @param data
     */
  addMember(data){
    return axios.post('/userBaseInfo/save.json',Qs.stringify(data));
  },
  /**
   * 修改会员信息
   * @param data
     */
  updateMemberInfo(data){
    return axios.post('/userBaseInfo/update.json',Qs.stringify(data));
  },
  /**
   * 获取静脉图像
   * @param data
   * @returns {*|AxiosPromise}
     */
  getHeadPic(data){
    return axios.post('/userBaseInfo/uploadPhoto.json',Qs.stringify(data));
  },
  /**
   * 获取系统操作日志
   * @param data
   * @returns {*|AxiosPromise}
     */
  getLogList(data){
    return axios.post('/operation/list.json',Qs.stringify(data));
  },
  /**
   * 获取应用信息列表
   * @param data
   * @returns {*|AxiosPromise}
     */
  getAppList(data){
    return axios.post('/externalAppInfo/list.json',Qs.stringify(data));
  }
}

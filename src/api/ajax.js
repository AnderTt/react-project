/*使用axios封装ajax请求的模块*/
//引入axios
import axios from 'axios'
/*https://www.baidu.com/s ? tn=96494599_s_hao_pg  &   isource=infinity  &   wd=jjj*/
export default function ajax(url , data={} , type='GET') {
  if( type === 'GET'){
    //获取请求参数
    let queryStr = '';
    //遍历data
    Object.keys(data).map(key=>{
      const value = data[key];
      queryStr += `${key}=${value}&`;
      //username=xxx&password=xxx&
    });
    if(queryStr){
      queryStr=queryStr.substring(0,queryStr.length-1);
      url += '?'+queryStr;
    }
    return axios.get(url);
  }else if( type === 'POST'){
    return axios.post(url , data);
  }
}
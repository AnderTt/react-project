/*
包含n个工具函数的模块
 */
/*
注册laoban--> /laobaninfo
注册大神--> /dasheninfo
登陆laoban --> /laobaninfo 或者 /laoban
登陆大神 --> /dasheninfo 或者 /dashen
 */
export function getRedirectPath(type,header) {
  let path = '';
  if (type==='dashen'){
    path +='/dashen';
  }else {
    path += '/laoban';
  }
  if(!header){
    path +='info'
  }
  return path;
}
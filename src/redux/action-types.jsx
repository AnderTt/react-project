/*定义action的type类型,有几种type类型就有几个actions函数*/
export const AUTH_SUCCESS = 'auth_sucess';
export const ERROR_MSG = 'error_msg';
export const RECEIVE_USER = 'receive_user';// 接收用户
export const RESET_USER = 'reset_user'; // 重置用户
export const RECEIVE_USER_LIST = 'receive_user_list';//接受用户列表
export const RECEIVE_CHAT_MSGS = 'receive_chat_msgs'; //接受当前用户的消息列表
export const RECEIVE_CHAT_MSG = 'receive_chat_msg'; //接受一条的消息列表
export const MSG_READ = 'msg_read' // 查看了一些未读消息
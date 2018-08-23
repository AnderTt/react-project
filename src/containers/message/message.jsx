/*
对话消息列表组件
 */
import React, {Component} from 'react'
import {connect} from 'react-redux'
import {List, Badge} from 'antd-mobile'


const Item = List.Item;
const Brief = Item.Brief;

class Message extends Component {
  /*
   从chatMsgs中找出每个聊天中的最后一个msg组成的数组
   1. 创建一个对象容器(lastMsgObjs): 用来存储每个分组的lastMsg, key是chat_id, value是msg
   2. 遍历chatMsgs, 取出msg, 并判断msg是否是所属分组最后一条, 如果是保存到lastMsgObjs中
   3. 得到lastMsgObjs的所有value组成的数组(lastMsgs)
   4. 对lastMsgs数组进行排序,降序，最新的消息显示在最想面
    */
  getLastMsgs = (chatMsgs,meId)=>{
    //1. 创建一个对象容器(lastMsgObjs): 用来存储每个分组的lastMsg, key是chat_id, value是msg
    const lastMsgObjs= {};
    //2. 遍历chatMsgs, 取出msg, 并判断msg是否是所属分组最后一条, 如果是保存到lastMsgObjs中;
    chatMsgs.forEach((msg)=>{
      // 未读消息: !msg.read && msg.to===meId
      // 对当前msg进行统计
      if(!msg.read && msg.to===meId){
        msg.unReadCount=1;
      }else {
        msg.unReadCount=0;
      }
      const chatId = msg.chat_id;
      // 获取当前组的lastMsg
      const lastMsg = lastMsgObjs[chatId];
      if(!lastMsg){//如果chatId所标识的聊天列表中没有lastMsgs，那么msg就为最后一条信息
        lastMsgObjs[chatId] = msg
      }else{ /// 有同组2条msg, 只有当当前msg更晚, 保存当前msg

        // 在确定lastMsg之前: 统计新的unReadCount
        const unReadCount = msg.unReadCount + lastMsg.unReadCount;

        if(msg.create_time>lastMsg.create_time){
          lastMsgObjs[chatId] = msg
        }
        // 已经确定了lastMsg: 给当前组lastMsg指定unReadCount
        lastMsgObjs[chatId].unReadCount = unReadCount
      }
    });
    //得到lastMsgObjs的所有value组成的数组(lastMsgs)
    const lastMsgs = Object.values(lastMsgObjs);
    //对lastMsgs数组进行排序,降序，最新的消息显示在最想面
    lastMsgs.sort((msg1,msg2)=>{
      return msg2.create_time - msg1.create_time;
    });
    return lastMsgs
  };
  render() {
    const {user}=this.props;
    const {users,chatMsgs} = this.props.chat;
    const meId = user._id;
    const lastMsgs = this.getLastMsgs(chatMsgs,meId);
    return (
      <List style={{marginTop : 50, marginBottom: 50}}>
        {
          lastMsgs.map((msg,index)=> {
            //得到目标用户的id
            const targetId = meId === msg.to ? msg.from : msg.to;
            //得到目标用户的信息
            const target = users[targetId];
            return (<Item
              key={index}
              extra={<Badge text={msg.unReadCount}/>}
              thumb={require(`../../assets/images/${target.header}.png`)}
              arrow='horizontal'
              onClick={()=>this.props.history.push(`/chat/${targetId}`)}
            >
              {msg.content}
              <Brief>{target.username}</Brief>
            </Item>)
          })
        }
      </List>
    )
  }
}

export default connect(
  state=>{
    console.log(state,'005');
    return {user: state.user, chat : state.chat}
  }
)(Message)
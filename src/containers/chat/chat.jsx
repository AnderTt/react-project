import React,{Component} from 'react';
import {connect} from 'react-redux'
import {NavBar, List, InputItem,Icon,Grid} from 'antd-mobile'
import {sendMsg} from '../../redux/actions'

const Item = List.Item;
class Chat extends Component{
  state ={
    content : '',
    isShow : false
  };
  // 在第一次render()之前调用
  componentWillMount () {
    const emojis = ["🤠","🐕","🎙","🥧","💻","😬","😘","👀","🤠","🐕","🎙","🥧","💻","😬","😘","👀","🤠","🐕","🎙","🥧","💻","😬","😘","👀","🤠","🐕","🎙","🥧","💻","😬","😘","👀","🤠","🐕","🎙","🥧","💻","😬","😘","👀","🤠","🐕","🎙","🥧","💻","😬","😘","👀","🤠","🐕","🎙","🥧","💻","😬","😘","👀","🤠","🐕","🎙","🥧","💻","😬","😘","👀","🤠","🐕","🎙","🥧","💻","😬","😘","👀","🤠","🐕","🎙","🥧","💻","😬","😘","👀","🤠","🐕","🎙","🥧","💻","😬","😘","👀"]
    this.emojis = [];
    emojis .forEach(emoji =>(
      this.emojis.push({text:emoji})
    ))
  }

  // 初始化显示滚动到底部
  componentDidMount() {
    // 初始显示列表
    window.scrollTo(0, document.body.scrollHeight)
  }

  // 更新显示时滚动到底部
  componentDidUpdate () {
    // 更新显示列表
    window.scrollTo(0, document.body.scrollHeight)
  }
  send=()=>{
    //内容
    const {content} = this.state;
    if(!content.trim()) {
      return
    }
    //当前用户的userid
    const from = this.props.user._id;
    //接收方用户的userid
    const to = this.props.match.params.userid;
    this.props.sendMsg({content,from,to});
    //清空
    this.setState({content : '',isShow : false})
  };
  toggleEmojis = () => {
    //isShow为非isShow做到切换
    const isShow = !this.state.isShow;
    this.setState({isShow});
    if(isShow) {
      // 异步手动派发resize事件,解决表情列表显示的bug
      setTimeout(() => {
        window.dispatchEvent(new Event('resize'))
      }, 0)
    }
  };

  render(){
    const {user} = this.props;
    //当前用户的id
    const meId = user._id;
    //目标用户的id
    const targetId = this.props.match.params.userid;
    const {users,chatMsgs} = this.props.chat;
    const chatId = [meId, targetId].sort().join('_'); // 当前聊天的ID
    //因为发请求获取用户列表时需要一定的时间，如果直接使用用户聊天列表里的东西可能会报错，因为数据可能没有请求回来
    //这里也不能直接判断users有没有，因为对象的布尔值都为true,可以判断对象中的属性值有没有
    if(!users[meId]){
      return <h3>LOADING.....</h3>
    }
    // 从chatMsgs中过滤出我与当前目标用户的聊天
    const msgs = chatMsgs.filter(msg => msg.chat_id===chatId);

    const targetIcon =require(`../../assets/images/${users[targetId].header}.png`);
    return (
      <div id='chat-page'>
        <NavBar className='fixed-top'
          icon={<Icon type='left'/>}
          onLeftClick={() => this.props.history.goBack()}
        >{users[targetId].username}</NavBar>
        <List style={{marginBottom: 50,marginTop: 50}}>
          {
            msgs.map(msg=>{
              if(msg.to===meId){
                return (<Item key={msg._id} thumb={targetIcon}> {msg.content} </Item>)
              }else {
                return (<Item key={msg._id} className='chat-me' extra='我' > {msg.content} </Item>)
              }
            })
          }
        </List>
        <div className='am-tab-bar'>
          <InputItem onChange={(val)=>{this.setState({content:val})}}
            placeholder="请输入"
            value = {this.state.content}
            onFocus = {()=>this.setState({isShow:false})}
                     className='gray'
            extra={
              <span>
                <span onClick={this.toggleEmojis}>🤠</span>
                <span onClick={this.send}>发送</span>
              </span>
            }
          />
          {/*this.state.isShow为true，显示标枪*/}
          {
            this.state.isShow
              ? (
                <Grid
                  data={this.emojis}
                  columnNum={8}
                  carouselMaxRow={4}
                  isCarousel={true}
                  onClick={(item) => {
                    this.setState({content: this.state.content + item.text})
                  }}
                />
              )
              : null
          }
        </div>

      </div>
    )
  }
}
export default connect(
  state=>({user:state.user,chat:state.chat}),
  {sendMsg}
)(Chat);
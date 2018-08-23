import React,{Component} from 'react';
import PropTypes from 'prop-types';
import {WingBlank,Card,WhiteSpace} from 'antd-mobile';
import  {withRouter} from 'react-router-dom'
import QueueAnim from 'rc-queue-anim';


const Header = Card.Header;
const Body = Card.Body;
class UserList extends Component{
  static propTypes = {
    userList : PropTypes.array.isRequired
  };
  render(){
    // 只显示有头像的, 没有头像就会被过滤掉
    const userList = this.props.userList.filter(user => user.header);
    return (


    <WingBlank>
      {/*alpha left right top bottom scale scaleBig scaleX scaleY*/}
      <QueueAnim type='scale' delay={100}>
        {
          userList.map((user,index)=>(

              <div key={index}>
                  <WhiteSpace/>
                  <Card onClick={()=>this.props.history.push(`/chat/${user._id}`)}>
                    <Header
                      thumb={require(`../../assets/images/${user.header}.png`)}
                      extra={user.username}
                    />
                    <Body>
                      { user.post ?<div>职位: {user.post}</div> : null }
                      { user.company ?<div>公司: {user.company}</div> : null }
                      { user.salary ?<div>月薪: {user.salary}</div> : null }
                      { user.info ?<div>描述: {user.info}</div> : null }
                    </Body>
                  </Card>
                </div>
          ))
        }
      </QueueAnim>
      </WingBlank>
    )
  }
}
export default withRouter(UserList);
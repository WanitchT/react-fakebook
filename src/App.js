import React from 'react';
import './App.css';
import { Avatar, Typography, Button, Input, Row, Col, Card } from 'antd';
import { HeartOutlined, ShareAltOutlined, FileImageOutlined } from '@ant-design/icons'
import moment from "moment";

import { Form, Checkbox } from 'antd';


import HeaderFakeBook from './components/HeaderFakeBook'
// import PostInput from './components/PostInput'

import SignIn from './pages/SignIn'
import UsersContent from './pages/UsersContent'
import HomeContent from './pages/HomeContent'

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'

const { Title } = Typography;


let profileDetail = {
  image: "https://pbs.twimg.com/profile_images/1102083453984489472/xTOxzvEk_400x400.jpg",
  name: "Jennis BNK48"
}


class Home extends React.Component {
  render () {
    return (
      <HomeContent/>
    )
  }
}

class Users extends React.Component {
  render () {
    return (
      <>
      <UsersContent/>
      
      <PostUser/>
      </>
    )
  }
}

class NewsFeed extends React.Component {
  render () {
    return (
      <>
      <HeaderFakeBook/>
      <PostFeed/>
      </>
    )
  }
}

class PostFeed extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      postItems: [
        {
          postImage: "https://f.ptcdn.info/098/065/000/puybx8hhnMrRxy6lZvX-o.jpg",
          postAvatar: "https://i.pinimg.com/originals/76/83/9c/76839c7b0804c5e893be776701214877.jpg",
          postName: "Mobile BNK48",
          postTime: "2020-07-12",
          postText: "Code Camp 2020 - Day 1"
        },
        {
          postImage: "https://pbs.twimg.com/media/Ec8PL-dU0AAQL97?format=jpg&name=large",
          postAvatar: "https://i.pinimg.com/originals/76/83/9c/76839c7b0804c5e893be776701214877.jpg",
          postName: "Mobile BNK48",
          postTime: "2020-07-15",
          postText: "Code Camp 2020 - Day 2"
          
        }
      ],
      postAvatarTb: "",
      postNameTb: "",
      postTextTb: ""
    }
  }

  addPostItem = (postImage, postAvatar, postName, postTime, postText) => {
    this.state.postItems.push({
      postImage: postImage,
      postAvatar: profileDetail.image,
      // cName: cName,
      postName: profileDetail.name,
      postTime: moment().format("DD-MM-YYYY hh:mm:ss"),
      postText: postText
    })
    this.setState({
      postItems: this.state.postItems
    })
  }

  
  render() {
    return (
      <>
    <Row>
      <Col span={18} offset={3}>
      <div style={{marginTop:18}}>

      <Title level={4}>News Feed</Title>

        <PostInput postAvatarTb={this.state.postAvatarTb} postNameTb={this.state.postNameTb} postTextTb={this.state.postTextTb} addPostItem={this.addPostItem}></PostInput>

        {this.state.postItems.map((postItem) =>
          <Card 
          hoverable
          className="post-wrap">
            <div style={{ marginRight: 10, marginBottom: 10, float: "left" }}>
              <Avatar round={true} size="40" alt={postItem.postName} src={postItem.postAvatar} />
            </div>

            <div style={{ marginRight: 10, marginBottom: 10 }}>
              <b style={{ color: "#0080ff"}}>{postItem.postName}</b><br/>
              <span style={{ fontSize: 10 }}>{postItem.postTime}</span>
            </div>
            <div className="clearBoth"></div>

            <div style={{ marginRight: 10, marginBottom: 10 }}>
              <span style={{ fontSize: 18 }}>{postItem.postText}</span>
            </div>
            <img src={postItem.postImage} alt="" style={{ width: "100%"}}/>


            <Col span={4} offset={10} style={{margin: 10}}>
              <HeartOutlined style={{fontSize: 22}} /> <ShareAltOutlined style={{fontSize: 22}} />
            </Col>
            
            <Comment/>
            {/* <CommentPostList postComments={postItem.postComments}></CommentPostList> */}

          </Card>
          
        )}

      </div>
      </Col>

    </Row>
    </>
    )
        
  }
}

class PostInput extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      postImageTb: props.postImageTb,
      postAvatarTb: props.postAvatarTb,
      postNameTb: props.postNameTb,
      postTimeTb: props.postTimeTb,
      postTextTb: props.postTextTb
    }
  }

  addPost = () => {
    this.props.addPostItem(this.state.postImageTb,this.state.postAvatarTb, this.state.postNameTb, this.state.postTimeTb, this.state.postTextTb);
  }

    render () {
      return (
        <>
        <Row>
          <Col span={24} offset={0}>
            <Card style={{marginTop:100}}>
              <div>Post หน่อยสิ</div>
              
              <Input prefix={<Avatar round={true} size="80" alt={profileDetail.name} src={profileDetail.image} />} placeholder="โพสอะไรหน่อยสิ" allowClear value={this.state.postTextTb} onChange={(e) => {
                this.setState({
                  postTextTb: e.target.value
                })
              }}></Input>

              <Input prefix={<FileImageOutlined />} placeholder="ใส่ URL รูป" allowClear value={this.state.postImageTb} onChange={(e) => {
                this.setState({
                  postImageTb: e.target.value
                })
              }}></Input>

              <Button type="primary" shape="round" onClick={this.addPost}> Post </Button>
  
            </Card>
          </Col>
        </Row>
        </>
      )
    }
  }

class CommentInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cAvatarTb: props.cAvatarTb,
      cNameTb: props.cNameTb,
      cTextTb: props.cTextTb
    }
  }
  // componentDidUpdate(prevProps) {
  //   // Typical usage (don't forget to compare props):
  //   if(prevProps.foodNameTb != this.props.foodNameTb){
  //     this.setState({
  //       foodNameTb: this.props.foodNameTb,
  //     foodCostTb: this.props.foodCostTb,
  //     isUpdate : true
  //     });
  //   }
  // }

  addComment = () => {
    this.props.addCommentItem(this.state.cAvatarTb, this.state.cNameTb, this.state.cTextTb);
  }
  updateComment = () => {
    this.props.doUpdateFoodItem (this.state.foodNameTb, this.state.foodCostTb);
  }
  render() {
    return <div>
      {/* <div>Name </div>
      <div>
      <input value={this.state.cNameTb} onChange={(e) => {
          this.setState({
            cNameTb: e.target.value
          })
        }}></input>
      </div> */}
      <div>Comment</div>
      <div>
      
      <Input prefix={<Avatar round={true} size="80" alt={profileDetail.name} src={profileDetail.image} />} placeholder="แสดงความคิดเห็น" allowClear value={this.state.cTextTb} onChange={(e) => {
          this.setState({
            cTextTb: e.target.value
          })
        }}></Input><Button type="primary" shape="round" onClick={this.state.isUpdate ? this.updateFood : this.addComment} > {this.state.isUpdate ? "Update" : "comment"}</Button>
      </div>
    </div>
  }
}


class CommentList extends React.Component {

  render() {
    return <div>
      {this.props.commentItems.map((commentItem) =>
        <div style={{ marginRight: 10, marginBottom: 10 }}>
          <span style={{ marginRight: 10, marginBottom: 10 }}>
            <Avatar round={true} size="50" alt={commentItem.cName} src={commentItem.cAvatar} />
          </span>
          
          <span>
            <b style={{ color: "#0080ff"}}>{commentItem.cName}</b> {commentItem.cText}
          </span>
          
        </div>)}
    </div>
  }
}

class Comment extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      commentItems: [
        {
          cAvatar: "https://scontent.fbkk5-3.fna.fbcdn.net/v/t1.0-9/85195474_1482117041950379_8720398243705389056_o.jpg?_nc_cat=105&_nc_sid=85a577&_nc_eui2=AeHIRVLJlrW_zRUM4YBZ-rCrc_FwdKGWHjRz8XB0oZYeNMP7ztCmz38K98jmRZFhMfjl8O47T_xqq3qnq-wNBPUQ&_nc_ohc=1-SM0pWg8KUAX8I4A6M&_nc_ht=scontent.fbkk5-3.fna&oh=699659c5c2769fde0c6afd2593429753&oe=5F35C932",
          cName: "Music BNK48",
          cText: "hello"
        },
        {
          cAvatar: "https://scontent.fbkk5-6.fna.fbcdn.net/v/t1.0-9/67484025_2373580746063306_7557864078304083968_o.jpg?_nc_cat=102&_nc_sid=110474&_nc_eui2=AeGs7tJ0pgZpB3EeLFKVahfLCnPY7l3ebf0Kc9juXd5t_TklDanmCFtx0hKHyEUCDW0SC6eq43lFucW1PwXMXhBX&_nc_ohc=x5VrMStYPrAAX8ToZt3&_nc_ht=scontent.fbkk5-6.fna&oh=b59535af20bdf1bde9f8b20d2d9fe3f8&oe=5F380384",
          cName: "Cherprang BNK48",
          cText: "^^"
        }
      ],
      cAvatarTb: "",
      cNameTb: "",
      cTextTb: ""
    }
  }

  addCommentItem = (cAvatar, cName, cText) => {
    this.state.commentItems.push({
      cAvatar: profileDetail.image,
      // cName: cName,
      cName: profileDetail.name,
      cText: cText
    })
    this.setState({
      commentItems: this.state.commentItems
    })
  }

  render() {
    return (
      <div style={{ marginLeft: 10 }}>
        <CommentList commentItems={this.state.commentItems}></CommentList>
        <CommentInput cAvatarTb={this.state.cAvatarTb} cNameTb={this.state.cNameTb} cTextTb={this.state.cTextTb} addCommentItem={this.addCommentItem}></CommentInput>
      </div>
    )
  }
}

class CommentUser extends Comment {
  constructor(props) {
    super(props)
    this.state = {
      commentItems: []
    }
  }

}

class PostUser extends PostFeed {
  constructor(props) {
    super(props);
    this.state = {
      postItems: []
    }
  }

  render() {
    return (
      <>
    <Row>
      <Col span={18} offset={3}>
      <div style={{marginTop:18}}>

      <Title level={4}>News Feed</Title>

        <PostInput postAvatarTb={this.state.postAvatarTb} postNameTb={this.state.postNameTb} postTextTb={this.state.postTextTb} addPostItem={this.addPostItem}></PostInput>

        {this.state.postItems.map((postItem) =>
          <Card 
          hoverable
          className="post-wrap">
            <div style={{ marginRight: 10, marginBottom: 10, float: "left" }}>
              <Avatar round={true} size="40" alt={postItem.postName} src={postItem.postAvatar} />
            </div>

            <div style={{ marginRight: 10, marginBottom: 10 }}>
              <b style={{ color: "#0080ff"}}>{postItem.postName}</b><br/>
              <span style={{ fontSize: 10 }}>{postItem.postTime}</span>
            </div>
            <div className="clearBoth"></div>

            <div style={{ marginRight: 10, marginBottom: 10 }}>
              <span style={{ fontSize: 18 }}>{postItem.postText}</span>
            </div>
            <img src={postItem.postImage} alt="" style={{ width: "100%"}}/>


            <Col span={4} offset={10} style={{margin: 10}}>
              <HeartOutlined style={{fontSize: 22}} /> <ShareAltOutlined style={{fontSize: 22}} />
            </Col>
            
            <CommentUser/>

          </Card>
          
        )}

      </div>
      </Col>

    </Row>
    </>
    )
        
  }
}


function App() {
  return (
    <Router>
        <div>
          <Switch>
            <Route path="/signin"><SignIn /></Route>
            <Route path="/newsfeed"><NewsFeed /></Route>
            <Route path="/users"><Users /></Route>
            <Route path="/home"><Home /></Route>
          </Switch>
        </div>
      </Router>
  );
}

export default App;

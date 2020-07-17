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

import PostInput from './components/PostInput'
import PostFeedList from './components/PostFeedList'
import Comment from './components/Comment'
import CommentInput from './components/CommentInput'
import CommentList from './components/CommentList'

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

        <PostFeedList postItems={this.state.postItems} />

      </div>
      </Col>

    </Row>
    </>
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

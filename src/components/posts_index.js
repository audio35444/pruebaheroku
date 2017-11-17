import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

import {fetchPosts} from '../actions';
import _ from 'lodash';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import Modal from './modal';
import Firebase from '../lib/firebase';
class PostsIndex extends React.Component{
  constructor(){
    super();
  }
  componentDidMount(){
    Firebase.auth().onAuthStateChanged((user)=>{
      if(user){
        console.log('entro en loggedOn');
        this.setState({loggedIn:true})
        this.props.fetchPosts();
        console.log('en index');
        console.log(this.props.posts);

      }else{
        console.log('entro en loggedoff');
          this.setState({loggedIn:false})
          this.props.history.push('/');
      }
    });

  }
  renderPosts(){
    return _.map(this.props.posts,post=>{
      if(post)return (
        <li key={post.id} className="list-group-item">
          <Link to={`/posts/${post.id}`}>{post.title}</Link>
          <button className="btn btn-primary margin-left" onClick={()=>{
            this.props.history.push({
              pathname: '/posts/new',
              search: '',
              state: { post }
            })
          }}>Editar</button>
        </li>
      );
    });
  }
  render(){
    const transitionOptions={
      transitionName:"fade",
      transitionEnterTimeout:500,
      transitionLeaveTimeout:500
    };
    return(
      <div className="flex-direction-horizontal">
        <div className="text-xs-right">
          <Link className="btn btn-primary margin-top" to="/posts/new">
            Add a Post
          </Link>
        </div>
        <h3>Posts</h3>
        <ul className="list-group">
          <ReactCSSTransitionGroup {...transitionOptions}>
            {this.renderPosts()}
          </ReactCSSTransitionGroup>
        </ul>
        <Modal>
          <h1>hola mundo</h1>
          <h2>hola mundo2</h2>
          <h3>hola mundo3</h3>
        </Modal>
      </div>

    );
  }
}
function mapStateToProps(state){
  return {posts:state.posts};
}

export default connect(mapStateToProps,{fetchPosts})(PostsIndex);

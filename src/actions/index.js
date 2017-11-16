import _ from 'lodash';
import axios from 'axios';
import Firebase from '../lib/firebase';
import md5 from 'js-md5';
export const FETCH_POSTS = 'fetch_posts';
export const FETCH_POST = 'fetch_post';
export const CREATE_POST = 'create_post';
export const DELETE_POST = 'delete_post';
const ROOT_URL = 'http://reduxblog.herokuapp.com/api';
const API_KEY = '?key=audio354441234';

const itemsRef = Firebase.database().ref();

export function fetchPosts(){
  return dispatch =>{
    itemsRef.on('value',(elements)=>{
      console.log(elements.val()['posts']);
        dispatch({
          type:FETCH_POSTS,
          payload:{data:elements.val()['posts']}
        });
    });
  }
  // const request = axios.get(`${ROOT_URL}/posts${API_KEY}`);
  // return (dispatch)=>{
  //   request.then((result)=>{
  //     dispatch({type:FETCH_POSTS,payload:result})
  //   });
  // };
  // return {
  //   type:FETCH_POSTS,
  //   payload:request
  // };

}

export function createPost(values,callback){
  return dispatch => {
    var id=(new Date()).toJSON().replace(/[-:.]/g,'');
    values.id=md5(id+values.title+values.description);
    itemsRef.child(`posts/${values.id}`).set(values).then(()=>callback());
  }
  // const request = axios.post(`${ROOT_URL}/posts${API_KEY}`,values)
  // .then(()=> callback());
  //
  // return {
  //   type:CREATE_POST,
  //   payload:request
  // };
}

export function fetchPost(id){

  return dispatch =>{
    var newRef = itemsRef.child(`posts/${id}`);
    newRef.on('value',(element)=>{
      dispatch({
        type:FETCH_POST,
        payload:{data:element.val()}
      });
  });
}
  // const request = axios.get(`${ROOT_URL}/posts/${id}${API_KEY}`);
  // return {
  //   type:FETCH_POST,
  //   payload:request
  // }
}
export function deletePost(key,callback){
  return dispatch=> itemsRef.child(`posts/${key}`).remove().then(()=>callback());
  return {
    type:DELETE_POST,
    payload:id
  }
}

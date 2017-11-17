import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import {BrowserRouter,Route,Switch,browserHistory} from 'react-router-dom';

//import App from './components/app';
import reducers from './reducers';
import PostsIndex from './components/posts_index';
import PostsNew from './components/posts_new';
import PostsShow from './components/posts_show';
import Pruebas from './components/pruebas';
import promise from 'redux-promise';
import thunk from 'redux-thunk'

const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
// class Hello extends React.Component{
//   render(){
//     return(
//       <div>Hello!</div>
//     );
//   }
// }
// class Goodbye extends React.Component{
//   render(){
//     return(
//       <div>Goodbye!</div>
//     );
//   }
// }
ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>

    <BrowserRouter >
      <div>
        <div>
          <h1>HEADER</h1>
        </div>
        <Switch>
          <Route path="/posts/new" component={PostsNew}/>
          <Route path="/posts/:id" component={PostsShow}/>
          <Route path='/postlist' component={PostsIndex}/>
          <Route path="/" component={Pruebas}/>
        </Switch>
        <div>
          <h1>FOOTER</h1>
        </div>
    </div>
    </BrowserRouter>

  </Provider>
  , document.querySelector('.container'));

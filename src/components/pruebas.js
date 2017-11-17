import React,{Component} from 'react';
import Firebase from '../lib/firebase';

class Pruebas extends Component{
  state={loggedIn:false};
  constructor(props){
    super(props);
    this.state={
      authenticated:false,
      email:'juaninsis@gmail.com',
      password:'1234567890'
    };
    //window.currentUser = Firebase.auth().currentUser;
  }
  componentWillMount(){
    Firebase.auth().onAuthStateChanged((user)=>{
      if(user){
        console.log('entro en loggedOn');
        this.setState({loggedIn:true})
      }else{
        console.log('entro en loggedoff');
          this.setState({loggedIn:false})
      }
    });
  }
  createUser(){
    console.log('en create user');
    // admin.auth().createUser({
    //   email: "juaninsis@gmail.com",
    //   emailVerified: false,
    //   phoneNumber: "+11234567890",
    //   password: "123456",
    //   displayName: "Emmanuel",
    //   photoURL: "https://photo620x400.mnstatic.com/795a1607fe4987eb9d685a4b714d866a/pasaje-de-lodares.jpg",
    //   disabled: false
    // })
    var email = this.state.email,
    password=this.state.password;
    //variables in global browser
    //window.password = password;
    const callbackLSuccess = this.onLoginSuccess.bind(this);
    const callbackCSuccess = this.onCreateSucess.bind(this);
    const callbackLFail = this.onLoginFail.bind(this);
    console.log(this.state.authenticated);
    console.log('el usuario logueado es: ',Firebase.auth().currentUser);
    Firebase.auth().signInWithEmailAndPassword(email,password)
    .then(function(userRecord) {
      // See the UserRecord reference doc for the contents of userRecord.
      callbackLSuccess();
      console.log("Successfully exists", userRecord);
    })
    .catch(function(error) {
      console.log(error);
      if(error.code ==='auth/user-not-found'){
        console.log('el usuario no existe');
        Firebase.auth().createUserWithEmailAndPassword(email,password)
        .then((userSave)=>{
          callbackCSuccess();
          //this.onCreateSucess.bind(this);
          console.log('User create successfully');
        })
        .catch(errorCreate=>{
          callbackLFail();
          //this.onLoginFail.bind(this);
          console.log(errorCreate);
        });
      }else console.log(error.code[5].toUpperCase()+error.code.slice(6).replace('-',' '));
    });
  }
  onLoginFail(){
    this.setState({
      msg:'Fail in login'
    });
  }
  onLoginSuccess(){
    this.setState({
      email:'',
      password:'',
      msg:'Login success'

    });
  }
  onCreateSucess(){
    this.setState({
      email:'',
      password:'',
      msg:'Create success'

    });
  }
  renderForm(){
    switch (this.state.loggedIn) {
      case false:
        return (
          <div>
            <h3>Login</h3>
            <h5>Email: </h5>
            <input
              value={this.state.email}
              placeholder={' Email'}
              onChange={event=>{
                this.setState({email:event.target.value});
              }}/>
              <h5> Password: </h5><input
                type="password"
                value={this.state.password}
                placeholder={'Password'}
                onChange={event=>{
                  this.setState({password:event.target.value});
                }}/>
            <button
              className="btn btn-primary margin-left"
              onClick={this.createUser.bind(this)}
              >Login or Create</button>
          </div>
        );
      case true:
        return (
            <button
              className="btn btn-primary margin-left"
              onClick={()=>{console.log('entro al click');Firebase.auth().signOut().then((value)=>{console.log('logout');});}}
              >Logout</button>
        );
      default:
        return (<div>
          <h1>Loading...</h1>
        </div>);
    }
  }
  render(){
    return(
      <div>
        <h1>Hola</h1>
        {this.renderForm()}
      </div>
    );
  }
}

export default Pruebas;

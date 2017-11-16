import React,{Component} from 'react';
import {Field,reduxForm} from 'redux-form';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {createPost} from '../actions';

const validationList=[
  'exist',
  'lengthMin',
  'lengthMax'
];
const genericValidators={
  exist:(element)=>(element!=null),
  lengthMax:(element,cant)=>element.length <=cant,
  lengthMin:(element,cant)=>element.length >=cant
}
var FIELDS = {
  title:{
    type:'input',
    label:'Title for Post',
    validations:{
      exist:{
        validator:(element)=>(element!=null),
        msg:'Enter a Title'
      },
      lengthMin:{
        cant:5,
        msg:'Enter a title with lengthMin to 5 chars'
      },
      lengthMax:{
        cant:40,
        msg:'Enter a title with lengthMax to 40 chars'
      }
    }
  },
  categoria:{
    type:'input',
    label:'Categoria',
    validations:{
      exist:{
        msg:'Enter a Categoria'
      }
    }
  },
  description:{
    type:'textarea',
    label:'Post Description',
    validations:{
      exist:{
        msg:'Enter a Description'
      }
    }
  }
};
FIELDS.title.validations['exist']={
  validator:genericValidators.exist,
  msg:'Enter a Title'
};
FIELDS.title.validations['lengthMin']={
  validator:genericValidators.lengthMin,
  msg:'Enter a title with lengthMin to 5 chars'
};

class PostsNew extends Component{
  constructor(props){
    super(props);
  }
  renderField(field){
    //es como hacer const {touched,error}=meta;
    const {meta:{touched,error}}=field;
    const classNameLabel = `form-group ${touched && error ? 'has-danger':'' }`
    return (
      <div className={classNameLabel}>
        <label htmlFor="">{field.label}</label>
        <input
          className="form-control"
          type="text"
          {...field.input}
        />

          {error && touched ? (
            <div className="alert alert-danger margin-top" role="alert">
              {error}
            </div>) :''
          }

      </div>
    );
  }
  onSubmit(values){
    this.props.createPost(values,()=>{
      this.props.history.push('/');
    });
  }
  renderFunction(fieldConfig,field){
    return (
      <Field
        label={fieldConfig.label}
        name={field}
        component={this.renderField}
      />
    );
  }
  render(){
    const {handleSubmit}=this.props;
    return(
      <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
        <h3>New Post</h3>
        {_.map(FIELDS,this.renderFunction.bind(this))}
        <button type="submit" className="btn btn-primary margin-right">Submit</button>
        <Link to="/" className="btn btn-danger margin-left">Cancel</Link>
      </form>
    );
  }
}

function validate(values){

  const errors = {};
  _.each(FIELDS,(type,field)=>{
    if(!values[field])errors[field]=`Enter a ${field}`;
  });
  return errors;
}
const form='PostsNewForm';
export default reduxForm({
  validate,
  form,
  fields:_.keys(FIELDS)
})(
  connect(null,{createPost})(PostsNew)
);

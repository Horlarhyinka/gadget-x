import Select from "react-select";
import { handle_upload } from "../functions/form";
import { UploadMessage } from "../components/messages";
import { Component,createRef} from "react";

class UploadForm extends Component{
  constructor(props){
    super(props);
    this.props = props;
    this.state = {
      ready:false,
      Failed:false,
      Success:false,
      Pending:false,
      Category:"",
      Name:"",
      Price:"",
      Prev_img_file:{},
      More_img_file:[],
      Pre_img_url:[],
      More_img_url:[],
      AlertOpen:false,
      moreInfo:{},
      more_prop:""
    };
  this.cat_options = [
      {label:"Phones and Tablets",value:"Phones and Tablets"},
      {label:"Laptops and Macbooks",value:"Laptops and Macbooks"},
      {label:"Headphones",value:"Headphones"},
      {label:"Power Banks",value:"Power Banks"},
      {label:"Watches",value:"Watches"},
      {label:"Others",value:"Others"}
  ];
  this.more_options =[
    {label:"color",value:"color"},
    {label:"about",value:"about"},
    {label:"battery",value:"battery"},
    {label:"duration",value:"duration"},
    {label:"memory",value:"memory"},
    {label:"weight",value:"weight"},
  ]
  this.setPrevImgUrl = (url)=>{
    this.setState({Pre_img_url:url})
  };

  this.setMoreImgUrl = (url)=>{
    this.setState({More_img_url:url})
  }

  const isSuccessful = () =>{
    this.setState({Success:true,Pending:false,Failed:false});
  };
  const isFailed =()=>{
    this.setState({Failed:true,Success:false,Pending:false})
  };
  const isPending =() =>{
    this.setState({Pending:true,Failed:false,Success:false})
  };
  const reset = () =>{
    this.setState({Failed:false,Success:false,Pending:false})
  }
  this.actions = {isFailed,isSuccessful,isPending, reset}
  this.moreInfoValueRef = createRef()
  this.moreInfoPropertyRef = createRef()

  }
  render(){
    const fields = {
      category:this.state.Category,
      price:parseInt(this.state.Price),
      name:this.state.Name,
      preview_image_url:this.state.Pre_img_url,
      more_images_url:this.state.More_img_url,
      moreInfo:this.state.moreInfo
    }
      let closeMessage = () =>{
        this.setState({Pending:false,Success:false,Failed:false,AlertOpen:false});
        }
      let  openMessage = () =>{
      this.setState({AlertOpen:true,Pending:true});
      }
        let handle_more_img = (e) =>{
      let tempArr = [];
      Array.from(e.target.files).forEach(file =>{
        tempArr.push(file);
      })
      return this.setState({More_img_file:tempArr})
    }
    const addedInfo = Object.entries(this.state.moreInfo).map(
        (field)=>{
          return (<div key={field}>
            <label>{field[0]}</label>
            <input defaultValue={field[1]} readOnly = "" type="string" />
          </div>)
        }
      )
      const addToMore = (e) =>{
        e.preventDefault()
        const property = this.state.more_prop
        const value = this.moreInfoValueRef.current.value
        if(!property || !value) return;
        const more = this.state.moreInfo
        more[property] = value
        this.setState({moreInfo:more})
        
      }
      return <form className="upload_form" onSubmit={(e) =>{e.target.reset()}}  >
      <label>select product category</label>
      <Select  options={this.cat_options} 
      onChange={(e)=>this.setState({Category:e.value})}
        />
      <label>input product name</label>
      <input type={"text"} required  name={"name"} 
      onChange={(e)=> this.setState({Name:e.target.value})}
       />
      <label>input product price</label>
      <input type={"text"}  name={"price"} onChange={(e)=>this.setState({Price:e.target.value})}/>
      <label>upload image</label>
      <input type={"file"}    name={"prev_image"} onChange={(e)=> this.setState({Prev_img_file:[e.target.files[0]]})} />
      <label>input more images</label>
      <input type={"file"} multiple  name={"more_images"} onChange={handle_more_img } />
      <label>more info</label><hr></hr>
      {addedInfo}
      <div className="more_wrapper">
        <div className="more_prop_wrapper">
          <p>property</p>
        <Select className= "moreprop" options={this.more_options} 
        onChange={(e)=>this.setState({more_prop:e.value})} />
        </div>
        <div className="more_val_wrapper">
          <p>value</p>
          <input type={"text"} ref={this.moreInfoValueRef} className= "moreval" />
        </div>
        <button className="addmore" onClick={(e)=>addToMore(e)}>add</button>
      </div>
      <br/>
      <button className="upload_btn"
       onClick={
        (e,actions = this.actions,
        display = openMessage,
        prev_file = this.state.Prev_img_file,
        more_files= this.state.More_img_file)=>handle_upload(e,actions,display,prev_file,more_files,fields)} >
        upload
        </button>
      <UploadMessage states={this.state} closeMessage={closeMessage} openMessage={openMessage}  />
  </form>

  }
}


export {UploadForm}
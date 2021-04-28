
import React, { Fragment,useState} from 'react';
import {useForm} from 'react-hook-form' 
import APIService from './APIService'
import MuiPhoneNumber from 'material-ui-phone-number'
import { ToastContainer, toast } from 'react-toastify';
import { Zoom } from 'react-toastify';
import {
    Grid,
    Typography,
    TextField,
    FormControlLabel,
    Checkbox,
    InputLabel,
    MenuItem ,
    FormControl,
    Select
} from '@material-ui/core';
import { injectStyle } from "react-toastify/dist/inject-style";

if (typeof window !== "undefined") {
  injectStyle();
}


function Reagistration() {
  const [username, setUsername] = useState('')
  const [phone_number, setphone_number] = useState('')
  const [email, setEmail] = useState('')
  const [shop_name ,setshop_name ] =useState('')
  const [category , setcategory ] = useState('')
  const [is_active,setis_active] =useState('')
  const {register,errors,handleSubmit} = useForm()

  
  
  
const ReagisterBtn =()=>{
    APIService.RegisterUser({username, phone_number ,email,shop_name,category,is_active})
    .then(res =>{
      
      if (res && res.data== "Authentication credentials were not provided."){
        alert('Authentication credentials were not provided')
        return undefined
      }
      else if(res && res.data.email == "This field must be unique."){
        
        toast.dark('Email already exists', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,


      });
        return undefined
      }
      else if(res && res.data.email == "Enter a valid email address."){
        
        toast.dark(' Enter a valid email address', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,


      });
        return undefined
      }
      else if(res && res.data.username == 'tenent with this username already exists.'){
        
        
        toast.dark('Tenent with this username already exists.', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,


      });
        return undefined
      }
      else if(res && res.data.phone_number == 'tenent with this phone number already exists.'){
        
        alert('tenent with this phone number already exist')
        return undefined
      }
      else if(res && res.data.phone_number == 'The phone number entered is not valid.'){
        
        alert('The phone number entered is not valid.')
        return undefined
      }
       alert('Tenent registred sucessfully')
      
    })
    .catch(({message,response}) =>{
      console.log(message,response)
    })
  }

  
    return (
     <div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        />
    
    <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModalCenter">
    Launch demo modal
  </button>
  
  <div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content">
      <form  onSubmit={handleSubmit(ReagisterBtn)}>
        <div class="modal-header">
        <Typography variant="title" gutterBottom style={{textAlign: 'center',color:'black'}}>
         Tenent Reagistration
        </Typography>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
        <Fragment>
       
        <div className='container' style={{margin:'20px',marginRight:'10px',padding:'40px'}}>
        <Grid container spacing={28}>

                <TextField
                    style={{marginBottom:'10px',marginRight:'20px'}}
                    required
                    id="Shop Name"
                    label="Shop Name"
                    fullWidth
                    value = {shop_name} 
                    onChange = {e => setshop_name(e.target.value)}
                />


                <TextField
                    style={{marginBottom:'10px',marginRight:'20px'}}
                    required
                    id="email"
                    label="Email"
                    fullWidth
                    value = {email} 
                    onChange = {e => setEmail(e.target.value)}
                />
          
            
            <TextField
                    style={{marginBottom:'10px',marginRight:'20px'}}
                    required
                    id="userPassword"
                    label="Username"
                    fullWidth
                    value = {username} 
                    onChange = {e => setUsername(e.target.value)}
                />
            
           
                <TextField
                   defaultCountry={'india'}
                   style={{marginBottom:'10px',marginRight:'20px'}}
                    required
                    name="phone"
                    label="Phone Number"
                    data-cy="user-phone"
                    id="PhoneNumber"
                    fullWidth
                    value = {phone_number} 
                    onChange = {e => setphone_number(e.target.value)}
                />
                <FormControl fullWidth style={{ marginRight:'20px'}} >
                    <InputLabel id="demo-simple-select-label">Category</InputLabel>
                    <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value = {category} 
                    onChange = {e => setcategory(e.target.value)}
                    >
                    <MenuItem value={10}>Ten</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem>
                    </Select>
                </FormControl>
                
                <FormControlLabel
                    style={{color:'black'}}
                    control={<Checkbox color="secondary" name="policyAgreement" value="true"/>}
                    label="Active Status"
                    value = {is_active} 
                    onChange = {e => setis_active(e.target.value)}
                />
        </Grid>
        </div>
        
    </Fragment>
        </div>
       
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
          <button type="submit" class="btn btn-secondary">Submit</button>
        </div>
        </form>
      </div>
    </div>
  </div>
  
  </div>
    )
}

export default Reagistration

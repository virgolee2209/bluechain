import { useAuth } from "../context/auth";
import { Redirect } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import { Button, CircularProgress, Container, TextField, Typography } from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';
import React,{ FormEvent } from 'react';
import {useState} from 'react'
import Axios from 'axios';
import qs from 'qs';
import { v4 as uuidv4 } from 'uuid';
const useStyles = makeStyles((theme) => ({
    paper: {
      marginTop: theme.spacing(8),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
    }
  }));

const HomePage = () => {
    const { token } = useAuth();
    const [customer, setCustomer]= useState({
        //firstName
    });
    const [isLoading, setIsLoading]=useState(false);
    const [isError, setIsError] = useState(false);
    const classes = useStyles();
    function doSubmit(e:FormEvent<HTMLFormElement>){
        e.preventDefault();
        setIsError(false);
        setIsLoading(true);
        console.log(customer);
        try{
            const response= doSaveCustomer(customer).then((result)=>{
                console.log(result);
                setIsError(false);

            }).catch((error)=>{
                console.log(error);
                setIsError(true);
                
            }).finally(()=>{
                setIsLoading(false);
            });
        }
        catch(error){
            console.log(error);
        }
    }
    function handleInputChange(name:string, value:string) {
        setCustomer({...customer,[name]:value});
    }
    function doSaveCustomer(customer:any){
        //sending hardcode data for now for testing. Should get actual datafrom handle input change function
        return Axios({
            method:"POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
              },
            data:qs.stringify({
                requestKey:uuidv4(),
                person:{
                    mobile:'0123456',
                    email:'test@email.com',
                    fullName:'Test',
                    familyName:'test',
                    givenName:'test',
                    middleName:'',
                    countryOfResidenceCode:'AU',
                    dateOfBirth:'1999-03-03',
                    addressDetails:{},
                    //paymentAlias:''
                },
                business:{
                    phoneNumber:'042346622',
                    legalName:'Test Entity',
                    businessName:'Test Entity',
                    email:'abc@abc.com',
                    businessNumber:'034565451',
                    merchantCategoryCode:'1234',
                    addressDetails:{
                        address:'23 fds fds',
                        countryCode:'AU'
                    }
                }
            }),
            url: 'https://webapi.demo.bluechain.com/v1/onboard'
        });
    }
    return (
        token ? (
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <div className={classes.paper}>
                    <Typography component="h1" variant="h5">
                        Onboard Customer
                    </Typography>
                    <form onSubmit={doSubmit}>
                        <TextField variant="outlined" margin="normal"
                        required
                        fullWidth
                        id="familyName"
                        label="Family Name"
                        name="familyName"
                        onChange={(e)=>handleInputChange(e.target.name,e.target.value)}/>
                        <TextField variant="outlined" margin="normal"
                        fullWidth
                        label="Family Name"
                        name="givenName"
                        onChange={(e)=>handleInputChange(e.target.name,e.target.value)}/>
                        

                        {isLoading ? (<CircularProgress color="secondary"/>): (<Button variant="contained" color="primary" type="submit">
                            Save
                        </Button>) }
                        {isError ? (<Typography color="error">Error with save</Typography>):(<div></div>) }
                        {/* <Button variant="contained" color="primary" fullWidth=false type="submit" label="Sign In"/> */}

                        
                    </form>
                </div>
            </Container>
          ) : (
            <Redirect
              to={{
                pathname: "/login"
              }}
            />
          )
            
    );
}
export default HomePage;
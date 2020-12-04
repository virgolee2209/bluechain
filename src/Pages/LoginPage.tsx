import { Button, CircularProgress, Container, TextField, Typography } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import CssBaseline from '@material-ui/core/CssBaseline';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import React,{ FormEvent } from 'react';
import {useState} from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Axios from 'axios';
import qs from 'qs';
import { Redirect } from "react-router-dom";
import { useAuth } from "../context/auth";

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
const LoginPage = () => {
    const [isLoggedIn, setLoggedIn] = useState(false);
    const [username, setUserName]= useState('');
    const [password, setPassword]=useState('');
    const [isLoading, setIsLoading]=useState(false);
    const [isError, setIsError] = useState(false);
    const classes = useStyles();
    const { setToken } = useAuth();
    function doSubmit(e:FormEvent<HTMLFormElement>){
        e.preventDefault();
        setIsError(false);
        setIsLoading(true);
        console.log(username);
        console.log(password);
        try{
            const response= doLogin(username,password).then((result)=>{
                console.log(result);
                setIsError(false);
                setToken(result.data.access_token);
                setLoggedIn(true);

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
    function doLogin(username:string,password:string){
        return Axios({
            method:"POST",
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
              },
            data:qs.stringify({
                username:username,
                password:password,
                Client_ID:'c.user.password',
                Grant_type:'password'
            }),
            url: 'https://webapi.demo.bluechain.com/v1/OAuth2/token'
        });
    }
    if (isLoggedIn) {
        return <Redirect to="/" />;
      }
    return (
        <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form  onSubmit={doSubmit}>
            <TextField variant="outlined" margin="normal"
            required
            fullWidth
            id="username"
            label="User Name"
            name="username"
            autoComplete="username"
            autoFocus
            onChange={(e)=>setUserName(e.target.value)}
            />
            <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={(e)=>setPassword(e.target.value)}
            />
            {isLoading ? (<CircularProgress color="secondary"/>): (<Button variant="contained" color="primary" type="submit">
                Sign In
            </Button>) }
            {isError ? (<Typography color="error">Invalid login details</Typography>):(<div></div>) }
            {/* <Button variant="contained" color="primary" fullWidth=false type="submit" label="Sign In"/> */}

            
        </form>
        </div>
      </Container>
        
    );
}

export default LoginPage;
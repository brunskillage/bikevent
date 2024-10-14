import React, { createContext, useContext } from 'react';
import { useForm } from 'react-hook-form';
import {appConfigContext } from '../App';
import axios from "axios";
import { jwtDecode } from 'jwt-decode';
import { redirect, Router } from 'react-router-dom';
let moment = require('moment')
//import Moment from 'react-moment'


export const Login = (args) => {  
    var appConfigCtx = useContext(appConfigContext)

    const {
        register,
        handleSubmit,   
        setError,
        formState: { errors }
      } = useForm();

      const onSubmit = (formData) =>{
        // serverside check values
        axios.post(`${appConfigCtx.apiDomain}/api/v1/login`, formData)
        .then(resp => {
            // console.log(resp.data)
            if(!resp?.data?.success){
                resp?.data?.data?.errors?.forEach(err => {
                     // add to the react hook errors list
                     setError( err.propName, {type: 'manual', message : err.message} )
                })

                return false;
            }

            // login ok use token

            var token = resp.data.data.token;
            let userConfigCtx = {}

 
            

            // for ( var i = 0, len = localStorage.length; i < len; ++i ) {
            //     console.log( localStorage.getItem( localStorage.key( i ) ) );
            //     if(localStorage.key( i ).startsWith('be_') )localStorage.removeItem(localStorage.key( i ));
            // }

            userConfigCtx.loggedIn = true;
            userConfigCtx.userName = resp.data.data.user.nickName;
            userConfigCtx.email = resp.data.data.user.email;
            
            const user = jwtDecode(token)

            localStorage.setItem("be_user", JSON.stringify(userConfigCtx))
            localStorage.setItem('be_token', token)
            var expires = moment().add(appConfigCtx.tokenExpiryMinutes, 'minutes');
            localStorage.setItem('be_token_expires', expires);
            return window.location.href = '/account'

        })
    }

    return ( <>
        <div className='login'>
            <h3>Login</h3>

            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="row">
                    <div className="col c2">Email *</div>
                    <div className="col c10"><input {...register('email')}></input>
                    <br/>
                    {errors?.email && <div className='error'>{errors?.email?.message}</div>}
                    </div>
                </div>

                <div className="row">
                    <div className="col c2">Password *</div>
                    <div className="col c10"><input {...register('encPassword')}></input>                  <br/>
                    {errors?.encPassword && <div className='error'>{errors?.encPassword?.message}</div>}</div>
                </div>
                  
                <div className="row">
                    <div className="col c2">&nbsp;</div>
                    <div className="col c10"> <input className='btn btn-a btn-sm' type="submit" /></div>
                </div>               
            </form> 
        </div>

    </> );
}
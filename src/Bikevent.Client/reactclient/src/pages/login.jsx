import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import axios from "axios";
import { jwtDecode } from 'jwt-decode';
import { useLocalStorage } from '../hooks/useLocalStorage';

import { increment } from './../store/counterSlice'
import { setUserState } from './../store/userSlice'
import { useSelector, useDispatch } from 'react-redux'


export const Login = (args) => {
    const count = useSelector(state => state.counter.value)
    const appConfig = useSelector(state => state.appConfig)
    const user = useSelector(state => state.user)
    const dispatch = useDispatch()
    // dispatch(setUserState({email:"text@test"}))
    // 

    const { setLocalStorageItem, removeLocalStorageItemsByPrefix2 } = useLocalStorage()

    const {
        register,
        handleSubmit,
        setError,
        formState: { errors }
    } = useForm();

    const onSubmit = (formData) => {
        // serverside check values
        axios.post(`${appConfig.apiDomain}/api/v1/login`, formData)
            .then(resp => {
                if (!resp?.data?.success) {
                    resp?.data?.data?.errors?.forEach(err => {
                        // add to the react hook errors list
                        setError(err.propName, { type: 'manual', message: err.message })
                    })

                    return false;
                }

                // login ok use token
                var token = resp.data.data.token;

                let userConfigCtx = {}
                userConfigCtx.isLoggedIn = true;
                userConfigCtx.userName = resp.data.data.user.nickName;
                userConfigCtx.email = resp.data.data.user.email;

                //dispatch(setUserState(userConfigCtx))
                dispatch(setUserState(userConfigCtx))

                const decodedToken = jwtDecode(token)

                removeLocalStorageItemsByPrefix2()
                setLocalStorageItem('user', JSON.stringify(userConfigCtx), 5)
                setLocalStorageItem('token', token, 5)


                // not working...
                // return <redirect to='/account'></redirect>
                // for now...
                // return window.location.href = '/account'

            })
    }

    return (<>
        <div className='login'>

            {!user.isLoggedIn ?
                <>
                    <h3>Login</h3>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="row">
                            <div className="col c2">Email *</div>
                            <div className="col c10"><input {...register('email')}></input>
                                <br />
                                {errors?.email && <div className='error'>{errors?.email?.message}</div>}
                            </div>
                        </div>

                        <div className="row">
                            <div className="col c2">Password *</div>
                            <div className="col c10"><input {...register('encPassword')}></input>                  <br />
                                {errors?.encPassword && <div className='error'>{errors?.encPassword?.message}</div>}</div>
                        </div>

                        <div className="row">
                            <div className="col c2">&nbsp;</div>
                            <div className="col c10"> <input className='btn btn-a btn-sm' type="submit" /></div>
                        </div>
                    </form>
                </>
                :
                <>
                    <h3>You are now logged in</h3>
                    <p>Welcome {user?.email} select a memu item to continue</p>
                </>}


        </div>

    </>);
}
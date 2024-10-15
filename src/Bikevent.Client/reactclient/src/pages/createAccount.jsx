import React from 'react';
import { useForm } from 'react-hook-form';
import axios from "axios";
import { jwtDecode } from 'jwt-decode';
import { setUserState } from './../store/userSlice'
import { useSelector, useDispatch } from 'react-redux'
import { removeLocalStorageItemsByPrefix, setLocalStorageItem } from '../lib/localStorageClient';
import { NavLink } from 'react-router-dom';


export const CreateAccount = (args) => {
    const appConfig = useSelector(state => state.appConfig)
    const dispatch = useDispatch()

    const {
        register,
        handleSubmit,
        setError,
        formState: { errors }
    } = useForm();

    const onSubmit = (formData) => {

        // serverside check values
        axios.post(`${appConfig.apiDomain}/api/v1/account`, formData)
            .then(resp => {
                if (!resp?.data?.success) {
                    resp?.data?.data?.errors?.forEach(err => {
                        // add to the react hook errors list
                        setError(err.propName, { type: 'manual', message: err.message })
                    })

                    return false;
                }

                var auth = {
                    email: resp.data.data.user.email,
                    isLoggedIn: true,
                    nickName: resp.data.data.user.nickName,
                    token: resp.data.data.token
                }

                dispatch(setUserState(auth))
                removeLocalStorageItemsByPrefix()
                setLocalStorageItem('auth', JSON.stringify(auth, appConfig.tokenExpiry))
            })
    }

    return (<>
        <div className='login'>
            <h3>Login</h3>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="row">
                    <div className="col c2"></div>
                    <div className="col c2"><div className='msg'>No account? Create one <NavLink to="/account/create">here</NavLink></div></div>
                </div>

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
        </div>

    </>);
}
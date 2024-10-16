import React from 'react';
import { useForm } from 'react-hook-form';
import { setUserState } from './../store/userSlice'
import { useSelector, useDispatch } from 'react-redux'
import { removeLocalStorageItemsByPrefix, setLocalStorageItem } from '../lib/localStorageClient';
import { NavLink, useNavigate } from 'react-router-dom';
import axiosConfig from '../lib/apiClientConfig';
import { FormA } from '../partials/wrappers/form';
import { InputA } from '../partials/wrappers/input';
import { MsgA, MsgHighlight } from '../partials/wrappers/msg';


export const Login = (args) => {
    const appConfig = useSelector(state => state.appConfig)
    const user = useSelector(state => state.user)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const {
        register,
        handleSubmit,
        setError,
        formState: { errors }
    } = useForm();

    const onSubmit = (formData) => {

        // serverside check values
        axiosConfig.post("/api/v1/login", formData)
            .then(resp => {
                if (!resp?.data?.success) {
                    resp?.data?.data?.errors?.forEach(err => {
                        // add to the react hook errors list
                        setError(err.propName, { type: 'manual', message: err.message })
                    })

                    return false;
                }

                // successful login

                var auth = {
                    email: resp.data.data.user.email,
                    isLoggedIn: true,
                    nickName: resp.data.data.user.nickName,
                    token: resp.data.data.token
                }

                // save in user state
                dispatch(setUserState(auth))

                // clear exisiting 
                removeLocalStorageItemsByPrefix()

                // save in local storage
                setLocalStorageItem('auth', JSON.stringify(auth, appConfig.tokenExpiry))

                // navigate to the account page
                navigate('/account')

            })
    }

    return (<>
        <div className='login'>

            {!user.isLoggedIn ?
                <>
                    <h3>Login</h3>
                    <FormA onSubmit={handleSubmit(onSubmit)}>
                        <InputA label='Email *' fieldName='email' errors={errors} register={register}></InputA>
                        <InputA label='Password *' fieldName='encPassword' errors={errors} register={register}></InputA>
                    </FormA>

                    <MsgHighlight>No account? <NavLink to='/account/create'>Create</NavLink> an account.</MsgHighlight>
                </>
                :
                <>
                    <h3>You are now logged in</h3>
                    <p>Welcome {user?.email} select a memu item to continue</p>
                </>}


        </div>

    </>);
}


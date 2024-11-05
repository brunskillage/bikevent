import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { setUserState } from './../store/userSlice'
import { useSelector, useDispatch } from 'react-redux'
import { removeLocalStorageItemsByPrefix, setLocalStorageItem } from '../lib/localStorageClient';
import axiosConfig from '../lib/axiosConfig';
import { InputA } from '../partials/wrappers/input';
import { MsgA } from '../partials/wrappers/msg';
import { PageTitle } from '../partials/wrappers/pageTitle';
import { LinkButton } from '../partials/wrappers/linkButton';
import { InputB } from '../partials/wrappers/inputB';
import { PageContainer } from '../partials/wrappers/pageContainer'
import { FormB } from '../partials/wrappers/formB';
import { FormA } from '../partials/wrappers/form';

export const Login = (args) => {
    const appConfig = useSelector(state => state.appConfig)
    const user = useSelector(state => state.user)
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
                    token: resp.data.data.token,
                    userId: resp.data.data.user.userId
                }

                // save in user state
                dispatch(setUserState(auth))
                // clear exisiting 
                removeLocalStorageItemsByPrefix()
                // save in local storage
                setLocalStorageItem('auth', JSON.stringify(auth, appConfig.tokenExpiry))

                //document.location.href = "/";
            })
    }

    return (<>
        <div className='loginPage'>
            {
                !user.isLoggedIn ?
                    <>
                        <PageTitle title="Login" hideSubmenu={true}></PageTitle>
                        <PageContainer>
                            <FormA onSubmit={handleSubmit(onSubmit)}>
                                <InputB label='Email *' fieldName='email' errors={errors} register={register}></InputB>
                                <div className="row">
                                    <div className="col c3 label">Password *</div>
                                    <div className="col c4"><input {...register("encPassword")}></input></div>
                                    <div className="col c3"><div className='error'>{errors["encPassword"]?.message}</div></div>
                                </div>
                            </FormA>
                            <p>No account?&nbsp;<LinkButton path="/account/create" text="Create"></LinkButton>an account.</p>
                        </PageContainer>
                    </>
                    :
                    <>
                        <PageTitle title="Signed in Successfully" hideSubmenu={false}>
                            <LinkButton text="Clubs" path={"/clubs"}></LinkButton>
                        </PageTitle>
                        <p>Welcome {user?.email} select a memu item to continue</p>
                    </>
            }
        </div>

    </>);
}


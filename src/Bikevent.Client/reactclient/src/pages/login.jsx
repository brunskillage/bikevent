import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
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
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Col, Row } from 'react-bootstrap';

export const Login = (args) => {
    const appConfig = useSelector(state => state.appConfig)
    const user = useSelector(state => state.user)
    const dispatch = useDispatch()

    const {
        control,
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
                // return to the home page
                setTimeout(() => document.location.href = "/", 1000);
            })
    }

    return (<>
        {
            !user.isLoggedIn ?
                <>


                    <Row className="justify-content-md-center">

                        <Col xs lg="4">

                            <PageTitle title="Login" />

                            <Form onSubmit={handleSubmit(onSubmit)}>
                                <Controller
                                    name='email'
                                    control={control}
                                    render={({ field }) =>
                                        <Form.Group className="mb-3" controlId="formEmail">
                                            <Form.Label>Email *</Form.Label>
                                            <Form.Control
                                                isInvalid={!!errors.email}
                                                {...register("email")} errors={errors} placeholder="email" />

                                            {errors["email"] && <Form.Control.Feedback type="invalid">
                                                {errors["email"].message}
                                            </Form.Control.Feedback>}
                                        </Form.Group>}
                                ></Controller>

                                <Controller
                                    name='encPassword'
                                    control={control}
                                    render={({ field }) =>
                                        <Form.Group className="mb-3" controlId="formBasicPassword">
                                            <Form.Label>Password * </Form.Label>
                                            <Form.Control
                                                type="encPassword"
                                                placeholder="Password"
                                                isInvalid={!!errors["encPassword"]}
                                                {...register("encPassword")} />
                                            {errors["encPassword"] && <Form.Control.Feedback type="invalid">
                                                Password is invalid
                                            </Form.Control.Feedback>}
                                        </Form.Group>}
                                ></Controller>

                                <Button type="submit">Submit form</Button>

                            </Form>
                        </Col>

                    </Row>
                    <Row>
                        &nbsp;
                    </Row>
                    <Row className="justify-content-md-center">
                        <Col xs lg="4">
                            <p>No account?&nbsp;<LinkButton path="/account/create" text="Create"></LinkButton> an account.</p>
                        </Col>
                    </Row>
                </>
                :
                <>
                    <PageTitle title="Signed in Successfully" />
                </>
        }
    </>);
}


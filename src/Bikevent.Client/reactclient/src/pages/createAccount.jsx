import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import axiosConfig from '../lib/axiosConfig';
import { InputB } from '../partials/wrappers/inputB';
import { FormA } from '../partials/wrappers/form';
import { MsgA, MsgSuccessA } from '../partials/wrappers/msg';


export const CreateAccount = (args) => {
    const [isCreated, setIsCreated] = useState(false)

    const {
        register,
        handleSubmit,
        setError,
        formState: { errors }
    } = useForm();

    const onSubmit = (formData) => {

        // serverside check values
        axiosConfig.post("/api/v1/account", formData)
            .then(resp => {
                if (!resp?.data?.success) {
                    resp?.data?.data?.errors?.forEach(err => {
                        // add to the react hook errors list
                        setError(err.propName, { type: 'manual', message: err.message })
                    })

                    return false;
                }

                setIsCreated(true)

                return true;
            })
    }

    return (<>
        <div className='createAccount'>
            <h3>Create Account</h3>
            {!isCreated ?
                <FormA onSubmit={handleSubmit(onSubmit)}>
                    <InputB label='Email *' fieldName='email' errors={errors} register={register}></InputB>
                    <InputB label='Password *' fieldName='encPassword' errors={errors} register={register}></InputB>
                    <InputB label='Nick Name *' fieldName='nickName' errors={errors} register={register}></InputB>
                </FormA>
                :
                <MsgA variant={"success"}>Account has been successfully created. Please confirm on your email. Unconfirmed accounts will be removed after 7 days.</MsgA>
            }

        </div >

    </>);
}
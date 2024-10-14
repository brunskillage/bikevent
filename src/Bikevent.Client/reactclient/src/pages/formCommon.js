import axios from "axios"

export const  submitForm =(url, formData, setError) => {
        // serverside check values
        axios.post(url, formData)
        .then(resp => {
            console.log(resp.data)
            if(resp?.data?.data){
                resp?.data?.data?.errors.forEach(err => {
                     // add to the react hook errors list
                     setError( err.propName, {type: 'manual', message : err.message} )
                })
            }
        })
}
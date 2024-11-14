import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

export const FormA = ({ onSubmit, children }) => {

    const handleSubmit = (onSubmit) => { }

    return <>
        <Form onSubmit={onSubmit}>
            {children}
            <Button variant="primary" type="submit">
                Submit
            </Button>
        </Form>

        <form onSubmit={onSubmit}>
            <div className="row">

                {children}

                <div className="col c3">&nbsp;</div>
                <div className="col c8"> <input className='btn btn-a btn-sm' type="submit" /></div>

            </div>
        </form>
    </>

}
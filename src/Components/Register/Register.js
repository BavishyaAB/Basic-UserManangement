import {Form,Row,Col,Button} from 'react-bootstrap';
import {useState} from 'react';
import { postUser } from '../../Services/UserService';
function Register(){
    const [userInput,setUserInput] = useState({
        first_name:'',
        last_name:'',
        company_name:'',
        city:'',
        state:'',
        zip:'',
        email:'',
        web:'',
        age:''
    })
    const handleChange = (e) => {
        setUserInput(prevUserInput => {
            return {
                ...prevUserInput,
                [e.target.name]:e.target.value
            }
        })
    }
    const handleClear = () => {
        setUserInput({
            first_name:'',
            last_name:'',
            company_name:'',
            city:'',
            state:'',
            zip:'',
            email:'',
            web:'',
            age:''
        });
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        postUser(userInput)
        .then(setUserInput({
            first_name:'',
            last_name:'',
            company_name:'',
            city:'',
            state:'',
            zip:'',
            email:'',
            web:'',
            age:''
        }))
    }
    console.log(userInput);
    return(
        <div>
            <div className='card m-5'>
            <p className='my-3'>Sign Up</p>
            <Form className='mx-3 mt-2 mb-3'>
                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm="2" className='text-start'>
                        First Name
                    </Form.Label>
                    <Col sm="10">
                        <Form.Control type="text" name='first_name' placeholder="First Name" value={userInput.first_name} onChange={handleChange}/>
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm="2" className='text-start'>
                        Last Name
                    </Form.Label>
                    <Col sm="10">
                        <Form.Control type="text" name='last_name' placeholder="Last Name" value={userInput.last_name} onChange={handleChange}/>
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm="2"  className='text-start'>
                        Company Name
                    </Form.Label>
                    <Col sm="10">
                        <Form.Control type="text" name='company_name' placeholder="Company Name" value={userInput.company_name} onChange={handleChange}/>
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm="2"  className='text-start'>
                        City
                    </Form.Label>
                    <Col sm="10">
                        <Form.Control type="text" name='city' placeholder="City" value={userInput.city} onChange={handleChange}/>
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm="2"  className='text-start'>
                        State
                    </Form.Label>
                    <Col sm="10">
                        <Form.Control type="text" name='state' placeholder="State" value={userInput.state} onChange={handleChange}/>
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm="2"  className='text-start'>
                        Zip
                    </Form.Label>
                    <Col sm="10">
                        <Form.Control type="text" name='zip' placeholder="Zipcode" value={userInput.zip} onChange={handleChange}/>
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm="2"  className='text-start'>
                        Email
                    </Form.Label>
                    <Col sm="10">
                        <Form.Control type="email" name='email' placeholder="name@example.com" value={userInput.email} onChange={handleChange}/>
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm="2" className='text-start'>
                        Web
                    </Form.Label>
                    <Col sm="10">
                        <Form.Control type="text" name='web' placeholder="Website" value={userInput.web} onChange={handleChange}/>
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm="2"  className='text-start'>
                        Age
                    </Form.Label>
                    <Col sm="10">
                        <Form.Control type="text" name='age' placeholder="Age" value={userInput.age} onChange={handleChange}/>
                    </Col>
                </Form.Group>
                <Button variant="dark" className='float-start m-0 px-4 mb-2' onClick={handleClear}>Clear</Button>
                <Button variant="dark" className='float-end px-3 mb-2' onClick={handleSubmit}>Sign Up</Button>
            </Form>
            </div>
        </div>
    )
}

export default Register;
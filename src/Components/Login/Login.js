import {Form,Row,Col,Button, Alert} from 'react-bootstrap';
import {useState,useEffect} from 'react';
import {getUsers} from '../../Services/UserService';
import { useNavigate} from 'react-router-dom';
function Login(){
    const [userLogin,setUserLogin] = useState({
        username:'',
        password:''
    });
    const [userinfo,setUserInfo] = useState([]);
    const [showAlert,setShowAlert] = useState(false);
    const [alertMessage,setAlertMessage] = useState('');
    let navigate = useNavigate();
    useEffect(() => {
        console.log(userinfo);
        if(userinfo.length > 0){
            console.log("inside if")
            return;
        }
        getUsers()
        .then(item => {
            setUserInfo(item);
        })
    })
    const handleLoginChange = (e) => {
        setUserLogin(prevUserLogin => {
            return{
                ...prevUserLogin,
                [e.target.name]:e.target.value
            }
        })
    }
    const handleLogin = (e) => {
        e.preventDefault();
        console.log(userLogin);
        console.log(userinfo);
        let userProfile = userinfo.find(user => user.first_name === userLogin.username);
        console.log(userProfile);
        if(userLogin.username === '' && userLogin.password === ''){
            setAlertMessage("Please provide valid Login details");
            setShowAlert(true);
        }
        if(userLogin.username === userProfile.first_name && userLogin.password === userProfile.email){
            console.log("Inside Login");
            console.log(userProfile.id);
            navigate(`/users/${userProfile.id}`);
        }
        else{
            setAlertMessage("Invalid User Credentials");
            setShowAlert(true);
        }
    }
    return(
        <div className='m-auto w-50'>
            <div>
                {showAlert && <Alert variant='danger' className='m-5' onClose={() => setShowAlert(false)} dismissible>
                    <Alert.Heading>Login Error!</Alert.Heading>
                    <p>{alertMessage}</p>
                </Alert>
                }
            </div>
            <div className="card mt-4">
            <p className='my-3'>Sign In</p>
            <Form className='mx-3 mt-2 mb-3'>
                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm="3" className='text-start'>
                        Username
                    </Form.Label>
                    <Col sm="9">
                        <Form.Control type="text" name='username' placeholder="Username" value={userLogin.username} onChange={handleLoginChange}/>
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm="3" className='text-start'>
                        Password
                    </Form.Label>
                    <Col sm="9">
                        <Form.Control type="password" name='password' placeholder="Password" value={userLogin.password} onChange={handleLoginChange}/>
                    </Col>
                </Form.Group>
                <Button variant="dark" className='px-3 float-end' onClick={handleLogin}>Login</Button>
            </Form>
            </div>
        </div>
    )
}

export default Login;
import {useParams} from 'react-router-dom';
import {useEffect,useState} from 'react';
import {getUsers,putUser} from '../../Services/UserService';
import NavBar from "../Navbar/Navbar";
import {Button, Stack} from 'react-bootstrap';
function UserDetail(){
    let {userId} = useParams();
    const [userinfo,setUserInfo] = useState([]);
    const [userProfile,setUserProfile] = useState([]);
    const [updatedUserProfile,setUpdatedUser] = useState({})
    useEffect(() => {
        if(userinfo.length > 0){
            console.log("inside if")
            return;
        }
        getUsers()
        .then(item => {
            setUserInfo(item);
        })
    },[updatedUserProfile,userinfo])
    useEffect(() => {
        let userprofile = userinfo.find((user)=> user.id === parseInt(userId));
        setUserProfile(userprofile);
    },[userinfo,userId])
    const handleEdit = (e) => {
        console.log(e.target.parentElement.parentElement.parentElement.id);
        console.log(e.target.parentElement.id);
        console.log(e.target.value);
        let profileid = e.target.parentElement.parentElement.parentElement.id;
        let updateKey = e.target.parentElement.id;
        let updateValue = prompt(`Update ${updateKey}?`,'');
        console.log(updateValue);
        let updatedUser = userProfile;
        console.log(updateValue);
        if(updateValue !== ''){
            updatedUser[updateKey] = updateValue;
            setUpdatedUser(updatedUser);
        }
        console.log(updatedUser);
        putUser(updatedUser,profileid).then(()=>setUpdatedUser({}));
    }
    const showUserDetail = ()=>{
        let userDetail = userinfo.find((user)=> user.id === parseInt(userId));
        if(!userDetail){
            console.log("inside return")
            return;
        }
        return (
            <div className='m-2' id={userDetail.id}>
                <Stack gap={1} className="w-100">
                    <div id="first_name" className='m-1 p-3 card d-flex flex-row align-items-center justify-content-between'>
                            <div>First Name</div>
                            <div>{userDetail.first_name}</div>
                        <Button variant='dark' onClick={handleEdit}>Edit</Button>
                    </div>
                    <div id="last_name" className='m-1 p-3 card d-flex flex-row align-items-center justify-content-between'>
                        <div>Last Name</div>
                        <div>{userDetail.last_name}</div>
                        <Button variant='dark' onClick={handleEdit}>Edit</Button>
                    </div>
                    <div id="company_name" className="m-1 p-3 card d-flex flex-row align-items-center justify-content-between">
                        <div>CompanyName</div>
                        <div>{userDetail.company_name}</div>
                        <Button variant='dark' onClick={handleEdit}>Edit</Button>
                    </div>
                    <div id="city" className="m-1 p-3 card d-flex flex-row align-items-center justify-content-between">
                        <div>City</div>
                        <div>{userDetail.city}</div>
                        <Button variant='dark' onClick={handleEdit}>Edit</Button>
                    </div>
                    <div id="state" className="m-1 p-3 card d-flex flex-row align-items-center justify-content-between">
                        <div>State</div>
                        <div>{userDetail.state}</div>
                        <Button variant='dark' onClick={handleEdit}>Edit</Button>
                    </div>
                    <div id="zip" className="m-1 p-3 card d-flex flex-row align-items-center justify-content-between">
                        <div >ZipCode</div>
                        <div >{userDetail.zip}</div>
                        <Button variant='dark' onClick={handleEdit}>Edit</Button>
                    </div>
                    <div id="email" className="m-1 p-3 card d-flex flex-row align-items-center justify-content-between">
                        <div >Email Address</div>
                        <div >{userDetail.email}</div>
                        <Button variant='dark' onClick={handleEdit}>Edit</Button>
                    </div>
                    <div id="web" className="m-1 p-3 card d-flex flex-row align-items-center justify-content-between">
                        <div >Website</div>
                        <div >{userDetail.web}</div>
                        <Button variant='dark' onClick={handleEdit}>Edit</Button>
                    </div>
                    <div id="age" className="m-1 p-3 card d-flex flex-row align-items-center justify-content-between">
                        <div>Age</div>
                        <div>{userDetail.age}</div>
                        <Button variant='dark' onClick={handleEdit}>Edit</Button>
                    </div>   
                </Stack>
            </div>
        )
    }
    return (
        <div>
            <NavBar page="UserDetail"/>
                 <div className='m-5'>
                     {showUserDetail()}
                </div>
        </div>
    )
}

export default UserDetail;
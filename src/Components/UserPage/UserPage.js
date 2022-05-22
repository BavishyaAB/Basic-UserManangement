import {useNavigate} from 'react-router-dom';
function UserPage (props) {
    let navigate = useNavigate();
    const {id,first_name,last_name,company_name,city,state,zip,email,web,age} = props.data;
    return(
        <>
            <tr key={id}>
                <td>{id}</td>
                <td onClick={()=> navigate(`/users/${id}`)}>{first_name}</td>
                <td>{last_name}</td>
                <td>{company_name}</td>
                <td>{city}</td>
                <td>{state}</td>
                <td>{zip}</td>
                <td>{email}</td>
                <td><a href={web} target="_blank" rel="noopener noreferrer">{web}</a></td>
                <td>{age}</td>
            </tr> 
        </>
    )
}

export default UserPage;
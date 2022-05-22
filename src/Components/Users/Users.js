import NavBar from "../Navbar/Navbar";
import {useState,useEffect} from 'react';
import {getUsers} from '../../Services/UserService';
import { Button, Pagination, Table,Form} from "react-bootstrap";
import UserPage from '../UserPage/UserPage'
function Users(){
    const [users,setUsers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [search,setSearch] = useState('');
    const [showSearch,setShowSearch] = useState(search===''?false:true);
    const [searchResult,setSearchResult] = useState({});
    const [isAscending,setSortAscending] = useState(false);
    const [paginatedUsers,setPaginatedUsers] = useState([]);
    useEffect(()=>{
        if(users.length){
            return;
        }
        getUsers().then(item => {
            setUsers(item);
        })
    })
    const changePage = (e) => {
        console.log(e.target.textContent);
        setCurrentPage(Number(e.target.textContent));
        setShowSearch(false);
    }
    let active = 1;
    let items = [];
    for (let number = 1; number <= users.length/10; number++) {
    items.push(
        <Pagination.Item key={number} active={number === active} onClick={changePage}>
        {number}
        </Pagination.Item>,
    );
    }
    const handleSearch = (e) => {
        setSearch(e.target.value);
    }
    const goToPrevPage = () => {
        console.log(currentPage);
        if(currentPage === 1){
            return;
        }
        else{
            setCurrentPage(page => --page);
            setShowSearch(false);
        }
        console.log(currentPage);
    }
    const goToNextPage = () => {
        console.log(Math.round(users.length/10));
        if(currentPage === Math.round(users.length/10)){
            return;
        }
        else{
            setCurrentPage(page => ++page);
            setShowSearch(false);
        }
        console.log(currentPage);
    }
    useEffect(() => {
        const start = currentPage*10 - 10;
        const end = start+10;
        const slicedUsers = users;
        setPaginatedUsers(slicedUsers.slice(start,end));
    },[currentPage,users])
    const getSearchResult = (e) => {
        e.preventDefault();
        if(search !== ''){
            let searchedUser = users.filter(user => user.first_name === search);
            setSearchResult(searchedUser);
            setShowSearch(true);
        }
        console.log(searchResult);
    }
    const handleSort = (e) => {
        let key = e.target.id;
        console.log(key);
        if(isAscending){
            paginatedUsers.sort((a,b) => a[key] > b[key]?1:-1)
            setSortAscending(false);
        }
        else{
            paginatedUsers.sort((a,b) => a[key] > b[key]?-1:1)
            setSortAscending(true);
        }
    }
    const displayUser = () => {
        if(showSearch){
            console.log("inside search");
            console.log(searchResult);
            return (
                searchResult.map(result => <UserPage data={result}/>)
            )
        }
        return paginatedUsers.map((user) => (
                <UserPage data={user}/>));
    }
    console.log(search);
    return (
        <div>
            <NavBar page="Users"/>
                <div className="card mx-3 my-0">
                    <div className="mb-2">
                        <h2 className="ms-3 mt-3 float-start">User Details</h2>
                        <Form className='m-3 float-end'>
                        <Form.Group className="d-flex justify-content-between">
                                <Form.Control type="text" name='search' placeholder="Search" value={search} onChange={handleSearch}/>
                                <Button className="ms-2" variant="dark" onClick={getSearchResult}>Search</Button>
                        </Form.Group>
                        </Form>
                    </div>
                    <Table striped responsive="xl" size="sm" variant="light" bordered className="mb-0">
                        <thead>
                            <tr>
                                <th id="id" onClick={handleSort}>Id<i className="bi bi-sort-up"></i></th>
                                <th id="first_name" onClick={handleSort}>First Name</th>
                                <th id="last_name" onClick={handleSort}>Last Name</th>
                                <th id="company_name" onClick={handleSort}>Company Name</th>
                                <th id="city" onClick={handleSort}>City</th>
                                <th id="state" onClick={handleSort}>State</th>
                                <th id="zip" onClick={handleSort}>ZipCode</th>
                                <th id="email" onClick={handleSort}>Email</th>
                                <th id="web" onClick={handleSort}>Web</th>
                                <th id="age" onClick={handleSort}>Age</th>
                            </tr>
                        </thead> 
                        <tbody>           
                            {displayUser()}
                        </tbody>
                    </Table>
                </div>
                <Pagination size="sm" className="me-3 mb-3 float-end">
                        <Pagination.Prev onClick={goToPrevPage}/>
                        {items}
                        <Pagination.Next onClick={goToNextPage}/>
                </Pagination>
            </div>
    )
}

export default Users;
export function getUsers () {
    return fetch('http://localhost:3001/users')
    .then(data => data.json());
}

export function postUser (user) {
    return fetch ('http://localhost:3001/users',{
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify(user)
    }).then(data=>data.json());
}

export function putUser(userDetail,id) {
    console.log(userDetail);
    console.log(id);
    return fetch('http://localhost:3001/users/'+id,{
        method:'PUT',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify(userDetail)
    }).then(data => data.json());
}
'use strict';

// Get 'people you might know'
let users = [];

const URL = "https://randomuser.me/api/?nat=CA&results=10&seed=name";

const options = {
    method: 'GET',
    headers: {
        'Content-Type': 'application/JSON; charset=UTF-8'
    },
    mode: 'cors' 
}

async function getUsers(endpoint) {
    try {
        const result = await fetch(endpoint, options);
        if (!result.ok) {
            throw new error(`${result.status}: ${result.statusText}`);
        }

        const data = await result.json();
        
        data.results.forEach(user => createUser(user));

    } catch(error) {
        console.log(error.message);
    }
}

function createUser(obj) {
    const user = {
        fullName: `${obj.name.first} ${obj.name.last}`,
        city: obj.location.city,
        pic: obj.picture.medium
    }
    users.push(user);
}

getUsers(URL);
'use strict';

// Get 'people you might know'
let users = [];

const recommended = document.querySelector('.recommended-list');
const seeAllBtn = document.querySelector('.see-all');

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
        createProfile(users);

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

function createProfile(users) {
    users.forEach((user, index) => {
        const profile = document.createElement('li');
        if(index >= 4) {
            profile.classList.add('hide');
        }
        profile.classList.add('flex', 'align', 'center')
        profile.innerHTML = 
        `<div class="pic-container">
            <img class="pic" src=${user.pic}>
        </div>
        <div class="info">
            <p class="name">${user.fullName}</p>
            <p class="city">${user.city}</p>
        </div>
        <div class="add flex align center">
            <i class="fa-solid fa-plus"></i>
        </div>`;
        recommended.append(profile);
    });
}

seeAllBtn.addEventListener('click', () => {
    const hidden = document.querySelectorAll('.hide');
    hidden.forEach(obj => {
        obj.classList.remove('hide');
    });
    seeAllBtn.classList.add('hide');
});

getUsers(URL);
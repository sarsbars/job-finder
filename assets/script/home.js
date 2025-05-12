'use strict';

// Get 'people you might know'
let users = [];

const getImage = document.querySelector('.get-image');
const contentTextarea = document.querySelector('textarea');
const postButton = document.querySelector('.show-image');
const mainFeed = document.querySelector('.main-feed');

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

/* Main Feed */

function getDate() {
    const dateDisplay = { month: 'long', day: 'numeric', year: 'numeric' };
    return new Date().toLocaleDateString('en-US', dateDisplay);
}

let postImageSrc = null; 

function postImage() { 
    if (getImage.files.length > 0) {
        const image = getImage.files[0];
        const reader = new FileReader();

        reader.readAsDataURL(image);

        reader.onload = function() {
            postImageSrc = reader.result;
        }
    } else {
        postImageSrc = null;
    }
}

function newPost(textContent, imageSrc) {
    const date = getDate();
    const postSection = document.createElement('section');
    postSection.classList.add('post');
    postSection.innerHTML = `
        <div class="post-header">
            <div class="post-author-info">
                <div class="post-author-pic"></div> 
                <div class="post-author-name">Luigi Mario</div>
            </div>
            <div class="post-date">${date}</div>
        </div>
        <div class="content">${textContent}</div>
        ${imageSrc !== null ? `<div class="display-image"><img src="${imageSrc}"></div>` : ''}
        <div class="interactive flex">
            <div class="flex align">
                <i class="fa-regular fa-heart"></i>
                <p>0</p>
            </div>
            <div class="flex align">
                <i class="fa-regular fa-comment"></i>
                <p>0</p>
            </div>
            <div class="flex align">
                <i class="fa-solid fa-arrow-up-right-from-square"></i>
                <p>Share</p>
            </div>
        </div>
    `;

    mainFeed.insertBefore(postSection, mainFeed.querySelector('.post'));
}

getImage.addEventListener('change', function() {
    postImage(); 
});

postButton.addEventListener('click', () => { 
    const textContent = contentTextarea.value;

    if (textContent.trim() !== "" || getImage.files.length > 0) {
        newPost(textContent, postImageSrc);
        contentTextarea.value = '';
        getImage.value = '';
        displayImagePreview.innerHTML = '';
        postImageSrc = null; 
        console.log('Post cannot be empty.');
        form.reset();
    }
});

seeAllBtn.addEventListener('click', () => {
    const hidden = document.querySelectorAll('.hide');
    hidden.forEach(obj => {
        obj.classList.remove('hide');
    });
    seeAllBtn.classList.add('hide');
});

getUsers(URL);
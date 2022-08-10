
const getPostData = () => {
    const title = document.getElementById('title').value
    const nickname = document.getElementById('nickname').value
    const body = document.getElementById('body').value
    return {title, nickname, body}
}

const updatePostRequest = (data) => {
    const postId = parseInt(window.location.hash.substring(1))
    const url = 'http://localhost:3000/posts/' + postId
    fetch(url, {
        method: 'PUT',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        redirect: 'follow',
        body: JSON.stringify(data)
    })
    .then(response => {
        return response.json()
    })
    .then(data => {
        editPageContent(data.body)
    })
}

const updatePost = (e) => {
    const data = getPostData();
    updatePostRequest(data)
}
const editPageContent = (data) => {
    if(!data.id) {
        alert("404, not defined")
    }
    const title = document.getElementById('title')
    title.value = data.title
    const nickname = document.getElementById('nickname')
    nickname.value = data.nickname
    const body = document.getElementById('body')
    body.value = data.body
    const editButton = document.getElementById('button');
    editButton.textContent = 'edit';
    // editButton.addEventListener('click', updatePost)
}

const requestPostById = (id) => {
    const url = 'http://localhost:3000/posts/' + id;
    fetch(url)
    .then(response => {return response.json()})
    .then(data => editPageContent(data))
}

const publishOnClick = async (e)  => {
    const data = getPostData();
    const url = 'http://localhost:3000/posts'
    fetch(url, {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        redirect: 'follow',
        body: JSON.stringify(data)
    })
    .then(response => {
        return response.json()
    })
    .then(data => {
        window.location.hash = data.body
    })
}
window.addEventListener('hashchange', () => {
    let hash = window.location.hash.substring(1);
    requestPostById(hash)
});

const button = document.getElementById('button');
button.addEventListener('click', (e) => {
    e.preventDefault();
    if(e.target.textContent == 'PUBLISH') {
        publishOnClick(e)
    } else {
        updatePost(e)
    }
});
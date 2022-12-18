const BASE_URL = `https://crudcrud.com/api/${API_KEY}`

const createNewPostForm = document.getElementById('create-new-post-form')
const addPostTitleInput = document.getElementById('add-post-title')
const addPostImgInput = document.getElementById('add-post-img')
const addPostContentTextarea = document.getElementById('add-post-content')
const blogContainerDiv = document.getElementById('blog-container')

let blogPosts

const getBlogPosts = async () => {
    const response = await fetch(`${BASE_URL}/blog`)

    const data = await response.json()

    blogPosts = data

    data.forEach(blogPost => {
        blogContainerDiv.innerHTML += createBlogPostDiv(blogPost)
    })
}

const handleCreatePost = async (event) => {
    event.preventDefault()

    const body = {
        title: addPostTitleInput.value,
        imageUrl: addPostImgInput.value,
        content: addPostContentTextarea.value,
    }

    const response = await fetch(`${BASE_URL}/blog`, {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
    })

    const data = await response.json()

    blogContainerDiv.innerHTML += createBlogPostDiv(data)
}

const handleDeletePost = async (postId) => {
     await fetch(`${BASE_URL}/blog/${postId}`, {
        method: 'DELETE',
    })

    blogPosts = 
        blogPosts.filter(blogPost => {
            if(blogPost._id !== postId) {
                return blogPost
            }
        })  

    blogContainerDiv.innerHTML = ''

    blogPosts.forEach(blogPost => {
        blogContainerDiv.innerHTML += createBlogPostDiv(blogPost)
    })
}

const handleUpdateBlogPost = async (blogPostId) => {
    const body = {
        title: 'Updated title again',
        content: 'Updated content again',
        imageUrl: 'https://images.pexels.com/photos/1031460/pexels-photo-1031460.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load',
    }


    const blogPost = await fetch(`${BASE_URL}/blog/${blogPostId}`, {
        method: 'PUT',
        body: JSON.stringify(body),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })

}

handleUpdateBlogPost('639f23aa430fc103e8909c86')


const createBlogPostDiv = (blogPost) => {
    return `
    <div class="blog-post">
        <h3 class="blog-post-heading">
            ${blogPost.title}
        </h3>
        <p class="blog-post-body">
            ${blogPost.content}
        </p>

        <img class="blog-post-img" src='${blogPost.imageUrl}'>
        <button onclick="handleDeletePost('${blogPost._id}')" class="button delete">Delete</button>
    </div>`
}

getBlogPosts()

createNewPostForm.addEventListener('submit', (event)  => handleCreatePost(event))
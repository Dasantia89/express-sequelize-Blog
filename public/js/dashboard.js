// get DOM references
const newBtn = document.querySelector('#newPost');
const postDiv = document.querySelector('#postContainer');
var delBtns = document.querySelectorAll('.delBtn');
var updBtns = document.querySelectorAll('.updBtn');

//attach event listener to new post button
newBtn.addEventListener("click", newPost);
// on click set the innerhtml to a form for new post then set an event listener for form submit
function newPost() {
  postDiv.innerHTML = `<div class="newpost-card">
    <h2 class="page-title">New Post</h2>
    <form class="form newPost-form">
      <div class="form-group">
        <label for="postTitle">Title:</label>
        <input class="form-input" type="text" id="postTitle" />
      </div>
      <div class="form-group">
        <label for="postContent">Content:</label>
        <textarea class="content"  id="postContent" />
        </textarea>
      </div>
      <div class="form-group">
        <button class="btn btn-primary" type="submit">Submit</button>
      </div>
    </form>
  </div>`;

  document
    .querySelector('.newPost-form')
    .addEventListener('submit', postFormHandler);
}

// handle form submit and run fetch to create new post
const postFormHandler = async (event) => {
  event.preventDefault();

  const title = document.querySelector('#postTitle').value.trim();
  const content = document.querySelector('#postContent').value.trim();
  const id = postDiv.dataset.id;
  const time = Date.now();

  if (title && content) {
    const response = await fetch('/dashboard', {
      method: 'POST',
      body: JSON.stringify({ title, content, time, id }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert('Failed to create post.');
    }
  }
};

// attach event listener for delete buttons
delBtns.forEach(btn=> btn.addEventListener("click", delPost))

// on delete button click send delete fetch request to delete the selected post
async function delPost (event) {
  event.stopPropagation();
  const id = event.target.dataset.postid;

  const response = await fetch('/dashboard', {
      method: 'DELETE',
      body: JSON.stringify({ id }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert('Failed to delete post.');
    }
}

// add listener to update button
updBtns.forEach(btn=> btn.addEventListener("click", updPost))

// set innerhtml to a form to update a post and attach an event listener
function updPost (event) {
var title = event.target.parentNode.parentNode.childNodes[1].textContent;
var content = event.target.parentNode.parentNode.childNodes[5].textContent;
var postId= (event.target.dataset.postid);

postDiv.innerHTML = `<div class="newpost-card">
    <h2 class="page-title">Update Post</h2>
    <form class="form updPost-form">
      <div class="form-group">
        <label for="postTitle">Title:</label>
        <input class="form-input" type="text" id="postTitle" value="${title}"/>
      </div>
      <div class="form-group">
        <label for="postContent">Content:</label>
        <textarea class="content"  id="postContent"/>${content}
        </textarea>
      </div>
      <div class="form-group">
        <button class="btn btn-primary" type="submit">Submit</button>
      </div>
    </form>
    <input type="hidden" id="postId" name="postId" value="${postId}" />
  </div>`;

  document
    .querySelector('.updPost-form')
    .addEventListener('submit', putFormHandler);
}

// handle form submit and do put fetch query
async function putFormHandler (event) {
event.preventDefault();
console.log(event.target);
  const title = document.querySelector('#postTitle').value.trim();
  const content = document.querySelector('#postContent').value.trim();
  const postId = document.querySelector('#postId').value;
  const response = await fetch('/dashboard', {
    method: 'PUT',
    body: JSON.stringify({ postId, title, content }),
    headers: { 'Content-Type': 'application/json' },
  });

  if (response.ok) {
    document.location.replace('/dashboard');
  } else {
    alert('Failed to update post.');
  }
}
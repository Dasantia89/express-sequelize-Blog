const newBtn = document.querySelector('#newPost');
const postDiv = document.querySelector('#postContainer');

newBtn.addEventListener("click", newPost);

function newPost (){
    postDiv.innerHTML = `<div class="newpost-card">
    <h2 class="page-title">New Post</h2>
    <form class="form newPost-form">
      <div class="form-group">
        <label for="postTitle">Title:</label>
        <input class="form-input" type="text" id="postTitle" />
      </div>
      <div class="form-group">
        <label for="postContent">Content:</label>
        <input class="content"  id="postContent" />
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

const postFormHandler = async (event) => {
    event.preventDefault();
  
    const title = document.querySelector('#postTitle').value.trim();
    const content = document.querySelector('#postContent').value.trim();
    const id = postDiv.dataset.id;
    const time = Date.now();

    console.log('title: '+ title + ' content: '+ content + ' id: '+id+' time: '+time);
    if (title && content) {
      const response = await fetch('/dashboard', {
        method: 'POST',
        body: JSON.stringify({ title, content,time ,id }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        document.location.replace('/dashboard');
      } else {
        alert('Failed to create post.');
      }
    }
  };
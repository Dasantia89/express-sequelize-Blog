var blogPosts = document.querySelectorAll('.viewPost');
var commentBtns = document.querySelectorAll('.comment');
blogPosts.forEach(post => post.addEventListener("click", viewPost))
commentBtns.forEach(btn => btn.addEventListener("click", makeComment))

var commentForms = document.querySelectorAll('.comment-form');
commentForms.forEach(form => form.addEventListener('submit', commentFormHandler))

async function viewPost(event) {
    event.stopPropagation();

    var content = event.target.previousSibling.previousSibling;
    if (content.style.display === "none") {
        content.style.display = "block";
        event.target.textContent = "Hide post"
    } else {
        content.style.display = "none";
        event.target.textContent = "View post"
    }
}

async function makeComment(event) {
    event.stopPropagation();
    var commentForm = event.target.nextSibling.nextSibling;
    if (commentForm.style.display === "none") {
        commentForm.style.display = "block";
        event.target.textContent = "Cancel"
    } else {
        commentForm.style.display = "none";
        event.target.textContent = "Comment"
    }
}

async function commentFormHandler(event) {
    event.preventDefault();
    var content = event.target.childNodes[1].childNodes[3].value;
    var postId = event.target.dataset.postid;
    var userId = event.target.parentNode.parentNode.parentNode.dataset.userid;
    const time = Date.now();
    if (content) {
        const response = await fetch('/', {
            method: 'POST',
            body: JSON.stringify({ content, time, userId, postId }),
            headers: { 'Content-Type': 'application/json' },
        });
        if (response.ok) {
            document.location.replace('/');
        } else {
            alert('Failed to add comment.');
        }
    }
}
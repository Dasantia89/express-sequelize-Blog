var blogPosts = document.querySelectorAll('.viewPost');
var commentBtns = document.querySelectorAll('.comment');
blogPosts.forEach(post=> post.addEventListener("click", viewPost))
commentBtns.forEach(btn => btn.addEventListener("click", makeComment))

// var commentForms = document.querySelectorAll('comment-form');
// commentForms.forEach(form=>)

async function viewPost (event) {
    event.stopPropagation();
    console.log(event.target);
    
    var content = event.target.previousSibling.previousSibling;
    if(content.style.display === "none"){
        content.style.display = "block";
        event.target.textContent = "Hide post"
    }else {
        content.style.display = "none";
        event.target.textContent = "View post"

    }
}

async function makeComment (event) {
    event.stopPropagation();
    console.log(event.target)

}
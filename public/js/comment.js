// similar to login/signup.js, grabs values for post id and body, fetch req /api/comment

const commentFormHandler = async (event) => {
    event.preventDefault();
    const postId = document.querySelector("input[name='postId']").value;
    const postBody = document.querySelector("textarea[name='comment-body']").value;
    if (body) {
        await fetch ("/api/comment", {
            method: "POST",
            body: JSON.stringify({
                postId, postBody
            }),
            headers: {
                "Content-Type": "application/json"
            }
        })
        document.location.reload();
    }
}

document.querySelector("#new-comment-form").addEventListener("submit", commentFormHandler);
// DONE

// similar to login/signup.js, grabs values for title and body, fetch req /api/post

// this is from comment, adj accordingly:

const newPostHandler = async (event) => {
    event.preventDefault();
    const title = document.querySelector("input[name='post-title']").value;
    const body = document.querySelector("textarea[name='post-body']").value;
    if (title && body) {
        await fetch ("/api/post", {
            method: "POST",
            body: JSON.stringify({
                title, body
            }),
            headers: {
                "Content-Type": "application/json"
            }
        })
        document.location.replace('/dashboard');
    }
}

document.querySelector("#new-post-form").addEventListener("submit", newPostHandler);
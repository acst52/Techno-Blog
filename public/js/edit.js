// add click event listener to all "Edit" buttons:

const editButtons = document.querySelectorAll('[data-bs-target="#editPostModal"]');
editButtons.forEach(button => {
  button.addEventListener('click', async (event) => {
    const postId = event.target.getAttribute('data-post-id');
    const response = await fetch(`/api/posts/${postId}`);
    if (response.ok) {
      const post = await response.json();
      document.querySelector('#editPostTitle').value = post.title;
      document.querySelector('#editPostBody').value = post.body;
      document.querySelector('#editPostForm').setAttribute('data-post-id', post.id);
    }
  });
});

// Add a submit event listener to the "Edit Post" form
const editPostForm = document.querySelector('#editPostForm');
editPostForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  const title = document.querySelector('#editPostTitle').value;
  const body = document.querySelector('#editPostBody').value;
  const postId = editPostForm.getAttribute('data-post-id');
  const response = await fetch(`/api/posts/${postId}`, {
    method: 'PUT',
    body: JSON.stringify({ title, body }),
    headers: {
      'Content-Type': 'application/json'
    }
  });
  if (response.ok) {
    location.reload();
  } else {
    alert('Failed to edit post');
  }
});


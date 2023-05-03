// add click event listener to edit btn
const editButton = document.querySelector('#edit-btn');
editButton.addEventListener('click', async (event) => {
	const postId = event.target.getAttribute('data-post-id');
	const response = await fetch(`/api/posts/${postId}`);
	if (response.ok) {
		const { id, title, content } = await response.json();
		document.querySelector('input[name="post-title"]').value = title;
		document.querySelector('textarea[name="post-body"]').value = content;
		document.querySelector('#edit-post-form').setAttribute('data-post-id', id);
	}
});

// Add a submit event listener to edit post form
const editPostForm = document.querySelector('#edit-post-form');
editPostForm.addEventListener('submit', async (event) => {
	event.preventDefault();
	const title = document.querySelector('#edit-post-title').value;
	const body = document.querySelector('#edit-post-content').value;
	const postId = editPostForm.getAttribute('#post-id');
	const response = await fetch(`/api/posts/${postId}`, {
		method: 'PUT',
		body: JSON.stringify({ title, body }),
		headers: {
			'Content-Type': 'application/json',
		},
	});
	if (response.ok) {
		location.reload();
	} else {
		alert('Failed to edit post');
	}
});

// add click event listener for delete btn
const deleteButton = document.querySelector('#delete-btn');
deleteButton.addEventListener('click', async (event) => {
	event.preventDefault();
	const postId = document.querySelector('#post-id').value;
	const response = await fetch(`/api/posts/${postId}`, {
		method: 'DELETE',
		headers: {
			'Content-Type': 'application/json',
		},
	});
	if (response.ok) {
		// Redirect to the homepage if deleted successfully
		location.assign('/');
	} else {
		alert('Failed to delete post');
	}
});

// Current dev console errs:
// edit.js:5
//  GET https://serene-river-60751.herokuapp.com/api/posts/null 404 (Not Found)
// (anonymous)	@	edit.js:5
// edit.js:21
//  PUT https://serene-river-60751.herokuapp.com/api/posts/null 404 (Not Found)
// (anonymous)	@	edit.js:21

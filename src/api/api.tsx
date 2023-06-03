type userForm = {
  username: string;
  content: string;
};

const url = 'https://blog-backend-production-8b95.up.railway.app/';

async function error(res: Response) {
  const errorData = await res.json();
  const errorMessage = errorData.error || 'An error occurred';
  throw new Error(errorMessage);
}

async function createComment(formdata: userForm, id: string) {
  const response = await fetch(`${url}comments/${id}/create`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username: formdata.username, content: formdata.content, _id: id }),
  });

  if (!response.ok) {
    await error(response);
  }
}

async function deleteBlog(id: string, token: string) {
  if (!id || !token) return;
  const response = await fetch(`${url}${id}/deleteblog`, {
    method: 'Delete',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) {
    await error(response);
  }
}

async function updateBlog(id: string, token: string, formData: { title: string; content: string }) {
  const response = await fetch(`${url}${id}/updateBlog`, {
    method: 'Put',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(formData),
  });
  if (!response.ok) {
    await error(response);
  }
}

async function deleteComment(id: string, token: string): Promise<void> {
  await fetch(`${url}comments/${id}/delete`, {
    method: 'Delete',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
}

async function signIn(formData: { username: string; password: string }) {
  if (formData.username.length < 3 || formData.password.length < 3) {
    throw new Error('Username and password must be at least 3 characters long.');
  }
  const response = await fetch(url + 'login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify(formData),
  });
  if (response.ok) {
    const res = await response.json();
    localStorage.setItem('user', JSON.stringify(res));
  }
  if (!response.ok) {
    await error(response);
  }
}

async function createAdmin(formData: { username: string; password: string }) {
  if (formData.username.length < 3 || formData.password.length < 3) {
    throw new Error('Username and password must be at least 3 characters long.');
  }
  const response = await fetch('https://blog-backend-production-8b95.up.railway.app/createAdmin', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData),
  });
  if (!response.ok) {
    await error(response);
  }
}
async function createBlog(formData: { title: string; content: string }, token: string) {
  if (!token) {
    throw new Error('Need to be logged in.');
  }
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(formData),
  });
  if (!response.ok) {
    await error(response);
  }
}

export { createComment, deleteBlog, updateBlog, deleteComment, signIn, createAdmin, createBlog };

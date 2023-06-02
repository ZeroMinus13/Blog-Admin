type formdata = {
  username: string;
  content: string;
};
const url = 'https://blog-backend-production-8b95.up.railway.app/';
async function createComment(formdata: formdata, id: string) {
  await fetch(`${url}comments/${id}/create`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username: formdata.username, content: formdata.content, _id: id }),
  });
}

export { createComment };

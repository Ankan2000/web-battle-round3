const api = "http://localhost:8000/api";

export const signup = (user) => {
  return fetch(`${api}/signup`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  })
    .then((response) => response.json())
    .catch((err) => console.error(err));
};

export const signin = (user) => {
  return fetch(`${api}/signin`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  })
    .then((response) => response.json())
    .catch((err) => console.error(err));
};

export const authenticate = (data, next) => {
  if (typeof window === undefined) return;

  localStorage.setItem("jwt", JSON.stringify(data.data));
  next();
};

export const signout = (next) => {
  if (typeof window === undefined) return;

  localStorage.removeItem("jwt");
  next();

  return fetch(`${api}/signout`, {
    method: "GET",
  })
    .then((response) => console.log("signout successful"))
    .catch((err) => console.error(err));
};

export const isAuthenticated = () => {
  if (typeof window === undefined) return false;

  const jwt = localStorage.getItem("jwt");
  if (jwt) return JSON.parse(jwt);

  return false;
};

export const createBlog = (userId, token, blog) => {
  return fetch(`${api}/create/blog/${userId}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: blog,
  })
    .then((response) => response.json())
    .catch((err) => console.error(err));
};

export const getAllBlogs = () => {
  return fetch(`${api}/blog/all/blogs`)
    .then((response) => response.json())
    .then((data) => data.data)
    .catch((err) => console.error(err));
};

export const getAllPrivateBlogs = (userId, token) => {
  return fetch(`${api}/blog/all/private/${userId}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => response.json())
    .then((data) => data.data)
    .catch((err) => console.error(err));
};

export const getBlog = (id) => {
  return fetch(`${api}/blog/${id}`)
    .then((response) => response.json())
    .then((data) => data.data)
    .catch((err) => console.error(err));
};

export const getAllComments = (blogId) => {
  return fetch(`${api}/comment/all/${blogId}`)
    .then((response) => response.json())
    .then((data) => data.data)
    .catch((err) => console.error(err));
};

export const createComment = (userId, blogId, token, comment) => {
  return fetch(`${api}/create/comment/${userId}/${blogId}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ content: comment }),
  })
    .then((response) => response.json())
    .catch((err) => console.error(err));
};

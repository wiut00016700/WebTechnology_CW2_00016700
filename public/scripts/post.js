window.onload = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const postAuthor = user.email;
  const postTitle = document.querySelector(".post-title");
  const postBody = document.querySelector(".post-body");
  const form = document.querySelector(".form-edit");
  const baseURL = "http://localhost:4000/api/";

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const data = {
      postTitle: postTitle.value,
      postBody: postBody.value,
      postAuthor,
    };
    await axios
      .post(`${baseURL}posts`, data)
      .then((res) => {
        console.log(res.data);
        form.reset();
        window.location.href = "/";
        return res.data;
      })
      .catch((err) => console.error(err));
  });
};

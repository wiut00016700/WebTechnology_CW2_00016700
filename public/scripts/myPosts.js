window.onload = () => {
  const baseURL = "http://localhost:4000/api/posts";
  const editBtns = document.querySelectorAll(".btn-edit");
  const cancelBtns = document.querySelectorAll(".btn-cancel");
  const deleteBtns = document.querySelectorAll(".btn-delete");
  const editForms = document.querySelectorAll(".edit");
  const readMoreBtns = document.querySelectorAll(".btn-read-more");
  const postTitles = document.querySelectorAll(".title-input");
  const postBodies = document.querySelectorAll(".body-input");
  for (let i = 0; i < deleteBtns.length; i++) {
    const hrefValue = readMoreBtns[i].getAttribute("href");
    const postId = parseInt(hrefValue.split("/").pop());
    deleteBtns[i].addEventListener("click", async () => {
      await axios
        .delete(`${baseURL}/${postId}`)
        .then((res) => {
          window.location.reload();
          return res.data;
        })
        .catch((err) => console.error(err));
    });
    editBtns[i].addEventListener("click", () => {
      editForms[i].classList.replace("d-none", "d-flex");
    });
    cancelBtns[i].addEventListener("click", () => {
      editForms[i].classList.replace("d-flex", "d-none");
    });
    editForms[i].addEventListener("submit", async (e) => {
      e.preventDefault();
      const data = {
        postTitle: postTitles[i].value,
        postBody: postBodies[i].value,
      };
      await axios
        .patch(`${baseURL}/${postId}`, data)
        .then((res) => {
          console.log(res.data);
          window.location.reload();
          return res.data;
        })
        .catch((err) => console.error(err));
    });
  }
};

window.onload = () => {
  const form = document.querySelector(".form-auth");
  const email = document.querySelector(".email");
  const password = document.querySelector(".password");
  const baseURL = "http://localhost:4000/";
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const data = {
      email: email.value,
      password: password.value,
    };

    await axios
      .post(`${baseURL}api/auth/sign-up`, data)
      .then((res) => {
        console.log(res.data.newUser);
        const user = JSON.stringify(res.data.newUser);
        localStorage.setItem("user", user);
        form.reset();
        window.location.href = "/";
        return res.data;
      })
      .catch((err) => {
        alert(err);
      });
  });
};

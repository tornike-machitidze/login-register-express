const loginForm = document.getElementById("register-form");
const emailInput = document.getElementById("email-input");
const passwordInput = document.getElementById("password-input");

loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = emailInput.value;
  const password = passwordInput.value;

  try {
    const response = await fetch("http://localhost:3000/users/login", {
      method: "POST",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });
    if (response.status === 200) {
      emailInput.value = "";
      passwordInput.value = "";

      const user = await response.json();

      window.localStorage.setItem("token", user.token);
      window.location.href = "http://localhost:3000/profile.html";
    }
  } catch (error) {
    console.log(error);
  }
});

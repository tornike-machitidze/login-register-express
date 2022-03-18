const registerForm = document.getElementById("register-form");
const nameInput = document.getElementById("name-input");
const emailInput = document.getElementById("email-input");
const passwordInput = document.getElementById("password-input");

registerForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = nameInput.value;
  const email = emailInput.value;
  const password = passwordInput.value;

  try {
    const response = await fetch("http://localhost:3000/users", {
      method: "POST",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify({
        name,
        email,
        password,
      }),
    });
    if (response.status === 201) {
      const createdUser = await response.json();
      console.log(createdUser);
      window.localStorage.setItem("token", createdUser.token);
      window.location.href = "http://localhost:3000/profile.html";
    }

    nameInput.value = "";
    emailInput.value = "";
    passwordInput.value = "";
  } catch (error) {
    console.log("Cant create user");
  }
});

const aContect = document.getElementById("logout");

window.addEventListener("load", async () => {
  const token = window.localStorage.getItem("token");
  try {
    const response = await fetch("http://localhost:3000/users/me", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const { user = "" } = await response.json();

    if (user) {
      aContect.addEventListener("click", async () => {
        try {
          const response = await fetch("http://localhost:3000/users/logout", {
            method: "POST",
            headers: {
              "Content-type": "application/json; charset=UTF-8",
              Authorization: `Bearer ${token}`,
            },
          });

          const answer = await response.json();
          if (answer.status === 200) {
            console.log("loged out");
          }
        } catch (error) {
          console.log("not loged out");
        }
      });
    } else {
      aContect.setAttribute("href", "/login.html");
      aContect.textContent = "Login";
      div.innerHTML = ` <h2>You are not Loged In</h2> `;
    }
  } catch (error) {
    console.log(error);
  }
});

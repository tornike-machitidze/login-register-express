const div = document.getElementById("profile-container");
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
      div.innerHTML = `
        <h3>${user.name}</h3>
        <p>${user.email}</p>
        `;
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

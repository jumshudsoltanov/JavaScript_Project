// Put input data

const fullname = document.getElementById("fullname");
const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const sendBtn = document.getElementById("sendBtn");

sendBtn.addEventListener("click", async (e) => {
  e.preventDefault();

  // Form Value
  fullnameValue = fullname.value;
  usernameValue = username.value;
  emailValue = email.value;
  passwordValue = password.value;


    if (fullnameValue === "" && usernameValue === "" && emailValue === "" && passwordValue === "") {
      alert(" Bütün Məlumatları daxil edin!");
    }
    else {

        const response = await fetch("http://localhost:3000/users", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                fullname: fullnameValue,
                username: usernameValue,
                email: emailValue,
                password: passwordValue,
            }),
        })
    }





});

// Put input data
const fullname = document.getElementById("fullname");
const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const sendBtn = document.getElementById("sendBtn");

sendBtn.addEventListener("click", async (e) => {
  e.preventDefault();

  // Form Value
  const fullnameValue = fullname.value;
  const usernameValue = username.value;
  const emailValue = email.value;
  const passwordValue = password.value;


  const dbData = await fetch("http://localhost:3000/users");
  const users = await dbData.json();


  if (
    fullnameValue === "" ||
    usernameValue === "" ||
    emailValue === "" ||
    passwordValue === ""
  ) {
    alert("Bütün Məlumatları daxil edin!");
  } else if (users.some(user => user.username === usernameValue || user.email === emailValue)) {
    alert("Bu istifadəçi adı və ya e-poçt artıq mövcuddur!");

  }
  else {
    try {
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
      });

      if (response.ok) {
        const data = await response.json();
        console.log("İstifadəçi uğurla əlavə olundu:", data);
        alert("Qeydiyyat uğurla tamamlandı!");
      } else {
        alert("Xəta baş verdi: " + response.statusText);
      }
    } catch (error) {
      console.log("Xəta: ", error);
      alert("Xəta baş verdi: " + error.message);
    }
  }
});

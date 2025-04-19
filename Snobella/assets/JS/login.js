const email = document.getElementById("email");
const password = document.getElementById("password");
const sendBtn = document.getElementById("sendBtn");

sendBtn.addEventListener("click", async (e) => {
  e.preventDefault();
  const emailValue = email.value;
  const passwordValue = password.value;

  const dbData = await fetch("http://localhost:3000/users");
  const users = await dbData.json();

  const user = users.find(
    (user) => user.email === emailValue && user.password === passwordValue
  );
  if (user) {
    alert("Giris Uğurlu!");
    window.location.href = "home.html";
  } else {
    alert("Parol veya email yanlis!");
  }
});

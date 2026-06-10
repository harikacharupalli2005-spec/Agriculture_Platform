const API_URL = "http://localhost:5000/api";

async function loginUser() {
  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;
  const error = document.getElementById("loginError");

  if (!email || !password) {
    error.innerText = "Please fill all fields";
    return;
  }

  try {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      error.innerText = data.message;
      return;
    }

    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));

    window.location.href = "categories.html";
  } catch (err) {
    error.innerText = "Server error. Please try again.";
  }
}
async function signupUser() {

    const name =
    document.getElementById("name").value;

    const email =
    document.getElementById("email").value;

    const phone =
    document.getElementById("phone").value;

    const village =
    document.getElementById("village").value;

    const district =
    document.getElementById("district").value;

    const password =
    document.getElementById("password").value;

    const confirmPassword =
    document.getElementById("confirmPassword").value;

    const error =
    document.getElementById("signupError");

    if(
        !name ||
        !email ||
        !phone ||
        !village ||
        !district ||
        !password ||
        !confirmPassword
    ){
        error.innerText =
        "Please fill all fields";
        return;
    }

    if(password !== confirmPassword){
        error.innerText =
        "Passwords do not match";
        return;
    }

    try{

        const response = await fetch(
            "http://localhost:5000/api/auth/signup",
            {
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify({
                    name,
                    email,
                    phone,
                    village,
                    district,
                    password
                })
            }
        );

        const data =
        await response.json();

        if(!response.ok){
            error.innerText =
            data.message;
            return;
        }

       
        window.location.href =
        "login.html";

    }
    catch(err){

        error.innerText =
        "Server Error";

    }
}
async function forgotPassword() {
  const email = document.getElementById("forgotEmail").value;
  const error = document.getElementById("forgotError");
  const success = document.getElementById("forgotSuccess");

  error.innerText = "";
  success.innerText = "";

  if (!email) {
    error.innerText = "Please enter email";
    return;
  }

  try {
    const response = await fetch(`${API_URL}/auth/forgot-password`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });

    const data = await response.json();

    if (!response.ok) {
      error.innerText = data.message;
      return;
    }

    success.innerText = "Password reset link sent to your email";
  } catch (err) {
    error.innerText = "Server error. Please try again.";
  }
}
async function resetPassword() {

  const params =
  new URLSearchParams(
    window.location.search
  );

  const token =
  params.get("token");

  const newPassword =
  document.getElementById(
    "newPassword"
  ).value;

  const confirmPassword =
  document.getElementById(
    "confirmPassword"
  ).value;

  const error =
  document.getElementById(
    "resetError"
  );

  const success =
  document.getElementById(
    "resetSuccess"
  );

  error.innerText = "";
  success.innerText = "";

  if(
    !newPassword ||
    !confirmPassword
  ){
    error.innerText =
    "Please fill all fields";
    return;
  }

  if(
    newPassword !==
    confirmPassword
  ){
    error.innerText =
    "Passwords do not match";
    return;
  }

  try{

    const response =
    await fetch(
      `${API_URL}/auth/reset-password/${token}`,
      {
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify({
          password:newPassword
        })
      }
    );

    const data =
    await response.json();

    if(!response.ok){
      error.innerText =
      data.message;
      return;
    }

    success.innerText =
    "Password Reset Successful";

    setTimeout(()=>{
      window.location.href =
      "login.html";
    },2000);

  }
  catch(error){

    document.getElementById(
      "resetError"
    ).innerText =
    "Server Error";

  }
}
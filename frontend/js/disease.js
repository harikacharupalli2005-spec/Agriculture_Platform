console.log("disease.js loaded");

const API_URL = "https://agriculture-platform.onrender.com/api";

function previewImage() {
  const fileInput = document.getElementById("plantImage");
  const preview = document.getElementById("imagePreview");

  if (fileInput.files && fileInput.files[0]) {
    preview.src = URL.createObjectURL(fileInput.files[0]);
    preview.style.display = "block";
  }
}

async function analyzeDisease(event) {
  if (event) event.preventDefault();

  const fileInput = document.getElementById("plantImage");
  const error = document.getElementById("diseaseError");

  error.innerText = "";

  if (!fileInput.files || !fileInput.files[0]) {
    error.innerText = "Please upload an image";
    return;
  }

  try {
    const formData = new FormData();
    formData.append("image", fileInput.files[0]);

    console.log("Calling upload API:", `${API_URL}/disease/upload`);

    const uploadResponse = await fetch(`${API_URL}/disease/upload`, {
      method: "POST",
      body: formData,
    });

    const uploadText = await uploadResponse.text();
    console.log("Upload status:", uploadResponse.status);
    console.log("Upload raw response:", uploadText);

    let uploadData;
    try {
      uploadData = JSON.parse(uploadText);
    } catch {
      error.innerText = "Upload API returned invalid response";
      return;
    }

    if (!uploadResponse.ok) {
      error.innerText = uploadData.message || "Image upload failed";
      return;
    }

    const userData =
      localStorage.getItem("user") ||
      localStorage.getItem("userData") ||
      localStorage.getItem("loggedInUser") ||
      localStorage.getItem("currentUser") ||
      localStorage.getItem("authUser") ||
      localStorage.getItem("farmer") ||
      localStorage.getItem("userInfo");

    if (!userData) {
      error.innerText = "Please login again";
      return;
    }

    const user = JSON.parse(userData);
    const userId = user.id || user._id || user.userId;

    if (!userId) {
      error.innerText = "User ID not found. Please login again.";
      return;
    }

    console.log("Calling AI API:", `${API_URL}/ai/predict`);

    const aiResponse = await fetch(`${API_URL}/ai/predict`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: userId,
        image: uploadData.path || uploadData.image,
      }),
    });

    const aiText = await aiResponse.text();
    console.log("AI status:", aiResponse.status);
    console.log("AI raw response:", aiText);

    let aiData;
    try {
      aiData = JSON.parse(aiText);
    } catch {
      error.innerText = "AI API returned invalid response";
      return;
    }

    if (!aiResponse.ok) {
      error.innerText =
        aiData.error?.message ||
        aiData.error?.error ||
        aiData.error ||
        aiData.message ||
        "Prediction failed";
      return;
    }

    const prediction = aiData.prediction;

    if (!prediction) {
      error.innerText = "Prediction not found";
      return;
    }

    sessionStorage.setItem(
      "diseaseResult",
      JSON.stringify({
        disease: prediction.disease,
        confidence: prediction.confidence,
        solution: prediction.solution,
      })
    );

window.location.href = "diseaseResult.html";
  } catch (err) {
    console.log("Disease frontend error:", err);
    error.innerText = err.message || "Server error. Please try again.";
  }
}z
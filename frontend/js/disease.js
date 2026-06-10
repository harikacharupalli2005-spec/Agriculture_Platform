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

    const uploadResponse = await fetch(`${API_URL}/disease/upload`, {
      method: "POST",
      body: formData,
    });

    const uploadData = await uploadResponse.json();

    if (!uploadResponse.ok) {
      error.innerText = uploadData.message || "Image upload failed";
      return;
    }

    const userData =
      localStorage.getItem("user") ||
      localStorage.getItem("userData") ||
      localStorage.getItem("loggedInUser");

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

    const aiResponse = await fetch(`${API_URL}/ai/predict`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: userId,
        image: uploadData.path,
      }),
    });

    const aiData = await aiResponse.json();

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
}
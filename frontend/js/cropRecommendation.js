const CROP_API =
  "http://localhost:5000/api/crop-recommendation/recommend";

async function getCropRecommendation() {
  const state = document.getElementById("state").value.trim();
  const district = document.getElementById("district").value.trim();
  const season = document.getElementById("season").value;
  const soilType = document.getElementById("soilType").value;

  const error = document.getElementById("cropError");
  const result = document.getElementById("cropResult");

  error.innerText = "";
  result.innerHTML = "";

  if (!state || !district || !season || !soilType) {
    error.innerText = "Please fill all fields";
    return;
  }

  try {
    result.innerHTML = "<h3>Loading recommendations...</h3>";

    const response = await fetch(CROP_API, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        state,
        district,
        season,
        soilType,
      }),
    });

    const data = await response.json();

    result.innerHTML = "";

    if (!data.success) {
      error.innerText =
        data.message || "Failed to get recommendation";
      return;
    }

    const cropsHTML = data.recommendedCrops
      .map(
        (crop) => `
          <div class="recommended-crop">
            🌱 ${crop}
          </div>
        `
      )
      .join("");

    const tipsHTML = data.tips
      .map(
        (tip) => `
          <li>${tip}</li>
        `
      )
      .join("");

    result.innerHTML = `
      <div class="crop-result-card" id="cropReport">

        <h2>🌾 Recommended Crops</h2>

        <p><strong>State:</strong> ${data.state}</p>
        <p><strong>District:</strong> ${data.district}</p>
        <p><strong>Season:</strong> ${data.season}</p>
        <p><strong>Soil Type:</strong> ${data.soilType}</p>

        <p><strong>Expected Yield:</strong> ${data.expectedYield}</p>
        <p><strong>Market Demand:</strong> ${data.marketDemand}</p>

        <h3>🌱 Suitable Crops</h3>

        <div class="crop-list">
          ${cropsHTML}
        </div>

        <h3>💡 Farmer Tips</h3>

        <ul>
          ${tipsHTML}
        </ul>

        <button
          class="download-btn"
          onclick="downloadCropPDF()">
          📄 Download Recommendation PDF
        </button>

      </div>
    `;
  } catch (err) {
    console.log(err);
    error.innerText = "Server error. Please try again.";
    result.innerHTML = "";
  }
}

function downloadCropPDF() {
  window.print();
}
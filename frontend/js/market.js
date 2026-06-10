const MARKET_API =
  "https://agriculture-platform.onrender.com/api/real-market/prices";

async function searchPrices() {
  const state = document.getElementById("state").value.trim();
  const district = document.getElementById("district").value.trim();
  const crop = document.getElementById("crop").value.trim();

  const error = document.getElementById("marketError");
  const results = document.getElementById("marketResults");

  error.innerText = "";
  results.innerHTML = "";

  if (!state || !district) {
    error.innerText = "Please enter state and district";
    return;
  }

  try {
    results.innerHTML = "<p>Loading market prices...</p>";

    const url =
      `${MARKET_API}?state=${encodeURIComponent(state)}&district=${encodeURIComponent(district)}&crop=${encodeURIComponent(crop)}`;

    console.log("Market API URL:", url);

    const response = await fetch(url);
    const text = await response.text();

    console.log("Market status:", response.status);
    console.log("Market raw response:", text);

    let data;
    try {
      data = JSON.parse(text);
    } catch {
      error.innerText = "Market API returned invalid response";
      results.innerHTML = "";
      return;
    }

    results.innerHTML = "";

    if (!response.ok) {
      error.innerText = data.message || data.error || "Market API error";
      return;
    }

    const prices = data.data || data.prices || [];

    if (!data.success || prices.length === 0) {
      results.innerHTML =
        "<p>No market prices found. Try another crop or district.</p>";
      return;
    }

    prices.forEach((item) => {
      const card = document.createElement("div");
      card.className = "market-card";

      card.innerHTML = `
        <h2>${item.crop || item.commodity || "Crop"}</h2>
        <p><strong>State:</strong> ${item.state || "-"}</p>
        <p><strong>District:</strong> ${item.district || "-"}</p>
        <p><strong>Market:</strong> ${item.market || "-"}</p>
        <p><strong>Variety:</strong> ${item.variety || "-"}</p>
        <p><strong>Min Price:</strong> ₹${item.minPrice || item.min_price || "-"}</p>
        <p><strong>Modal Price:</strong> ₹${item.modalPrice || item.modal_price || "-"}</p>
        <p><strong>Max Price:</strong> ₹${item.maxPrice || item.max_price || "-"}</p>
        <p><strong>Last Updated:</strong> ${item.date || item.arrival_date || "-"}</p>
        <button class="share-btn" onclick="sharePrice('${item.crop || item.commodity || "Crop"}', '${item.market || "-"}', '${item.modalPrice || item.modal_price || "-"}', '${item.date || item.arrival_date || "-"}')">
          Share on WhatsApp
        </button>
      `;

      results.appendChild(card);
    });
  } catch (err) {
    console.log("Market frontend error:", err);
    error.innerText = err.message || "Failed to fetch market prices";
    results.innerHTML = "";
  }
}

function sharePrice(crop, market, price, date) {
  const message =
    `${crop} price in ${market} market is ₹${price}. Date: ${date}`;

  window.open(
    `https://wa.me/?text=${encodeURIComponent(message)}`,
    "_blank"
  );
}
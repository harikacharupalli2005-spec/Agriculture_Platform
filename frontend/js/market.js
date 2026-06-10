const MARKET_API =
  "http://localhost:5000/api/real-market/prices";

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

    const response = await fetch(url);
    const data = await response.json();

    results.innerHTML = "";

    if (!data.success || !data.data || data.data.length === 0) {
      results.innerHTML =
        "<p>No market prices found. Try another crop or district.</p>";
      return;
    }

    data.data.forEach((item) => {
      const card = document.createElement("div");
      card.className = "market-card";

      card.innerHTML = `
        <h2>${item.crop || "Crop"}</h2>

        <p><strong>State:</strong> ${item.state || "-"}</p>
        <p><strong>District:</strong> ${item.district || "-"}</p>
        <p><strong>Market:</strong> ${item.market || "-"}</p>
        <p><strong>Variety:</strong> ${item.variety || "-"}</p>

        <p><strong>Min Price:</strong> ₹${item.minPrice || "-"}</p>
        <p><strong>Modal Price:</strong> ₹${item.modalPrice || "-"}</p>
        <p><strong>Max Price:</strong> ₹${item.maxPrice || "-"}</p>

        <p><strong>Last Updated:</strong> ${item.date || "-"}</p>

        <button class="share-btn" onclick="sharePrice('${item.crop}', '${item.market}', '${item.modalPrice}', '${item.date}')">
          Share on WhatsApp
        </button>
      `;

      results.appendChild(card);
    });

  } catch (err) {
    console.log(err);
    error.innerText = "Failed to fetch market prices";
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
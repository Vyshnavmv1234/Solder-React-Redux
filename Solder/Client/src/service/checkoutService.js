const API_URL = "http://localhost:5000";

const checkout = async (productIds, token) => {
  const response = await fetch(`${API_URL}/checkout`, {
    method: "POST",

    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },

    body: JSON.stringify({
      productIds,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Checkout failed");
  }

  return data;
};

export default {
  checkout,
};
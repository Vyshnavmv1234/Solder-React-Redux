const API_URL = "http://localhost:5000";

const createProduct = async (productData, token) => {
  const isFormData = productData instanceof FormData;
  const headers = {
    Authorization: `Bearer ${token}`,
  };

  if (!isFormData) {
    headers["Content-Type"] = "application/json";
  }

  const response = await fetch(`${API_URL}/addProduct`, {
    method: "POST",
    headers,
    body: isFormData ? productData : JSON.stringify(productData),
  });
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to create product");
  }

  return data;
};

const getMyProducts = async (token) => {
  const response = await fetch(`${API_URL}/myProducts`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to fetch your products");
  }

  return data.data;
};

const getProducts = async (filters = {}) => {
  const queryParams = new URLSearchParams();

  if (filters.category) {
    queryParams.append("category", filters.category);
  }

  if (filters.minPrice) {
    queryParams.append("minPrice", filters.minPrice);
  }

  if (filters.maxPrice) {
    queryParams.append("maxPrice", filters.maxPrice);
  }

  const queryString = queryParams.toString();

  const url = queryString
    ? `${API_URL}/products?${queryString}`
    : `${API_URL}/products`;

  console.log("Fetching URL:", url);

  const response = await fetch(url);

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to fetch products");
  }

  return data.data;
};

export default { createProduct, getProducts, getMyProducts };

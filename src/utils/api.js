const BASE_URL = "https://assignment.stage.crafto.app";

export const login = async (username, otp) => {
  const response = await fetch(`${BASE_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, otp }),
  });
  const data = await response.json();
  if (data.token) {
    localStorage.setItem("token", data.token);
  }
  return data;
};

export const getToken = () => {
  return localStorage.getItem("token");
};

export const logout = () => {
  localStorage.removeItem("token");
};

export const uploadMedia = async (file) => {
  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch(
    "https://crafto.app/crafto/v1.0/media/assignment/upload",
    {
      method: "POST",
      body: formData,
    }
  );

  return await response.json();
};

export const createQuote = async (text, mediaUrl) => {
  const token = getToken(); // Get the token from localStorage
  const response = await fetch(
    "https://assignment.stage.crafto.app/postQuote",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token, // Pass token in the Authorization header
      },
      body: JSON.stringify({ text, mediaUrl }), // Only pass text and mediaUrl in the body
    }
  );

  if (!response.ok) {
    throw new Error(`Error: ${response.statusText}`);
  }

  return await response.json();
};

export const getQuotes = async (limit, offset) => {
  const token = getToken();
  const response = await fetch(
    `${BASE_URL}/getQuotes?limit=${limit}&offset=${offset}`,
    {
      headers: { Authorization: token },
    }
  );

  return await response.json();
};

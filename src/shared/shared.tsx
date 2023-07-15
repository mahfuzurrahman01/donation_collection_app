import axios from "axios";

export const getAllDonation = async () => {
  const token = localStorage.getItem("token");
  const headers = {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };
  const response = await axios.get("http://localhost:5000/all-donation", {
    headers,
  });
  if (response?.data?.ok) {
    return response.data.data;
  }
};

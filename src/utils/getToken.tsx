import axios from "axios";

export const getToken = async (email: string) => {
  try {
    const response: any = await axios.post("http://localhost:5000/jwt", {
      email: email,
    });
    localStorage.setItem("token", response.data.token);
    localStorage.setItem("isLoggedIn", "true");
  } catch (error) {
    console.log(error);
  }
};

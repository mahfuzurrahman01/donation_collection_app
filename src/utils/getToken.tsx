import axios from "axios";
import Cookies from "js-cookie";

export const getToken = async (email: string) => {
  console.log(email)
  try {
    const response: any = await axios.post("http://localhost:5000/jwt", {
      email: email,
    });
    localStorage.setItem("token", response.data.token);
    Cookies.set("isLoggedIn", "true");
  } catch (error) {
    console.log(error);
  }
};

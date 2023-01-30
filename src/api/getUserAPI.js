import axios from "axios";

export default async function getUserAPI(uid) {
  let config = {
    method: "get",
    url: `${process.env.REACT_APP_BASE_API_URL}/api/user/${uid} `,
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
  };

  try {
    const response = await axios(config);
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

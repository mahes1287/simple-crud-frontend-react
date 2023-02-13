import axios from "axios";

export default async function addUserDetailsAPI(
  uid,
  email,
  firstname,
  lastname,
  displayName
) {
  let config = {
    method: "POST",
    url: `${process.env.REACT_APP_BASE_API_URL}/api/user/create/`,
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
    data: JSON.stringify({
      uid: uid,
      email: email,
      first_name: firstname,
      last_name: lastname,
      displayName: displayName,
      username: email,
    }),
  };
  try {
    const response = await axios(config);
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

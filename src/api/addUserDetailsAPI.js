import axios from "axios";

export async function addUserDetailsAPI(uid, email, firstname, lastname) {
  let config = {
    method: "post",
    url: `${process.env.REACT_APP_BASE_API_URL}/api/translations/create`,
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
    data: JSON.stringify({
      uid: uid,
      email: email,
      firstname: firstname,
      lastname: lastname,
      dispalyName: localStorage.getItem("dispalyName"),
    }),
  };
  try {
    const response = await axios(config);
    
    return response.data

  } catch (error) {
    console.log(error);
  }
}

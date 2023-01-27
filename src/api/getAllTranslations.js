const axios = require("axios");

export default async function getAllTranslations(token) {
  let config = {
    method: "get",
    url: "http://127.0.0.1:8000/api/translations",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const response = await axios(config);
    console.log(JSON.stringify(response.data));
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

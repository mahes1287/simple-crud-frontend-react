const axios = require("axios");

axios(config)
  .then((response) => {
    console.log(JSON.stringify(response.data));
  })
  .catch((error) => {
    console.log(error);
  });

export default async function addNew(token) {
  let config = {
    method: "post",
    url: "http://127.0.0.1:8000/api/translations/create",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const response = await axios(config);
    console.log(JSON.stringify(response.data));
    return response;
  } catch (error) {
    console.log(error);
  }
}

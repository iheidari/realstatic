const axios = require("axios");

const propAddress = "2201-3100%20windsor";

const baseUrl = "https://www.bcassessment.ca/";
getInfo(propAddress);

async function getInfo(address) {
  const addressInfo = await getByAddress(address);
  await getById(addressInfo.value);
  //return addressInfo;
}

async function getByAddress() {
  try {
    const url = baseUrl + "Property/Search/GetByAddress?addr=" + propAddress;
    const response = await axios.get(url);
    return response.data[0];
  } catch (error) {
    console.error(error);
  }
}

async function getById(id) {
  const url = baseUrl + "/Property/Info/" + id;
  try {
    const response = await axios.get(url);
    console.log(response);
    const toRet = parsePropertyInfo(response.data);
    return toRet;
  } catch (error) {
    console.error(error);
  }
}

function parsePropertyInfo(propertyInfoHtml) {
  return {};
}

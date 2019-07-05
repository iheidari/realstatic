const axios = require("axios");
const cheerio = require("cheerio");

const propAddress = "2062 Mary Hill Road";

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
    const toRet = parsePropertyInfo(response.data);
    return toRet;
  } catch (error) {
    console.error(error);
  }
}

function parsePropertyInfo(propertyInfoHtml) {
  const $ = cheerio.load(propertyInfoHtml);
  const price = getValueBySelector($, "#lblTotalAssessedValue");
  const yearBuilt = getValueBySelector($, "#lblYearBuilt");
  const bedrooms = getValueBySelector($, "#lblBedrooms");
  const bathRooms = getValueBySelector($, "#lblBathRooms");
  const strataTotalArea = getValueBySelector($, "#lblStrataTotalArea");
  const landSize = getValueBySelector($, "#lblLandSize");
  const totalAssessedLand = getValueBySelector($, "#lblTotalAssessedLand");
  const totalAssessedBuilding = getValueBySelector(
    $,
    "#lblTotalAssessedBuilding"
  );

  const previousAssessedLand = getValueBySelector(
    $,
    "#lblPreviousAssessedLand"
  );
  const previousAssessedBuilding = getValueBySelector(
    $,
    "#lblPreviousAssessedBuilding"
  );

  //

  const data = {
    age: new Date().getFullYear() - yearBuilt,
    price,
    yearBuilt,
    bedrooms,
    bathRooms,
    strataTotalArea,
    landSize,
    totalAssessedLand,
    totalAssessedBuilding,
    previousAssessedLand,
    previousAssessedBuilding
  };

  return data;
}

function getValueBySelector($, selector) {
  return $(selector).text();
}

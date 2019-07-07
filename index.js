const axios = require("axios");
const cheerio = require("cheerio");

const propAddress = "2975 East Lake Gate";

const baseUrl = "https://www.bcassessment.ca/";
//getInfo(propAddress);

// getPropInfoByRealtorUrl(
//   "https://www.realtor.ca/real-estate/20851392/3-bedroom-condo-424-cardiff-way-port-moody"
// );
//https://www.rew.ca/properties/R2371752/2718-daybreak-avenue-coquitlam-bc

getPropInfoByRewUrl(
  "https://www.rew.ca/properties/R2371752/2718-daybreak-avenue-coquitlam-bc"
);

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
    console.log(toRet);
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

async function getPropInfoByRealtorUrl(realtorurl) {
  try {
    const response = await axios.get(realtorurl);
    const toRet = parseRealtorInfo(response.data);
    return toRet;
  } catch (error) {
    console.error(error);
  }
}

function parseRealtorInfo(html) {
  const $ = cheerio.load(html);
  const listingPrice = getValueBySelector($, "#listingPrice");
  console.log(listingPrice);
}

async function getPropInfoByRewUrl(url) {
  try {
    const response = await axios.get(url);
    const toRet = parseRewInfo(response.data);
    return toRet;
  } catch (error) {
    console.error(error);
  }
}

function parseRewInfo(html) {
  const $ = cheerio.load(html);
  const listingPrice = getValueBySelector($, ".propertyheader-price");
  console.log(listingPrice);
}

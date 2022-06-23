import * as prjConst from "./prjConst.js";
import { getCoordinates } from "./fetches.js";
import { addHistoryLink } from "./ui.js";

export let aClick = (e) => {
  document.getElementById(prjConst.EDIT_ID).value = e.target.innerText;
  document.getElementById(prjConst.BTN_ID).click();
};

export let btnClick = (/*e*/) => {
  let city = document.getElementById(prjConst.EDIT_ID).value;
  document.getElementById(prjConst.EDIT_ID).value = "";
  getCoordinates(city).then((cityInfo) => {
    let lat = cityInfo[0].lat;
    let lon = cityInfo[0].lon;

    let storage = /*window.*/ localStorage;
    if (document.getElementById(prjConst.CBX_ID).checked) {
      storage.setItem(prjConst.MY_LOCATION_LON, lon);
      storage.setItem(prjConst.MY_LOCATION_LAT, lat);
      document.getElementById(prjConst.CBX_ID).checked = false;
    }

    let cityStorageJSON = storage.getItem(prjConst.CITY_LIST);
    let cityList = cityStorageJSON ? JSON.parse(cityStorageJSON) : [];
    let isNeedAddToHistory = true;
    for (let i = 0; i < cityList.length; i++) {
      if (cityList[i].toLowerCase() === city.toLowerCase()) {
        isNeedAddToHistory = false;
        break;
      }
    }

    if (isNeedAddToHistory) {
      if (cityList.length === prjConst.LS_CAPACITY) {
        cityList.shift();
        let aList = document.querySelectorAll("a");
        aList[0].parentNode.removeChild(aList[0]);
      }
      cityList.push(city);
      storage.setItem(prjConst.CITY_LIST, JSON.stringify(cityList));

      addHistoryLink(document.getElementById(prjConst.HISTORY_DIV_ID), city);
    }

    document
      .getElementById(prjConst.MAIN_CONTAINER_ID)
      .showFunc(document.getElementById(prjConst.IFRAME_ID), lat, lon);
  });
};

export let edtKeypress = (e) => {
  if (e.keyCode === 13) {
    document.getElementById(prjConst.BTN_ID).click();
  }
};

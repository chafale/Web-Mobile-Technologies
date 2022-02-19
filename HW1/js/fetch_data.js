// Fetch() http request

let jsonData = "./data/data.json";
async function fetchData() {
  const response = await fetch(jsonData);
  let resp = await response.json();
  return resp;
}

fetchData().then(function (data) {
  for (const key in data) {
    if (Object.hasOwnProperty.call(data, key)) {
      if (key == "section2") {
        let arrList = data[key];
        for (let index = 0; index < arrList.length; index++) {
          let elemHeaderId = key + "-" + "tile" + (index + 1) + "-" + "header";
          let elemParaId = key + "-" + "tile" + (index + 1) + "-" + "data";
          document.getElementById(elemHeaderId).innerHTML =
            arrList[index]["heading"];
          document.getElementById(elemParaId).innerHTML =
            arrList[index]["text"];
        }
      }
      if (key == "section3") {
        const paraList = data[key].text;
        document.getElementById("section3-para1").innerHTML = paraList[0];
        document.getElementById("section3-para2").innerHTML = paraList[1];
      }
      if (key == "section4") {
        let objList = data[key];
        for (let index = 0; index < objList.length; index++) {
          const obj = objList[index];
          let headerId = key + "-" + "header" + (index + 1);
          let paraId = key + "-" + "para" + (index + 1);
          document.getElementById(headerId).innerHTML = obj["heading"];
          document.getElementById(paraId).innerHTML = obj["text"];
        }
      }
    }
  }
});

let data = require("./countries.json");

createNewArrayToRender = () => {
  let arrayToPush = [];
  let object = {};
  data.data.map(
    k => (
      (object = {}),
      (object["name"] = k.name),
      (object["flag"] = k.flag),
      (object["callingCodes"] = k.callingCodes),
      arrayToPush.push(object)
    )
  );
  return arrayToPush;
};

let newData = createNewArrayToRender();

console.log(newData);

async function GetRate(currency:string) {
  if(currency == "default") return [0, 0]
    const response = await fetch(`https://data-api.ecb.europa.eu/service/data/EXR/D.${currency}.EUR.SP00.A?lastNObservations=1&format=jsondata`, {method: "GET", redirect: "follow"})
     .then((response) => response.json())
     .catch((error) => console.error(error));
     const value = response.dataSets[0].series["0:0:0:0:0"].observations[0][0];
     const date = response.structure.dimensions.observation[0].values[0].id;
     console.log(value);
     console.log(date);

     return [value, date];
   }

   export default GetRate;
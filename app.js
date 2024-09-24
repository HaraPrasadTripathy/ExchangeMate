const URL= "https://latest.currency-api.pages.dev/v1/currencies/eur.json";

const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");

for(let select of dropdowns){
   for(currCode in countryList){
     let newOption = document.createElement("option");
     newOption.innerText = currCode;
     newOption.value = currCode;
     if(select.name === "from" && currCode === "USD"){
      newOption.selected = "selected";  
     }
     if(select.name === "to" && currCode === "INR"){
      newOption.selected = "selected";  
     }
     select.append(newOption);
   }

   select.addEventListener("change", (evt)=>{
   updateFlag(evt.target);
   });
}

const updateFlag = (element)=>{
  let currCode = element.value;
  console.log(currCode);
  let countryCode = countryList[currCode];
  let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
  console.log(newSrc)
  let img = element.parentElement.querySelector("img");
  img.src = newSrc;
}

btn.addEventListener("click", async (evt)=>{
  evt.preventDefault();
  let amount = document.querySelector(".amount input");
  let amtVal = amount.value;
  if( amtVal === "" || amtVal < 1){
     amtVal = 1;
     amount.value = "1";
  }

  const URL= `https://latest.currency-api.pages.dev/v1/currencies/${fromCurr.value.toLowerCase()}.json`; 
  let response = await fetch(URL);
  let data = await response.json();
  let Conversionrates = data[fromCurr.value.toLowerCase()];
  let rate = Conversionrates[toCurr.value.toLowerCase()];
  
  let finalAmt = amtVal * rate;
  msg.innerText = `${amtVal} ${fromCurr.value} = ${finalAmt} ${toCurr.value}`;
})
var nameInput = document.getElementById("siteName");
var urlInput = document.getElementById("siteURL");
var dataBody = document.getElementById("dataBody");
var invalidName = document.getElementById("feedName");
var invalidURL = document.getElementById("feedURL");
var submi = document.getElementById("sub");
var checkURL=document.getElementById("checkURL");
var checkName=document.getElementById("checkName");
// =========
var headd=document.getElementById("header")
var uRLregex =
  /^((http|https):\/\/)?[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}([\/a-zA-Z0-9.?:@_=#&-]*)?$/i;
var nameRegex = /^[a-zA-Z0-9]{3,20}$/;

var urlList;
if (JSON.parse(localStorage.getItem("Sites")) !== null) {
  urlList = JSON.parse(localStorage.getItem("Sites"));
  displayYourFavSit(urlList);
} else {
  urlList = [];
}

function validtateURL(uRL) {
  var clearURL = uRL.trim();
  urlInput.classList.remove("myinput", "myinputt", "myinputs");

  if (uRLregex.test(clearURL)) {
    urlInput.classList.add("myinputt");
    invalidURL.classList.replace("d-block", "d-none");
    return true;
  } else {
    if (clearURL === "") {
      urlInput.classList.add("myinput");
      invalidURL.classList.replace("d-block", "d-none");
    } else {
      urlInput.classList.add("myinputs");
      invalidURL.classList.replace("d-none", "d-block");
    }
    return false;
  }
}
function validateName(name) {
  var clearName = name.trim();
  nameInput.classList.remove("myinput", "myinputt", "myinputs");
  if (nameRegex.test(clearName)) {
    nameInput.classList.add("myinputt");
    invalidName.classList.replace("d-block", "d-none");
    return true;
  } else {
    if (clearName == "") {
      nameInput.classList.add("myinput");
      invalidName.classList.replace("d-block", "d-none");
    } else {
      nameInput.classList.add("myinputs");
      invalidName.classList.replace("d-none", "d-block");
    }

    return false;
  }
}
function addURL() {
  uRL = {
    name: nameInput.value,
    sitURl: urlInput.value,
  };

  if (validateName(uRL.name) && validtateURL(uRL.sitURl)) {
    if(!checkRepeateName(urlList,uRL.name)&&!checkRepeateURL(urlList,uRL.sitURl)){

      urlList.push(uRL);
      localStorage.setItem("Sites", JSON.stringify(urlList));
      displayYourFavSit(urlList);
  
      clear();
    }
  }
}
function clear() {
  nameInput.value = "";
  urlInput.value = "";
  urlInput.classList.remove("myinputt", "myinputs");
  urlInput.classList.add("myinput");
  nameInput.classList.remove("myinputt", "myinputs");
  nameInput.classList.add("myinput");
  invalidName.classList.replace("d-block", "d-none");
  invalidURL.classList.replace("d-block", "d-none");
}

function displayYourFavSit(arr) {
  var containeYorSite = "";
  for (var i = 0; i < arr.length; i++) {
    containeYorSite += `
    <tr>
                                <td scope="row">${i + 1}</td>
                                <td>${arr[i].name}</td>
                                <td><button class="vist rounded-2"><span class="pe-1"><i class="fa-regular fa-eye"></i></span><a href="${
                                  arr[i].sitURl
                                }" class="text-decoration-none" target="_blank"><span class="my-sp"">Visit</span> </a></button></td>
                                <td><button class="del rounded-2" onclick="deleteYoueSite(${i})"><span class="pe-1"><i class="fa-solid fa-trash"></i></span> <span class=" my-sp">Delete</span></button></td>
                            </tr>
    `;
  }
  dataBody.innerHTML = containeYorSite;
}
function deleteYoueSite(index) {
  urlList.splice(index, 1);
  localStorage.setItem("Sites", JSON.stringify(urlList));
  displayYourFavSit(urlList);
}


function checkRepeateName(arr,name ){
  
 for(var i=0;i<arr.length;i++){
   if(arr[i].name===name){
    checkName.innerHTML=`This  name site already exists at index ${i}`;
    return true
    } 
 }
 checkName.innerHTML=``;
 return false
}
function checkRepeateURL(arr,url ){
  
 for(var i=0;i<arr.length;i++){
   if(arr[i].sitURl===url){
    checkURL.innerHTML=`This site already exists at index ${i}`;
    return true
    } 
 }
 checkURL.innerHTML=``;
 return false
}
nameInput.addEventListener("input", function () {
  checkRepeateName(urlList, nameInput.value);
});
urlInput.addEventListener("input", function () {
  checkRepeateURL(urlList, urlInput.value);
});
 

var dogInputEl = document.getElementById("searchBar");
var dogImageEl = document.getElementById("dogImage");
var breedList = [];
var dogInput = "akita";//breedList[0]; //will eventually come from search box!

var dogBreedListAPI = `https://dog.ceo/api/breeds/list/all`;
var randomFactAPI = `http://dog-api.kinduff.com/api/facts`; //error 301, can't use??

var getBreedList = function () {
  // getting complete list of options for breeds from API
  fetch(dogBreedListAPI).then(function (response) {
    response.json().then(function (data) {
      // convert JSON object to array of breeds
      breedList = Object.keys(data.message);
    })
  })
    .catch(function (error) {
      console.log(error);
    })
}

getBreedList();

// error code 301 - permenantly moved.  I don't think that we can use this API
// var getRandomFact = function(){
//   fetch(randomFactAPI).then(function(response){
//     console.log(response);
//   })
// }

// getRandomFact();

var getDogPic = function (dogInput) {
  //API call using input from the search box to find dog pics
  var picGrabberAPI = `https://dog.ceo/api/breed/${dogInput}/images/random`;

  fetch(picGrabberAPI).then(function (response) {
    response.json().then(function (data) {
      // create element image and append to page
      var newImage = document.createElement("img");
      newImage.src = data.message;
      dogImageEl.appendChild(newImage);
    })
  })
    .catch(function (error) {
      console.log(error);
    })
}

getDogPic(dogInput);
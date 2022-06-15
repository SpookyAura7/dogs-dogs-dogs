var dogInputEl = document.getElementById("searchBar");
var dogImageEl = document.getElementById("dogImage");
var newsEl = document.getElementById("dogFact");
var breedList = [];
var dogInput = "akita";//breedList[0]; //will eventually come from search box!

var dogBreedListAPI = `https://dog.ceo/api/breeds/list/all`;

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

var getDogPic = function () {
  //API call using input from the search box(future state) to find dog pics
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

var dailyNews = function () {
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': '2a8723ca87msh452f2c14059529cp12e7d3jsn2d79e16e329f',
      'X-RapidAPI-Host': 'daily-dog-news.p.rapidapi.com'
    }
  };
  
  fetch('https://daily-dog-news.p.rapidapi.com/news/ap', options)
  .then(response => response.json())
  .then(data => {
    console.log(data)
    var newsArticle = document.createElement("div");
    var randomVal = Math.floor(Math.random() * data.length);
    //load random news article from the API array of daily news stories
    newsArticle.innerHTML = '<a href="' + data[randomVal].url + '" target="_blank">' + data[randomVal].title + ' </a>';
    newsEl.appendChild(newsArticle);
  })
  .catch(err => console.error(err));
}

getDogPic(dogInput);
dailyNews();
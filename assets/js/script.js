// Variables---------------------------------------------------------------------------------
var findDog = document.getElementById("findDog")
var dogInputEl = document.getElementById("searchBar");
var dogImageEl = document.getElementById("dogImage");
var newsEl = document.getElementById("dogFact");
var breedList = JSON.parse(localStorage.getItem("Breed"))
var dogHist = document.querySelector("#searchHistory")
var bad = false;
var clrbtn = document.getElementById("clearbtn")
//CLICK TO WORK----------------------------------------------------------------------
findDog.addEventListener("click", function () {
    getBreedList()
    breedSearch()
    pullStorage()
    getDogPic()
    dailyNews()
    document.getElementById("searchBar").value = ""; //blanks out input feild
})
//SAVE TO LOCAL STORAGE------------------------------------------------------------
function breedSearch() {    
    // get data from input box
    var dogSearch = dogInputEl.value;
    //if there is nothing in at the start, then save an empty array
    if(localStorage.getItem("Breed") == null) {
        localStorage.setItem('Breed', '[]');
    }
    //get old data
    var oldDog = JSON.parse(localStorage.getItem("Breed"))
    oldDog.push(dogSearch);
    //save data to local storage
    localStorage.setItem('Breed', JSON.stringify(oldDog))
}
//CLEAR LOCAL STORAGE
clrbtn.addEventListener("click", function(){
    localStorage.clear();
})
//PULL FROM STORAGE ---------------------------------------------------------------
var pullStorage = function () {
if(localStorage.getItem("Breed") != null){
    dogHist.innerText = JSON.parse(localStorage.getItem("Breed"));
}
}
//API-----------------------------------------------------------------------------
var getDogPic = function (event) {
    var dogInput = document.getElementById("searchBar").value;
    //-------------
    console.log(dogInputEl.textContent)
    //API call using input from the search box(future state) to find dog pics
    var picGrabberAPI = `https://dog.ceo/api/breed/${dogInput}/images/random`;
    fetch(picGrabberAPI).then(function (response) {
        response.json().then(function (data) {
            console.log(data);
            //DISPLAYS IN IMG INSTEAD OF CREATING A NEW ONE
            document.getElementById("dogImage").src=data.message;
        })
    })
        .catch(function (error) {
            console.log(error);
        })
}
//DOG LIST API---------------------------------------------------------------------------
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
// SAD FACTS--------------------------------------------------------------------------
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
            //var newsArticle = document.createElement("div");
            var randomVal = Math.floor(Math.random() * data.length);
            //load random news article from the API array of daily news stories
            //newsArticle.innerHTML = '<a href="' + data[randomVal].url + '" target="_blank">' + data[randomVal].title + ' </a>';
            //newsEl.appendChild(newsArticle);


            //INSTEAD OF CREATING WE ARE USING WHATS ALREADY THERE
            newsEl.innerHTML = '<a href="' + data[randomVal].url + '" target="_blank">' + data[randomVal].title + ' </a>';
        })
        .catch(err => console.error(err));
}

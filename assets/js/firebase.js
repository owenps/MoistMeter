// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
var firebaseConfig = {
   apiKey: "AIzaSyCM1jzibvUKitjTnaLjmZ0Ter34yIVshis",
   authDomain: "moistmeter-0.firebaseapp.com",
   databaseURL: "https://moistmeter-0-default-rtdb.firebaseio.com",
   projectId: "moistmeter-0",
   storageBucket: "moistmeter-0.appspot.com",
   messagingSenderId: "229267372019",
   appId: "1:229267372019:web:974584b06a03c3e5058486",
   measurementId: "G-ZVNLZBW869"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Read Database
const dbRef = firebase.database().ref();

/*
dbRef.child("It Takes Two").child("score").get().then((snapshot) => {
   if (snapshot.exists()){
      console.log(snapshot.val());
   } else {
      console.log("No data available");
   }
}).catch((error) => {
   console.error(error);
});
   
dbRef.child("It Takes Two").get().then((snapshot) => {
   for (var key in snapshot.val()){
      console.log(snapshot.val()[key]);
   }
});
*/
var allVideoGames = [];
var allMovies = [];
var allTVShows = [];
var allAnime = [];
var allMedia = [];

document.getElementById("searchSubmit").addEventListener("click",function(){
   //document.getElementById("resultsModal").modal("show");
   $("#resultsModal").modal("show");
})

//document.getElementById("modalClose").addEventListener("click",function(){
//   $("#resultsModal").modal("close");
//})

function clearTable(table){
   table.innerHTML = "";
}

function fillTable(table,arr) {
   for (var item in arr){
      var row = table.insertRow();

      var pictureCell = row.insertCell(0);
      pictureCell.classList.add("align-middle");
      if (arr[item]["title"].includes(":") | arr[item]["title"].includes("|")){
         let altTitle = arr[item]["title"].replace(":","-");
         let ind = altTitle.indexOf(" |");
         if (ind != -1){
            altTitle = altTitle.substring(0,ind);
         }
         pictureCell.innerHTML = '<a href="'+arr[item]["link"]+'" target="_blank"><img src="./assets/images/'+altTitle+'.jpg" width="130" height="200"></a>';
      }else{
         pictureCell.innerHTML = '<a href="'+arr[item]["link"]+'" target="_blank"><img src="./assets/images/'+arr[item]["title"]+'.jpg" width="130" height="200"></a>';
      }
      

      var titleCell = row.insertCell(1);
      titleCell.classList.add("align-middle");
      titleCell.innerHTML = "<h2>" + arr[item]["title"] + "</h2><p>"+arr[item]["date"]+"</p>";

      var scoreCell = row.insertCell(2);
      scoreCell.classList.add("align-middle");
      scoreCell.innerHTML = "<h1>" + arr[item]["score"] + "<h1>";
   }
}
// Returns 1 if order should be switched (least to greatest) and -1 otherwise
function compareDate(obj1,obj2){
   let d1 = obj1["date"];
   let d2 = obj2["date"];

   // Date is of the form dd/mm/year
   let d1Day = parseInt(d1.substring(0,2));
   let d1Month = parseInt(d1.substring(3,5));
   let d1Year = parseInt(d1.substring(6,10));

   let d2Day = parseInt(d2.substring(0,2));
   let d2Month = parseInt(d2.substring(3,5));   
   let d2Year = parseInt(d2.substring(6,10));

   if (d1Year != d2Year){
      if (d1Year > d2Year){return 1;}
      else{return -1;}
   }else if (d1Month != d2Month){
      if (d1Month > d2Month){return 1;}
      else{return -1;}
   }else{
      if (d1Day > d2Day){return 1;}
      else{return -1;}
   }
}

function compareScore(obj1,obj2){
   if (obj1["score"] > obj2["score"]){ return 1; }
   else if (obj1["score"] < obj2["score"]) { return -1; }
   else { return compareDate(obj1,obj2); } // break ties with most recent 
}

dbRef.get().then((snapshot) => {
   for (var key in snapshot.val()){
      var item = snapshot.val()[key];
      if (item["category"] === "vg"){
         allVideoGames.push(item);
      }else if (item["category"] === "movie"){
         allMovies.push(item);
      }else if (item["category"] === "tv"){
         allTVShows.push(item);
      }else if (item["category"] === 'anime'){
         allAnime.push(item);
      }else{
         //console.log("No Category Found: "+item["title"]);
      }
      allMedia.push(item);
   }

   // Video Games Arrays
   var allVideoGamesOldest = [...allVideoGames].sort(compareDate);
   var allVideoGamesRecent = [...allVideoGamesOldest].reverse();
   var allVideoGamesLow = [...allVideoGames].sort(compareScore);
   var allVideoGamesHigh = [...allVideoGamesLow].reverse();

   // Movies Arrays
   var allMoviesOldest = [...allMovies].sort(compareDate);
   var allMoviesRecent = [...allMoviesOldest].reverse();
   var allMoviesLow = [...allMovies].sort(compareScore);
   var allMoviesHigh = [...allMoviesLow].reverse();

   // TV Arrays
   var allTVShowsOldest = [...allTVShows].sort(compareDate);
   var allTVShowsRecent = [...allTVShowsOldest].reverse();
   var allTVShowsLow = [...allTVShows].sort(compareScore);
   var allTVShowsHigh = [...allTVShowsLow].reverse();

   // Anime Arrays
   var allAnimeOldest = [...allAnime].sort(compareDate);
   var allAnimeRecent = [...allAnimeOldest].reverse();
   var allAnimeLow = [...allAnime].sort(compareScore);
   var allAnimeHigh = [...allAnimeLow].reverse();

   fillTable(document.getElementById("vgTable"),allVideoGamesRecent);
   fillTable(document.getElementById("movieTable"),allMoviesRecent);
   fillTable(document.getElementById("tvTable"),allTVShowsRecent);
   fillTable(document.getElementById("animeTable"),allAnimeRecent);

   // Video Game Listeners
   document.getElementById("vg-recent").addEventListener("click",function(){
      clearTable(document.getElementById("vgTable"));
      fillTable(document.getElementById("vgTable"),allVideoGamesRecent);
   });

   document.getElementById("vg-oldest").addEventListener("click",function(){
      clearTable(document.getElementById("vgTable"));
      fillTable(document.getElementById("vgTable"),allVideoGamesOldest);
   });

   document.getElementById("vg-high").addEventListener("click",function(){
      clearTable(document.getElementById("vgTable"));
      fillTable(document.getElementById("vgTable"),allVideoGamesHigh);
   });

   document.getElementById("vg-low").addEventListener("click",function(){
      clearTable(document.getElementById("vgTable"));
      fillTable(document.getElementById("vgTable"),allVideoGamesLow);
   });

   // Movie Listeners
   document.getElementById("movie-recent").addEventListener("click",function(){
      clearTable(document.getElementById("movieTable"));
      fillTable(document.getElementById("movieTable"),allMoviesRecent);
   });

   document.getElementById("movie-oldest").addEventListener("click",function(){
      clearTable(document.getElementById("movieTable"));
      fillTable(document.getElementById("movieTable"),allMoviesOldest);
   });

   document.getElementById("movie-high").addEventListener("click",function(){
      clearTable(document.getElementById("movieTable"));
      fillTable(document.getElementById("movieTable"),allMoviesHigh);
   });

   document.getElementById("movie-low").addEventListener("click",function(){
      clearTable(document.getElementById("movieTable"));
      fillTable(document.getElementById("movieTable"),allMoviesLow);
   });

   // TV Shows Listeners
   document.getElementById("tv-recent").addEventListener("click",function(){
      clearTable(document.getElementById("tvTable"));
      fillTable(document.getElementById("tvTable"),allTVShowsRecent);
   });

   document.getElementById("tv-oldest").addEventListener("click",function(){
      clearTable(document.getElementById("tvTable"));
      fillTable(document.getElementById("tvTable"),allTVShowsOldest);
   });

   document.getElementById("tv-high").addEventListener("click",function(){
      clearTable(document.getElementById("tvTable"));
      fillTable(document.getElementById("tvTable"),allTVShowsHigh);
   });

   document.getElementById("tv-low").addEventListener("click",function(){
      clearTable(document.getElementById("tvTable"));
      fillTable(document.getElementById("tvTable"),allTVShowsLow);
   });

   // Anime Listeners
   document.getElementById("anime-recent").addEventListener("click",function(){
      clearTable(document.getElementById("animeTable"));
      fillTable(document.getElementById("animeTable"),allAnimeRecent);
   });

   document.getElementById("anime-oldest").addEventListener("click",function(){
      clearTable(document.getElementById("animeTable"));
      fillTable(document.getElementById("animeTable"),allAnimeOldest);
   });

   document.getElementById("anime-high").addEventListener("click",function(){
      clearTable(document.getElementById("animeTable"));
      fillTable(document.getElementById("animeTable"),allAnimeHigh);
   });

   document.getElementById("anime-low").addEventListener("click",function(){
      clearTable(document.getElementById("animeTable"));
      fillTable(document.getElementById("animeTable"),allAnimeLow);
   });


   // Search Function
   document.getElementById("searchbar").addEventListener("input",function(e){
      let val = e.target.value.toLowerCase();
      if (val.trim().length > 1){
         // Check database
         var results = []
         for (var key in allMedia){
            let item = allMedia[key];
            if (item["title"].toLowerCase() === val){
               // Exact results go first
               results.unshift(item);
            } else if (item["title"].toLowerCase().includes(val)){
               // Add to results
               results.push(item)
            }
            if (results.length >= 5){ break; } // limit of 5 search results
         }
         // Display results
         clearTable(document.getElementById("resultsTable"));
         fillTable(document.getElementById("resultsTable"),results);
      }else{
         clearTable(document.getElementById("resultsTable"));
      }
   });
});
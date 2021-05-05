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
         pictureCell.innerHTML = '<img src="./assets/images/'+altTitle+'.jpg" width="130" height="200">';
      }else{
         pictureCell.innerHTML = '<img src="./assets/images/'+arr[item]["title"]+'.jpg" width="130" height="200">';
      }
      

      var titleCell = row.insertCell(1);
      titleCell.classList.add("align-middle");
      titleCell.innerHTML = "<h2>" + arr[item]["title"] + "</h2><p>"+arr[item]["date"]+"</p>";

      var scoreCell = row.insertCell(2);
      scoreCell.classList.add("align-middle");
      scoreCell.innerHTML = "<h1>" + arr[item]["score"] + "<h1>";
   }
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
         console.log("No Category Found");
      }
   }
   fillTable(document.getElementById("vgTable"),allVideoGames);
   fillTable(document.getElementById("movieTable"),allMovies);
   fillTable(document.getElementById("tvTable"),allTVShows);
   fillTable(document.getElementById("animeTable"),allAnime);
});
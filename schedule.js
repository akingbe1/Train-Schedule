
  var config = {
    apiKey: "AIzaSyD3eKzjQ-YruFE0AlQY1DPdI8KvqYiq5vs",
    authDomain: "train-schedule-fb302.firebaseapp.com",
    databaseURL: "https://train-schedule-fb302.firebaseio.com",
    storageBucket: "train-schedule-fb302.appspot.com",
    messagingSenderId: "982572551502"
  };
  firebase.initializeApp(config);
var database = firebase.database();

var currentTime = moment();
console.log(currentTime);



  // Button for adding Trains
$("#add-train-btn").on("click", function(event) {
  event.preventDefault();
  // Grabs user input
  var trainName = $("#train-name-input").val().trim();
  var destination = $("#destination-input").val().trim();
  var firstTrain = $("#first-train-input").val().trim();
  var frequency = $("#frequency-input").val().trim();
  

  // Creates local "temporary" object for holding train data
  var newTrain = {
    name: trainName,
    destination: destination,
    time: firstTrain,
    frequency: frequency
  };
  // Uploads train data to the database
  database.ref().push(newTrain);
  // Logs everything to console
  console.log(newTrain.name);
  console.log(newTrain.destination);
  console.log(newTrain.time);
  console.log(newTrain.frequency);
  // Alert
  alert("Train successfully added");
  // Clears all of the text-boxes
  $("#train-name-input").val("");
  $("#destination-input").val("");
  $("#first-train-input").val("");
  $("#frequency-input").val("");
});







// 3. Create Firebase event for adding train to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function(childSnapshot, prevChildKey) {
  console.log(childSnapshot.val());
  // Store everything into a variable.
  var trainName = childSnapshot.val().name;
  var destination = childSnapshot.val().destination;
  var firstTrain = childSnapshot.val().time;
  var frequency = childSnapshot.val().frequency;
  // Train Info
  console.log(trainName);
  console.log(destination);
  console.log(firstTrain);
  console.log(frequency);

  var firstTrainConverted = moment(firstTrain, "HH:mm").subtract(1, "years");
  //console.log(firstTrainConverted);
  var diffTime = moment().diff(moment(firstTrainConverted), "minutes");
  //console.log(diffTime);
  var remainder = diffTime % frequency;
  //console.log(remainder);
  var minutesTillTrain = frequency - remainder;
  //console.log(minutesTillTrain);
  var nextTrain = moment().add(minutesTillTrain, "minutes");
  //console.log(moment(nextTrain).format("HH:mm"));
  var nextTrainTime = moment(nextTrain).format("HH:mm");


  $("#train-table > tbody").append("<tr><td>" + trainName + "</td><td>" + destination + "</td><td>" + frequency + "</td><td>" + nextTrainTime + "</td><td>" + minutesTillTrain + "</td></tr>");
});

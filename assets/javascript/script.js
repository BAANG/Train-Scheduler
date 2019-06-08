  //Moment.js

  var currentTime = moment();
  var currentTimeConverted = moment(currentTime).format("HH:mm")
  
  $("#currentTime").text(currentTimeConverted)

  
var firebaseConfig = {
    apiKey: "AIzaSyCP-9Xzy5U9DrewOg_I_rF--V0uHf6ocns",
    authDomain: "train-scheduler-782bf.firebaseapp.com",
    databaseURL: "https://train-scheduler-782bf.firebaseio.com",
    projectId: "train-scheduler-782bf",
    storageBucket: "train-scheduler-782bf.appspot.com",
    messagingSenderId: "820568229937",
    appId: "1:820568229937:web:3162fa840d6f09ba"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  var database = firebase.database();

  //Initial Values
  var trainName = "";
  var destination = "";
  var firstTrain;
  var frequency = 0;

  //Click event listener to capture user input
  $("#submitTrain").on("click", function(event) {
    event.preventDefault();

  trainName = $("#train-name").val().trim();
  destination = $("#destination").val().trim();
  firstTrain = $("#first-train").val().trim();
  frequency = $("#frequency").val().trim();

    //Push values to database
    database.ref("trains").push({
      trainName: trainName,
      destination: destination,
      firstTrain: firstTrain,
      frequency: frequency
    })

  $("#add-train-form").each(function (){ //form reset on submit
    this.reset();
  })

  });

  database.ref("trains").on("child_added", function(snapshot) {

    var sv = snapshot.val();

    //Calculate next arrivals and minutes away with Moment.js

    var tFrequency = sv.frequency;
    var firstTime = sv.firstTrain;

    var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");

    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");

    var tRemainder = diffTime % tFrequency;

    var tNextTrain = tFrequency - tRemainder;

    var arrivalTime = moment().add(tNextTrain, "minutes");

    var arrivalTimeConverted = moment(arrivalTime).format("HH:mm")


    //Append all values to table

    var tr = $("<tr>");
    var td = "<td>"

    tr.append($(td).text(sv.trainName))
    tr.append($(td).text(sv.destination))
    tr.append($(td).text(sv.frequency))
    tr.append($(td).text(arrivalTimeConverted))
    tr.append($(td).text(tNextTrain))

    var tbody = $("tbody")

    $(tbody).append(tr)

  }, function(errorObject) {
    console.log("Errors handled: " + errorObject)
  })

  // TODO: Refresh page by the minute
    // -- create function to get current time every 30s
    // -- set new value for time in firebase at every check
    // -- create event listener to check for value changes in firebase
    // -- everytime the value changes (everytime the time changes by a minute):
      // -- recalculate table values, clear table, repost new values

  checkTime = function(){
    currentTime = moment();
    currentTimeConverted = moment(currentTime).format("HH:mm")

    $("#currentTime").text(currentTimeConverted)
  }

   //Event listener for database value changes

  //  database.ref("time").on("value", function(snapshot){
  //   database.ref("time").set({
  //     currentTimeFB: currentTimeConverted
  //   })


  // })

  
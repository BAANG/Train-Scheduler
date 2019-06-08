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
    database.ref().push({
      trainName: trainName,
      destination: destination,
      firstTrain: firstTrain,
      frequency: frequency
    })

  $("#add-train-form").each(function (){ //form reset on submit
    this.reset();
  })

  });

  database.ref().on("child_added", function(snapshot) {

    var sv = snapshot.val();

    console.log(sv.trainName)
    console.log(sv.destination)
    console.log(sv.firstTrain)
    console.log(sv.frequency)

    var tr = $("<tr>");
    var td = "<td>"

    tr.append($(td).text(sv.trainName))
    tr.append($(td).text(sv.destination))
    tr.append($(td).text(sv.frequency))
    tr.append($(td).text(sv.firstTrain))
    tr.append($(td).text("--"))

    var tbody = $("tbody")

    $(tbody).append(tr)

  }, function(errorObject) {
    console.log("Errors handled: " + errorObject.code)
  })

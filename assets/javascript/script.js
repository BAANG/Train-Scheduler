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

  console.log(trainName)
  console.log(destination)
  console.log(firstTrain)
  console.log(frequency)

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




  var tr = $("<tr>")


  tr.append("<td>" + trainName + "</td>")
  tr.append("#destination")
  tr.append("#firstTrain")
  tr.append("#frequency")

  $("#tableBody").append(tr)

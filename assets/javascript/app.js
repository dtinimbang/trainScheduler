/* global firebase moment */
// Steps to complete:

// 1. Initialize Firebase
// 2. Create button for adding new employees - then update the html + update the database
// 3. Create a way to retrieve employees from the employee database.
// 4. Create a way to calculate the months worked. Using difference between start and current time.
//    Then use moment.js formatting to set difference in months.
// 5. Calculate Total billed

// 1. Initialize Firebase
//alert("this page is connected");
var config = {
    apiKey: "AIzaSyCQzcm_bxYK0CLi0dNErjKjKpEl1U_fMYE",
    authDomain: "trainscheduler-80277.firebaseapp.com",
    databaseURL: "https://trainscheduler-80277.firebaseio.com",
    projectId: "trainscheduler-80277",
    storageBucket: "",
    messagingSenderId: "900343848509"
};
firebase.initializeApp(config);

var database = firebase.database();

// 2. Button for adding Employees
$("#add-info-btn").on("click", function (event) {
    event.preventDefault();

    // Grabs user input
    var trnName = $("#train-name-input").val().trim();
    var trnDestination = $("#destination-input").val().trim();
    var trnTime = $("#time-input").val().trim();
    var trnFreq = $("#freq-input").val().trim();

    // Creates local "temporary" object for holding employee data
    var newSchedule = {
        name: trnName,
        destination: trnDestination,
        time: trnTime,
        freq: trnFreq
    };

    // Uploads schedule data to the database
    database.ref().push(newSchedule);

    // Logs everything to console
    console.log(newSchedule.name);
    console.log(newSchedule.destination);
    console.log(newSchedule.time);
    console.log(newSchedule.freq);

    // Alert
    alert("INFO successfully added");

    // Clears all of the text-boxes
    $("#train-name-input").val("");
    $("#destination-input").val("");
    $("#time-input").val("");
    $("#freq-input").val("");
});




//console.log(moment("13:00", 'hh:mm').format('HH:mm a'));
// 3. Create Firebase event for adding employee to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function (childSnapshot, prevChildKey) {

    console.log(childSnapshot.val());

    // Store everything into a variable.
    var trnName = childSnapshot.val().name;
    var trnDestination = childSnapshot.val().destination;
    var trnTime = childSnapshot.val().time;
    var trnFreq = childSnapshot.val().freq;

    // Train Info
    // console.log(trnName);
    // console.log(trnDestination);
    // console.log(trnTime);
    // console.log(trnFreq);






    var differenceTimes = moment().diff(moment.unix(trnTime), "minutes");
	var tRemainder = moment().diff(moment.unix(trnTime), "minutes") % trnFreq;
	var tMinutes = trnFreq - tRemainder;


    	// To calculate the arrival time, add the tMinutes to the currrent time
	var tArrival = moment().add(tMinutes, "m").format("hh:mm A"); 
	//console.log(tMinutes);
    //console.log(tArrival);
    

    var dt = moment(trnTime, ["hh:mm A"]).format("HH:mm");
    // console.log(dt);

    var firstTimeConverted = moment(dt).add(trnFreq);
    // console.log(firstTimeConverted);




    $("#employee-table > tbody").append("<tr><td>" + trnName + "</td><td>" + trnDestination + "</td><td>" + dt + "</td><td>" + trnFreq + "</td><td>" + tArrival + "</td><td>" + tMinutes + "</td></tr>");


// sets the clock on the main page
    $(function () {

        function updateClock() {
            var now = moment(),
                second = now.seconds() * 6,
                minute = now.minutes() * 6 + second / 60,
                hour = ((now.hours() % 12) / 12) * 360 + 90 + minute / 12;

            $('#hour').css("transform", "rotate(" + hour + "deg)");
            $('#minute').css("transform", "rotate(" + minute + "deg)");
            $('#second').css("transform", "rotate(" + second + "deg)");
        }

        function timedUpdate() {
            updateClock();
            setTimeout(timedUpdate, 1000);
        }

        timedUpdate();
    })();



});

  
  // Example Time Math
  // -----------------------------------------------------------------------------
  // Assume Employee start date of January 1, 2015
  // Assume current date is March 1, 2016
  
  // We know that this is 15 months.
  // Now we will create code in moment.js to confirm that any attempt we use mets this test case
  
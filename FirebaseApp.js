//src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.0/jquery.min.js"> 
(function(){
	
//initialize Firebase

const config = {
    apiKey: "AIzaSyAsTyL_YyPo6AbJzOacO2WuH1fIRjeSg-Q",
    authDomain: "onthefly-48868.firebaseapp.com",
    databaseURL: "https://onthefly-48868.firebaseio.com/",
    projectId: "onthefly-48868",
    storageBucket: "onthefly-48868.appspot.com",
    messagingSenderId: "262898034729"
};
firebase.initializeApp(config);


var flights = [];
var passengers = [];
var cargo = [];

//Create references
var dbRefObject = firebase.database().ref().child('Flights');
dbRefObject.once('value').then(function(snapshot){
    snapshot.forEach(function(childSnapshot) {
        var flightData = childSnapshot.val();
        flights.push(flightData);
        passengers.push(flightData.passengers);
		cargo.push(flightData.cargo);

    });
	   var preObject = JSON.stringify(flights);
	   document.getElementById('flights').innerHTML = preObject;

       var preObject2 = JSON.stringify(passengers);
	   document.getElementById('passengers').innerHTML = preObject2;

	   var preObject3 = JSON.stringify(cargo);
	   document.getElementById('cargo').innerHTML = preObject3;
		
		var flight;;
	
	   for (var i in flights){
			$("#table_body").append("<tr><td>" + "<button id = " + flights[i].flightNum + ">" + flights[i].flightNum + "</button>" + "</td><td>" + flights[i].aircraftRegistration + "</td><td>" + flights[i].Departure + "</td><td>" + flights[i].Destination + "</td><td>" + flights[i].numPassengers + "</td><td>" + flights[i].cargoCount + "</td><td>" + flights[i].mainPilot + "</td><td>" + flights[i].copilot + "</td></tr>");	
	   }
			$(document).ready(function(){
				$('button').click(function(){
					flight = this.id;
					document.getElementById('flight').innerHTML = flight;
					showList(flight);
				});
			});
		

		var show1 = true;
		var show2 = true;
		function showList(flight){
			for (var i in passengers){
				if (passengers[i] != null && flights[i].flightNum == flight && show1 == true){
					//console.log(flights[i].flightNum)
					$("#table_body2").append("<tr><td>" + flights[i].flightDate + "</td><td>" + passengers[i].passengerName + "</td><td>" + passengers[i].passengerNationality + "</td><td>" + passengers[i].passengerGender + "</td></tr>");
				}
			}
			show1 = false;
			for (var i in cargo){
				if (cargo[i] != null && flights[i].flightNum == flight && show2 == true){
					$("#table_body3").append("<tr><td>" + flights[i].flightDate + "</td><td>" + cargo[i].cargoDescription + "</td><td>" + cargo[i].cargoType + "</td><td>" + cargo[i].weight + "</td></tr>");	
				}

			}
			show2 = false;
		}
});

}());
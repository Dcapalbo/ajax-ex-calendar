$(document).ready(function() {
//Descrizione:
// Creiamo un calendario dinamico con le festività.
// Il calendario partirà da gennaio 2018 e si concluderà a dicembre 2018 (unici dati disponibili sull’API).
// Milestone 1
// Creiamo il mese di Gennaio, e con la chiamata all'API inseriamo le festività.

  //make a variable with the initial calendar date
   var date = "2018-01-01";
   //make a variable with the current date, using moment.js script
   var momentDate = moment(date);

   //make the handlebars code variables
   var source = $("#day-template").html();
   var template = Handlebars.compile(source);
   //make a cicle to find all the month's days
   for (var i = 1; i < momentDate.daysInMonth(); i++) {

     var context = {
       "day": i,
       "month": momentDate.format("MMMM"),
       "fullDate":momentDate.format("YYYY-MM-DD")
     };
   } console.log(i);

   var html = template(context);
   $(".days").append(html);

   //make a variable usefull to write less inside the ajax call
   var apiCall = "https://flynn.boolean.careers/exercises/api/holidays?year=2018&month=0";
   //make an ajax call to take the data from the server
   $.ajax
    ({
       "url": apiCall,
       "method": "GET",
       "success": function(data, status) {
      //make a console log to control the data of the call
        var results = data.response
        console.log(results);
     },
       "error": function(request, status, error) {
         alert("an error has occured");
     }
   });
});

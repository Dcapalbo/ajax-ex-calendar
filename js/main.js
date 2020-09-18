$(document).ready(function() {
//Descrizione:
// Creiamo un calendario dinamico con le festività.
// Il calendario partirà da gennaio 2018 e si concluderà a dicembre 2018 (unici dati disponibili sull’API).
  //make a variable with the initial calendar date
   var date = "2018-01-01";
   //make a variable with the current date, using moment script
   var momentDate = moment(date);
console.log(momentDate);
   var source = $("#day-template").html();
   var template = Handlebars.compile(source);

   for (var i = 0; i < momentDate.daysinMonth(); i++) {

     var context = {
       "day": i,
       "month": momentDate.format("MMMM"),
       "fullDate":momentDate.format("YYYY-MM-DD")
     };
   }

   var html = template(context);
   $("#days").append(html);
   momentDate.add(1, "day");

   var apiCall = "https://flynn.boolean.careers/exercises/api/holidays?year=2018&month=0";

   $.ajax
    ({
       "url": apiCall,
       "method": "GET",
       "success": function(data, status) {
        console.log();
     },
       "error": function(request, status, error) {
         alert("an error has occured");
     }
   });
// Milestone 1
// Creiamo il mese di Gennaio, e con la chiamata all'API inseriamo le festività.
});

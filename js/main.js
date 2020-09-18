$(document).ready(function() {
//Descrizione:
// Creiamo un calendario dinamico con le festività.
// Il calendario partirà da gennaio 2018 e si concluderà a dicembre 2018 (unici dati disponibili sull’API).
   var date = "2018-01-01";
   var source = $("#day-template");
   var template = Handlebars.compile(source);
   var context = {
     "day": "",
     "month": ""
   };
   var html = template(context);
   var apiCall = "https://flynn.boolean.careers/exercises/api/   holidays?year=2018&month=0";
   $.ajax
   (
     {
       "url": apiCall,
       "method": "GET",
       "success": function(data, status) {
        var results = apiCall.response;
        console.log(results);
     },
       "error": function(request, status, error) {
         alert("an error has occured");
     }
   });
// Milestone 1
// Creiamo il mese di Gennaio, e con la chiamata all'API inseriamo le festività.

});

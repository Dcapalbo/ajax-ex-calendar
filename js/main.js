$(document).ready(function() {
//Descrizione:
// Creiamo un calendario dinamico con le festività.
// Il calendario partirà da gennaio 2018 e si concluderà a dicembre 2018 (unici dati disponibili sull’API).
var source = $("#day-template");
var template = Handlebars.compile(source);
var context = {
  "title": "My New Post",
  "body": "This is my first post!"
};
var html = template(context);
var apiCall = "https://flynn.boolean.careers/exercises/api/holidays?year=2018&month=0";
    $.ajax(
      {
        "url": apiCall,
        "method": "GET",
        "success": function(data, status)
        console.log(apiCall);
  },
      {
        "error": function (error)
      },
    );
// Milestone 1
// Creiamo il mese di Gennaio, e con la chiamata all'API inseriamo le festività.

});

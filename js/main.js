$(document).ready(function() {

  // make a date variable
  var date = "2018-01-01";
  //make moment variable to pick
  var momentDate = moment(date);
  //Handlebars
  var source = $("#day-template").html();
  var template = Handlebars.compile(source)
  renderCalendar(momentDate);
  renderHolyday(momentDate);

// FUNCTIONS
// Make a function to find the holiday dates and names
  function renderHolyday(momentDate) {
     //make the value of month and year with moment.js
     var momentMonth = momentDate.month();
     var momentYear = momentDate.year();
     //make an api variable
     apiObject = "https://flynn.boolean.careers/exercises/api/holidays";
     //make the ajax call
     $.ajax (
   {
     "url": apiObject,
     "data": {
       "year": momentYear,
       "month": momentMonth
   },
     "method": "GET",
     "success": function (data) {
      var holidays = data.response;
      //make a cicle for to search for the holidays inside the Api array
       for (var i = 0; i < holidays.length; i++) {
         //making a variable for the holidayDate
         var holidayDate = holidays[i].date;
         // Taking back the name of the holidayDate
         var holidayName = holidays[i].name;
         // Apply the color class and write the holiday name inside of the HTML
         $(".day[data-date='"+ holidayDate +"']").addClass("holiday");
        // Scrivo anche il nome della festività.
         $(".day[data-date='"+ holidayDate +"']").addClass("name_holiday").append(" - " + holidayName);
      }
   },
      "error": function (err) {
       alert("There is an error. "+ err);
      }
  });
};
  function renderCalendar(date) {
     //make a variable
     var dateComplete = moment(date);
     //make a variable to check how many days are inside each month
     var daysInMonth = date.daysInMonth();
     $("h1").text(date.format("MMMM"));
     // make a cicle "for" to show the numbers of days inside the month
      for (var i = 1; i <= daysInMonth; i++) {
       var context = {
         "day": i,
         "month": date.format("MMMM"),
         "dateComplete": dateComplete.format("YYYY-MM-DD")
     }
       // compiling the template and append it inside the html
       var html = template(context);
       $("#days").append(html);
       dateComplete.add(1, "days");
     }
};
        //make a function which at the click on class next, will show the next month
        $(".next").click(function() {
        //make conditions, if the month is bigger then 12, the console will give an error to the user
        if (momentDate.format("MM") == 12) {
           alert("Error try again");
         } else {
           var newDate = momentDate.add(1, "months");
           clear();
           renderCalendar(newDate);
           renderHolyday(newDate);
         }
       });
        //make a function which at the click on class prev, will show the   previous month
        $(".prev").click(function() {
        //make conditions, if the month is lower then 1, the console will   give an error to the user
        if (momentDate.format("MM") == 1) {
            alert("Error try again");
          } else {
            var newDate = momentDate.subtract(1, "months");
            clear();
            renderCalendar(newDate);
            renderHolyday(newDate);
          }
        });
        //make a function to clear the document before to append again the next or previous month's days
        function clear() {
         $("#days li").remove();
       };
});

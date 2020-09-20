$(document).ready(function() {

  // make a date variable
   var date = "2018-01-01";
   //make moment variable to write a more flexible code
   var momentDate = moment(date);
   console.log(momentDate);
   var daysInMonth = momentDate.daysInMonth();
   console.log(daysInMonth);
   //make the value of month and year with moment
   var momentMonth = momentDate.month();
   console.log(momentMonth);
   var momentYear = momentDate.year();

   //Handlebars
   var source = $("#day-template").html();
   var template = Handlebars.compile(source)

   // make a cicle for to show the numbers of days inside the month
   for (var i = 1; i <= daysInMonth; i++) {
    var context = {
      "day": i,
      "month": momentDate.format("MMMM")
    };

    // compiling the template and append it inside the html
    var html = template(context);
    $("#days").append(html);
  }
    //make an api variable
    apiObject = "https://flynn.boolean.careers/exercises/api/holidays";
    //make the ajax call
    $.ajax(
   {
    "url": apiObject,
    "data": {
      "year": momentYear,
      "month": momentMonth
    },
    "method": "GET",
    "success": function (data) {
      var holydayData = data.response;
      console.log(holydayData);
      printHolyday(holydayData);
    },
    "error": function (err) {
      alert("There is an error. "+ errore);
    }
});

// FUNCTIONS
// make a function to find the holiday dates and names
  function printHolyday(holidays) {
   for (var i = 0; i < holidays.length; i++) {
     var holidayDate = holidays[i].date;
     console.log(holidayDate);
     var dayOfHoliday = moment(holidayDate).date();
     console.log(dayOfHoliday);
     // taking back the name of the holiday
     var holidayName = holidays[i].name;
     console.log(holidayName);
     // apply the color class and write the holiday name inside of the HTML
     $(".day:nth-child("+dayOfHoliday+")").addClass("holydays");
     $(".day:nth-child("+dayOfHoliday+")").children(".name_holiday").text(" " +   holidayName);
    }
  }
});

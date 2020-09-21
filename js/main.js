$(document).ready(function() {

  // make a date variable
  var date = "2018-01-01";
  //make moment variable to write a more flexible code
  var momentDate = moment(date);
  console.log(momentDate);
  var daysInMonth = momentDate.daysInMonth();
  //make the value of month and year with moment.js
  var momentMonth = momentDate.month();
  var momentYear = momentDate.year();
  var dateComplete = moment(date);

  //Handlebars
  var source = $("#day-template").html();
  var template = Handlebars.compile(source)


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
      renderCalendar();
      renderHolyday(holydayData);
      console.log(renderHolidays);
    },
    "error": function (err) {
      alert("There is an error. "+ err);
    }
});

// FUNCTIONS
// Make a function to find the holiday dates and names
  function renderHolyday(holidays) {
   for (var i = 0; i < holidays.length; i++) {

     var holidayDate = holidays[i].date;
     console.log(holidayDate);
     var dayOfHoliday = moment(holidayDate).date();
     console.log(dayOfHoliday);
     // Taking back the name of the holiday
     var holidayName = holidays[i].name;

     // Apply the color class and write the holiday name inside of the HTML
     $(".day[data-date=‘" + dayOfHoliday + "’]").addClass("holyday");
     $(".day[data-date=‘" + dayOfHoliday + "’]").text( " " +   holidayName).addClass("holiday");
    }
  };

  function renderCalendar() {

     // make a cicle "for" to show the numbers of days inside the month
     for (var i = 1; i <= daysInMonth; i++) {
      var context = {
        "day": i,
        "month": momentDate.format("MMMM"),
        "dateComplete": dateComplete.format("YYYY-MM-DD")
      };

      // compiling the template and append it inside the html
      var html = template(context);
      $("#days").append(html);
      dateComplete.add(1, "days");
    }
  }
     //make a function which at the click on class next, will show the next month
     $(".next").click(function() {
       //make conditions, if the month is bigger then 12, the console will give an error to the user
      if (momentDate.format("MM") == 12) {
          alert("Error try again");
        } else {
          var newDate = momentDate.add(1, "M");
          clear()
          renderCalendar(newDate);
          renderHolidays(newDate);
          console.log(renderHolidays);
        }
    });
    //make a function which at the click on class prev, will show the previous month
    $(".prev").click(function() {
      //make conditions, if the month is lower then 1, the console will give an error to the user
      if (momentDate.format("MM") == 1) {
          alert("Error try again");
        } else {
          var newDate = momentDate.subtract(1, "M");
          clear()
          renderCalendar(newDate);
          renderHolidays(newDate);
          console.log(renderHolidays);
        }
    });
    //make a function to clear the document before to append again the next or previous month's days
    function clear() {
      $("#days li").remove();
    };

});

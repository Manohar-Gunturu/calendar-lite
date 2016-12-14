# \<calender-lite\>

Multi select date picker or calendar

calender-lite is a Webcomponent build with Polymer. It gives a nice api to play with it.

It has two elements one is calender-lite and another is calender-lite-dark(dark theme).

    <calendar-lite id="someid"></calender-lite>

gives you the calendar, you can attach date-change event listner to it as shown below

    // called whenever a user selects/change a date
    document.querySelector('#someid').addEventListener('date-change', function (e) {
        console.log(e.detail.date); //update input values...
    })
  
You can disable week days by passing an array as shown below.

    <calendar-lite id="someid" disabled-week-day='["Fri","Sun"]'></calender-lite>
        
You can disable required days by passing an array as shown below.

    <calendar-lite id="someid" disabled-days="[4,20,27]"></calender-lite>

You can select mutiple days by passing an Object to `multi-select` attribute as shown below.

    <calendar-lite id="someid" multi-select='{"max":3,"consequent":false}'  disabled-week-day='["Fri"]'  disabled-days="[2,3,4]">
    </calendar-lite>
    
Object muti-select: `max` is nothing but maximum number of days that can be selected, if `consequent` is true it will select the days in consequent.

you can provide min and max dates, such that calendar-lite will disable the remaining dates.

    <calendar-lite id="someid" min-date="2016,12,9" multi-select='{"max":3,"consequent":false}'  disabled-week-day='["Fri"]'  disabled-days="[2,3,4]">
    </calendar-lite>
    
min-date and max-date format should be yyyy-mm-dd.

## To change theme

To change main header color

    <calendar-lite main-color="#E91E63"  id="someid"></calender-lite>

You can use dark theme calendar by importing `calendar-lite-dark.html` instead of `calendar-lite.html`.
    

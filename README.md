# \<calendar-lite\>

Multi select date picker or calendar

Calendar-lite is a Webcomponent build with Polymer. It gives a nice interface to play with it.

##Features

1. selecting min and max date,
2. Select Multiple dates(consequent or random)
3. Disable week days(example disable all Sundays)
4. Disabale required days(examples 1st of this month)
5. triggers an event on month/date change
6. triggers an event on month change
7. Customizable theme

It has two themes one is calendar-lite and another is calendar-lite-dark(dark theme).

    <calendar-lite id="someid"></calendar-lite>

gives you the calendar, you can attach date-change event listener to it as shown below

    // called whenever a user selects/change a date
    document.querySelector('#someid').addEventListener('date-change', function (e) {
        console.log(e.detail.date); //update input values...
    })
  
You can disable week days by passing an array as shown below.

    <calendar-lite id="someid" disabled-week-day='["Fri","Sun"]'></calendar-lite>
        
You can disable required days by passing an array as shown below.

    <calendar-lite id="someid" disabled-days="[4,20,27]"></calendar-lite>

You can select multiple days by passing an Object to `multi-select` attribute as shown below.

    <calendar-lite id="someid" multi-select='{"max":3,"consequent":false}'  disabled-week-day='["Fri"]'  disabled-days="[2,3,4]">
    </calendar-lite>
    
Object multi-select: `max` is nothing but maximum number of days that can be selected, if `consequent` is true it will select the days in consequent.

you can provide min and max dates, such that calendar-lite will disable the remaining dates.

    <calendar-lite id="someid" min-date="2016,12,9" multi-select='{"max":3,"consequent":false}'  disabled-week-day='["Fri"]'  disabled-days="[2,3,4]">
    </calendar-lite>
    
min-date and max-date format should be yyyy-mm-dd.

## To change theme

To change main header color

    <calendar-lite main-color="#E91E63"  id="someid"></calender-lite>

You can use dark theme calendar by importing `calendar-lite-dark.html` instead of `calendar-lite.html`.
    
    <calendar-lite-dark  id="someid"></calender-lite-dark>

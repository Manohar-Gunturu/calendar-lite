[![Published on webcomponents.org](https://img.shields.io/badge/webcomponents.org-published-blue.svg)](https://beta.webcomponents.org/element/Manohar-Gunturu/calendar-lite)


# \<calendar-lite\>

Multi select date picker or calendar

Calendar-lite is a Webcomponent build with Polymer. It gives a nice interface to play with it.

## Features

1. Set min and max date,
2. Select Multiple dates(consequent or random)
3. Disable week days(example disable all Sundays)
4. Disable an array of dates(example 1st and 3rd of this month)
5. triggers an event on date change(So you can update the value of an input field)
6. triggers an event on month change(So you can set different disable dates for different months)
7. Customizable theme

It has two themes one is calendar-lite and another is calendar-lite-dark(dark theme).

<!---
```
<custom-element-demo>
  <template>
    <script src="../../webcomponentsjs/webcomponents-lite.js"></script>
    <link rel="import" href="../../calendar-lite.html">
    <next-code-block></next-code-block>
  </template>
</custom-element-demo>
```
-->
```html
<calendar-lite></calendar-lite>
```

<!---
```
<custom-element-demo>
  <template>
    <script src="../../../webcomponentsjs/webcomponents-lite.js"></script>
    <link rel="import" href="../../calendar-lite-dark.html">
    <next-code-block></next-code-block>
  </template>
</custom-element-demo>
```
-->
```html
<calendar-lite-dark  id="someid"  multi-select='{"max":3,"consequent":true}'></calendar-lite-dark>
```



You can attach date-change event listener to it as shown below

```javascript
    // called whenever a user selects/change a date
    document.querySelector('#someid').addEventListener('date-change', function (e) {
        console.log(e.detail.date); //update input values...
    })
```
 
You can disable week days by passing an array as shown below.
```html
    <calendar-lite id="someid" disabled-week-day='["Fri","Sun"]'></calendar-lite>
```
 
You can disable a bunch of days by passing an array as shown below.

```html
    <calendar-lite id="someid" disabled-days="[4,20,27]"></calendar-lite>
 ```
 
Here you may get a doubt that "How to disable different dates for different months?"

Answer is, you can update the disable dates on `month-change` event as shown below.
 
```javascript
    document.querySelector('#someid').addEventListener('month-change', function (e) {
         //takecare month numbering starts from 0
         if(e.detail.date.getMonth() == 4){
		        document.querySelector('#someid').disabledDays = [1]
		      }else{
		         document.querySelector('#someid').disabledDays = [7,8]
		      }
    })
```
 
You can select multiple days by passing an Object to `multi-select` attribute as shown below.

```html
    <calendar-lite id="someid" multi-select='{"max":3,"consequent":false}'  disabled-week-day='["Fri"]'  disabled-days="[2,3,4]">
    </calendar-lite>
 ```
 
To get the selected multiple dates, use below listener

```javascript
   document.querySelector('#excalendar').addEventListener('multiselect', function (e) {
        console.log(e.detail.dates); // array of selected dates
    })
```
 
In Object multi-select: `max` is nothing but maximum number of days that can be selected, if `consequent` is true it will select the days in consequent.

you can provide min and max dates, such that calendar-lite will disable the remaining dates.
```html
    <calendar-lite id="someid" min-date="2016,12,9" multi-select='{"max":3,"consequent":false}'  disabled-week-day='["Fri"]'  disabled-days="[2,3,4]">
    </calendar-lite>
 ```    
min-date and max-date format should be yyyy-mm-dd.

## To change theme

To change main header color of calendar-lite

```html

    <calendar-lite main-color="#E91E63"  id="someid"></calendar-lite>

```
You can use dark theme calendar by importing `calendar-lite-dark.html` instead of `calendar-lite.html`.

```html
    <calendar-lite-dark  id="someid"></calendar-lite-dark>
 ```

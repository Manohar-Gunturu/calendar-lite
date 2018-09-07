import {PolymerElement, html} from '@polymer/polymer/polymer-element.js';
import {GestureEventListeners} from '@polymer/polymer/lib/mixins/gesture-event-listeners.js';
import '@polymer/iron-flex-layout/iron-flex-layout.js';
import '@polymer/paper-icon-button/paper-icon-button.js';
import '@polymer/iron-iconset-svg/iron-iconset-svg.js';
import '@polymer/paper-button/paper-button.js';
import '@polymer/paper-styles/element-styles/paper-material-styles.js';

class CalendarLite extends GestureEventListeners(PolymerElement) {
  static get template() {
    // language=HTML
    return html`
      <style include="paper-material-styles">
      </style>
      <!-- Icon set for left and right icons -->

      <iron-iconset-svg name="my-icons" size="24">
        <svg>
          <defs>
            <g id="left">
              <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"></path>
            </g>
            <g id="right">
              <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"></path>
            </g>
          </defs>
        </svg>
      </iron-iconset-svg>

      <style>

        :host {
          display: block;
          background-color: white;
          width: 312px;
          -webkit-font-smoothing: antialiased;
          font-family: Helvetica, Arial, sans-serif;
          border: 1px solid #eee;
          --my-elem-primary: #3acfe3;
          --my-elem-grayed: #cccccc;
          text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.004);
          text-rendering: optimizeLegibility !important;
          -webkit-font-smoothing: antialiased !important;
          position: relative;
          top: -10px;
          z-index: 1;
        }

        /*Animation while showing next or previous months*/

        .slide-right {
          animation: slide-right 0.4s linear forwards;
          visibility: hidden;
          -webkit-animation: slide-right 0.4s linear forwards;
        }

        .slide-left {
          animation: slide-left 0.4s linear forwards;
          visibility: hidden;
          -webkit-animation: slide-left 0.4s linear forwards;
        }

        /* Animation while showing years and months*/

        .scale-up {
          animation: scale-up 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
          -webkit-animation: scale-up 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
        }

        @-webkit-keyframes scale-up {
          0% {
            -webkit-transform: scale(0);
            transform: scale(0)
          }
          100% {
            -webkit-transform: scale(1, 1);
            transform: scale(1, 1)
          }
        }

        @-webkit-keyframes slide-left {
          0% {
            -webkit-transform: translateX(0%);
            transform: translateX(0%);
            visibility: hidden
          }
          30% {
            -webkit-transform: translateX(3%);
            transform: translateX(3%);
            visibility: hidden
          }
          60% {
            -webkit-transform: translateX(-3%);
            transform: translateX(-3%);
            visibility: hidden
          }
          90% {
            -webkit-transform: translateX(0%);
            transform: translateX(0%);
            visibility: visible
          }
          100% {
            -webkit-transform: translateX(0%);
            visibility: visible
          }
        }

        @-webkit-keyframes slide-right {
          0% {
            -webkit-transform: translateX(0%);
            transform: translateX(0%);
            visibility: hidden
          }
          30% {
            -webkit-transform: translateX(-3%);
            transform: translateX(-3%);
            visibility: hidden
          }
          60% {
            -webkit-transform: translateX(3%);
            transform: translateX(3%);
            visibility: hidden
          }
          90% {
            -webkit-transform: translateX(0%);
            transform: translateX(0%);
            visibility: visible
          }
          100% {
            -webkit-transform: translateX(0%);
            visibility: visible
          }
        }

        /* Decorate scroll bar for years list*/

        .flex-wrap::-webkit-scrollbar-track {
          background-clip: padding-box;
          border: solid transparent;
          border-width: 0 0 0 4px;
        }

        .flex-wrap::-webkit-scrollbar {
          width: 6px;
        }

        #yearList {
          height: 220px;
        }

        .flex-wrap::-webkit-scrollbar-thumb {
          background-color: darkgrey;
          outline: 1px solid slategrey;
        }

        /* color the .dateSticker on selected */

        .dateSticker.selected {
          background: var(--my-elem-primary);
          color: #fff;
        }

        /* .mainHeader bg color to primary color */

        .mainHeader {
          padding: 10px;
          border-bottom: 1px solid #ddd;
          background: var(--my-elem-primary);
          color: #fff;
        }

        /* disabled .dateSticker color and pointer */

        .dateSticker[disabled] {
          color: #9d9898;
          cursor: not-allowed !important;
        }

        /* change border on hover on years in  years list and months in months list */

        .dateItem:hover {
          transition: border 0.3s ease;
          border: 1px solid #eee;
        }

        .flex-horizontal, .dates {
          @apply(--layout-horizontal);
        }

        .flexchild {
          @apply(--layout-flex);
          @apply(--layout-horizontal);
          font-size: 15px;
          justify-content: center;
          align-items: center;
          color: #474e54;
        }

        .dayNames, .dates {
          @apply(--layout-justified);
        }

        .dates .dateSticker {
          border-radius: 50%;
          padding: 4px;
          text-align: center;
          width: 24px;
          @apply(--layout-horizontal);
          align-items: center;
          justify-content: center;
          height: 24px;
          cursor: pointer;
          margin: 2px;
          font-size: 14px;
        }

        .notextselect, .dateSticker {
          -webkit-user-select: none;
          -moz-user-select: none;
          -ms-user-select: none;
          user-select: none;
        }

        .dayNames > div {
          padding: 12px;
          font-size: 12px;
          color: #474e54;
        }

        .menu_item {
          cursor: pointer;
        }

        .flex-wrap {
          @apply(--layout-horizontal);
          @apply(--layout-wrap);
          height: 100%;
          align-items: center;
          overflow: auto;
          justify-content: center;
          overflow: auto;
        }

        .monthwrap {
          @apply(--layout-horizontal);
          @apply(--layout-wrap);
          justify-content: center;
        }

        .monthwrap div {
          margin: 4px;
        }

        .dateItem {
          border: 1px solid transparent;
          cursor: pointer;
          font-size: 15px;
          padding: 8px 12px;
          border-radius: 4px;
        }

        .flex-wrap div {
          padding: 8px;
          margin: 3px;
          font-size: 13px;
        }

        .pageContainer {
          padding-bottom: 6px;
        }

        .yearContainer {
          cursor: pointer;
          @apply(--layout-horizontal);
          @apply(--layout-center);
          font-size: 15px;
          color: rgba(255, 255, 255, 0.92);
          padding: 6px;
        }

        .monthContainer {
          padding: 6px;
          font-size: 2em;
          font-weight: bold;
        }

      </style>


      <!-- Main header date,month,year are compund binded to selected date -->

      <div class="paper-material card" elevation="1">
        <div class="mainHeader" style="">
          <div class="yearContainer notextselect" type='yearList' on-tap="_show">
            {{_getUpdated(date,'year')}}
          </div>
          <div class="monthContainer notextselect">
            <span type='calendarContent' on-tap="_show" class="menu_item">{{_getUpdated(date,'day')}}</span>, <span
                  class='menu_item' type='monthsList' on-tap="_show">{{_getUpdated(date,'month')}}</span> <span
                  class='menu_item' type='calendarContent' on-tap="_show">{{_getUpdated(date,'date')}}</span>
          </div>
        </div>

        <div>

          <!-- sub header with  left, right icon and present viewing month  -->
          <div class="container menu flex-horizontal" style="padding: 4px 0px;">
            <paper-icon-button on-tap="_swipePrevMonth" icon="my-icons:left"></paper-icon-button>
            <div class="flexchild"><span></span>
              <span>{{monthFormat(currentMonth)}}</span>
              <span style="margin-left:4px;"> {{yearFormat(currentYear)}} </span></div>
            <paper-icon-button on-tap="_swipeNextMonth" icon="my-icons:right"></paper-icon-button>
          </div>


          <!-- .pageContainer contains calendar, months list and years list  -->

          <div class="pageContainer">

            <!-- years list -->

            <div id="yearList" class="page" style="display:none;">
              <div class="flex-wrap">
                <template is="dom-repeat" items="{{years}}">
                  <div class="dateItem notextselect" on-tap="_setYear">{{item}}</div>
                </template>
              </div>
            </div>

            <!-- months list -->

            <div id="monthsList" class="page" style="display:none;">
              <div class="monthwrap">
                <template is="dom-repeat"
                          items='["Jan","Feb","Mar","April","May","June","July","Aug","Sep","Oct","Nov","Dec"]'>
                  <div class="dateItem notextselect" on-tap="_setMonth">{{item}}</div>
                </template>
              </div>
            </div>

            <!-- calendar -->

            <div class='container page' id="calendarContent">
              <div id="mainContent">
                <div class="container flex-horizontal dayNames">
                  <div>S</div>
                  <div>M</div>
                  <div>T</div>
                  <div>W</div>
                  <div>T</div>
                  <div>F</div>
                  <div>S</div>
                </div>
                <div id="dateContainer">

                  <!-- separator splits calendar into 6 rows -->

                  <template is="dom-repeat" items="{{separator}}" as="row">
                    <div class="dates">
                      <template is="dom-repeat" items="{{_getDays(row,separator)}}" as="day">
                        <div on-tap="_setDate"
                             on-keydown="_keyPressSelect"
                             class$="{{_getDayClass(day.text, currentDay, currentMonth, currentYear)}}"
                             disabled$="{{day.isDisabled}}" tabindex="1">{{day.text}}
                        </div>
                      </template>
                    </div>
                  </template>

                </div>
              </div>
            </div>
          </div>

          <slot name="actions"></slot>

        </div>
      </div>


    `;
  }

  static get is() {
    return 'calendar-lite';
  }

  static get properties() {
    return {
      date: {
        type: Date,
        notify: true,
        value: () => new Date(),
        observer: '_populate'
      },
      currentMonth: {
        type: Number
      },
      currentDay: {
        type: Number
      },
      minDate: {
        type: Date,
        value: null
      },
      maxDate: {
        type: Date,
        value: null
      },
      disabledDays: {
        type: Array,
        value: []
      },
      currentYear: {
        type: Number
      },
      mainColor: {
        type: String,
        value: null
      },
      multiSelect: {
        type: Object,
        value: null
      },
      days: {
        type: Array
      },
      separator: {
        type: Array,
        value: [0, 1, 2, 3, 4, 5]
      },
      disabledWeekDay: {
        type: Array,
        value: []
      }
    }
  }

  constructor() {
    super();
    this.is = 'calendar-lite';
    this.days_names = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    this.months_names = ['Jan', 'Feb', 'Mar', 'April', 'May', 'June', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    // temp variables used in logic to generate calendar
    this.current_page = '';

    this.multiple = [];
    this.tmpDate = null;
    this.cf = null;
    this.tmpObject = null;
  }

  //to get number of days in a month
  monthDays(date) {
    return (new Date(date.getFullYear(), date.getMonth() + 1, 0)).getDate();
  }

  ready() {
    // generate 6 x 7 table
    super.ready(); // for 2.0 class-based elements only

    this.generateTable();
    this._animationEvent = this._whichAnimationEnd();

    this.multiple.push(this.date.getDate() + "," + this.date.getMonth() + "," + this.date.getFullYear());

    this.currentYear = this.date.getFullYear();
    this.currentMonth = this.date.getMonth();

    //update header color if set
    if (this.mainColor != null) {
      this.customStyle['--my-elem-primary'] = this.mainColor;
      this.updateStyles();
    }

    //push into years list
    var tmpArray = [];
    if (this.maxDate != null && this.minDate != null) {
      this._generateYears((this.minDate).getFullYear(), (this.maxDate).getFullYear())
    } else {
      this._generateYears(this.currentYear - 101, this.currentYear + 30, tmpArray)
    }
    //discard tmpArray
    tmpArray = null;
  }

  _getUpdated(d, type) {
    if (type == 'year') {
      return this.date.getFullYear();
    } else if (type == 'month') {
      return this.months_names[this.date.getMonth()];
    }
    else if (type == 'day') {
      return this.days_names[this.date.getDay()]
    } else if (type == 'date') {
      return this.date.getDate();
    } else {
      //some thing weird
    }
  }

  generateTable() {
    //clone into tmpDate
    this.tmpDate = new Date(this.currentYear, this.currentMonth, 1);

    //tmpArray contains 6x7(42) items
    var tmpArray = [];
    this.cf = 0;
    //fill with empty cells
    for (var i = 0; i < this.tmpDate.getDay(); i++) {
      tmpArray.push({text: "", isDisabled: false, i: this.cf++});
    }

    //fill days and check disable dates
    for (var i = 1; i <= this.monthDays(this.tmpDate); i++) {
      this.tmpDate.setDate(i);
      if ((this.minDate != null && this.tmpDate <= this.minDate) || (this.maxDate != null && this.tmpDate >= this.maxDate) || this.disabledWeekDay.indexOf(this.days_names[(this.tmpDate).getDay()]) != -1 || (this.disabledDays).indexOf(i) != -1) {
        tmpArray.push({text: i, isDisabled: true, i: this.cf++});
      } else {
        tmpArray.push({text: i, isDisabled: false, i: this.cf++});
      }

    }
    //fill remaining empty cells
    this.cf = (tmpArray.length > 35) ? (42 - (tmpArray.length)) : (34 - (tmpArray.length));
    for (var j = 0; j <= this.cf; j++) {
      tmpArray.push({text: ""});
    }
    this.days = tmpArray;
    tmpArray = null;
  }

  _getDayClass(s, d) {
    if (this.multiSelect != null) {
      if (this.multiple.indexOf(s + "," + this.currentMonth + "," + this.currentYear) > -1) {
        return "dateSticker  selected";
      }
    }
    if (this.date.getDate() == s && this.date.getMonth() == this.currentMonth && this.date.getFullYear() == this.currentYear) {
      return "dateSticker selected";
    }
    return "dateSticker";
  }

  _setDate(e) {
    var target = e.target;
    var f = e.model.day;
    if (f.text != "" && !e.model.day.isDisabled) {

      if (this.multiSelect != null) {
        if (this.multiSelect.consequent) {
          this.multiple = [];
          this.cf = f.i;
          this.multiple.push(f.text + "," + this.currentMonth + "," + this.currentYear);
          for (var j = 1; this.multiple.length < (this.multiSelect.max); j++) {
            this.tmpDate = new Date(this.currentYear, this.currentMonth, f.text + j);
            if ((this.minDate != null && this.tmpDate <= this.minDate) || (this.maxDate != null && this.tmpDate >= this.maxDate) || this.disabledWeekDay.indexOf(this.days_names[(this.tmpDate).getDay()]) != -1 || (this.disabledDays).indexOf(this.tmpDate.getDate()) != -1) {
            } else {
              this.multiple.push(this.tmpDate.getDate() + "," + this.tmpDate.getMonth() + "," + this.tmpDate.getFullYear());
            }
          }
        } else {
          this.cf = this.multiple.indexOf(f.text + "," + this.currentMonth + "," + this.currentYear);
          if (this.cf < 0) {
            this.multiple.push(f.text + "," + this.currentMonth + "," + this.currentYear);
          } else {
            target.classList.remove('selected');
            this.multiple.splice(this.cf, 1);
            this.triggerEvent('multiselect', this.multiple);
            return;
          }
          if (this.multiple.length > this.multiSelect.max) {
            this.multiple.shift();
          }
        }
        this.triggerEvent('multiselect', this.multiple);
      }
      this.date = new Date(this.currentYear, this.currentMonth, f.text);
    }
  }

  _keyPressSelect(e) {
    if (e.which === 13){
      this._setDate(e);
      return;
      var target = e.target;
      var f = e.model.day;
      if (f.text != "" && !e.model.day.isDisabled) {

        if (this.multiSelect != null) {
          if (this.multiSelect.consequent) {
            this.multiple = [];
            this.cf = f.i;
            this.multiple.push(f.text + "," + this.currentMonth + "," + this.currentYear);
            for (var j = 1; this.multiple.length < (this.multiSelect.max); j++) {
              this.tmpDate = new Date(this.currentYear, this.currentMonth, f.text + j);
              if ((this.minDate != null && this.tmpDate <= this.minDate) || (this.maxDate != null && this.tmpDate >= this.maxDate) || this.disabledWeekDay.indexOf(this.days_names[(this.tmpDate).getDay()]) != -1 || (this.disabledDays).indexOf(this.tmpDate.getDate()) != -1) {
              } else {
                this.multiple.push(this.tmpDate.getDate() + "," + this.tmpDate.getMonth() + "," + this.tmpDate.getFullYear());
              }
            }
          } else {
            this.cf = this.multiple.indexOf(f.text + "," + this.currentMonth + "," + this.currentYear);
            if (this.cf < 0) {
              this.multiple.push(f.text + "," + this.currentMonth + "," + this.currentYear);
            } else {
              target.classList.remove('selected');
              this.multiple.splice(this.cf, 1);
              this.triggerEvent('multiselect', this.multiple);
              return;
            }
            if (this.multiple.length > this.multiSelect.max) {
              this.multiple.shift();
            }
          }
          this.triggerEvent('multiselect', this.multiple);
        }
        this.date = new Date(this.currentYear, this.currentMonth, f.text);
      }
    }
  }

  triggerEvent(e, data) {
    var event = new CustomEvent(e, {detail: {dates: data}});
    this.dispatchEvent(event);
  }

  _setYear(e) {
    this.currentYear = e.model.item;
    this.generateTable();
    this.separator = [0, 1, 2, 3, 4, 5];
    this.current_page = 'calendarContent';
    this.pagination();
  }

  _setMonth(e) {
    this.currentMonth = this.months_names.indexOf(e.model.item);
    this.generateTable();
    this.separator = [0, 1, 2, 3, 4, 5];
    this.current_page = 'calendarContent';
    this.pagination();
  }

  _show(e) {
    this.current_page = e.target.attributes.type.value;
    this.pagination();
  }

  pagination() {
    var pages = this.shadowRoot.querySelectorAll('.page');
    for (var i = 0; i < pages.length; i++) {
      pages[i].style.display = 'none';
    }
    this.tmpObject = this.shadowRoot.querySelector('#' + this.current_page);
    this.tmpObject.style.display = 'block';
    this.tmpObject.classList.add('scale-up');
    this._once(this._animationEvent, () => {
      (this.tmpObject).classList.remove('scale-up')
    }, this.tmpObject);

    pages = null;
  }

  _generateYears(min, max, tmpArray) {
    for (var i = min; i <= max; i++) {
      tmpArray.push(i);
    }
    this.years = tmpArray;
  }

  _populate(newDate, oldDate) {
    this.currentMonth = newDate.getMonth();
    this.currentYear = newDate.getFullYear();
    this.currentDay = newDate.getDay();
    this.generateTable();
    this.separator = [0, 1, 2, 3, 4, 5];
    if (!oldDate) {
      // don't dispatch the date changed event if the element is just initialising
      return;
    }
    this.dispatchEvent(new CustomEvent('date-change', {detail: {date: newDate}}));
  }

  dateFormat(date) {
    if (this.date) {
      return (this.days_names[(this.date).getDay()])
    }
  }

  monthFormat() {
    return this.months_names[this.currentMonth]
  }

  yearFormat() {
    return this.currentYear;
  }

  _swipeNextMonth() {
    this.$.mainContent.classList.add('slide-right');
    this._once(this._animationEvent, () => {
      this.$.mainContent.classList.remove('slide-right')
    }, this.$.mainContent);
    this.changeView(1);
  }

  changeView(x) {
    var tmp = new Date(this.currentYear, this.currentMonth, 1);
    tmp.setMonth(this.currentMonth + x);
    this.currentMonth = tmp.getMonth();
    this.currentYear = tmp.getFullYear();
    this.dispatchEvent(new CustomEvent('month-change', {detail: {date: this.tmpDate}}));
    this.generateTable();
    this.separator = [0, 1, 2, 3, 4, 5];
  }

  _once(eventName, callback, node) {
    function onceCallback() {
      node.removeEventListener(eventName, onceCallback);
      callback();
    }

    node.addEventListener(eventName, onceCallback);
  }

  _swipePrevMonth() {
    this.$.mainContent.classList.add('slide-left');
    this._once(this._animationEvent, () => {
      this.$.mainContent.classList.remove('slide-left')
    }, this.$.mainContent);
    this.changeView(-1);
  }

  _getDays(row) {
    return ((this.days).slice(row * 7, (row * 7) + 7))
  }

  _whichAnimationEnd() {
    var animations = {
      'WebkitTransition': 'webkitAnimationEnd',
      'MozTransition': 'animationend',
      'OTransition': 'oanimationend  oAnimationEnd ',
      'transition': 'animationend'
    };

    for (var t in animations) {
      if (this.style[t] !== undefined) {
        return animations[t];
      }
    }
  }
}

window.customElements.define(CalendarLite.is, CalendarLite);

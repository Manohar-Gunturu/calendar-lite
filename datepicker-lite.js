'use strict';
import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import '@polymer/paper-dropdown-menu/paper-dropdown-menu.js';
import '@polymer/paper-input/paper-input.js';
import '@polymer/iron-icons/iron-icons.js';
import './calendar-lite.js';
import moment from "moment";

/**
 * @customElement
 * @polymer
 */
class DatePickerLite extends PolymerElement {
  static get template() {
    return html`
      <style>
        paper-input-container{
          max-width: 220px;
        }
      
        paper-dropdown-menu {
          width: 100%;
        }
        
        .paper-input-input input{
          border: 0;
          text-align: center;
        }
        
        *[hidden] {
          display: none;
        }
      </style>

      <paper-input-container always-float-label="[[alwaysFloatLabel]]"
                           no-label-float="[[noLabelFloat]]"
                           required$="[[required]]" invalid="{{invalid}}" error-message="Invalid date.">
        <label hidden$=[[!label]] slot="label">[[label]]</label>
        <paper-icon-button slot="prefix" icon="date-range" alt="toggle" title="toggle" on-tap="toggleCalendar"></paper-icon-button>
        <div slot="input" class="paper-input-input">
          <input value="{{monthInput::input}}" placeholder="month" type="number" max="12" style="width: 53px">-
          <input value="{{dayInput::input}}" placeholder="day" type="number" max="31" style="width: 50px">-
          <input value="{{yearInput::input}}" placeholder="year" type="number" style="width: 50px">
        </div>
      </paper-input-container>
      
      <calendar-lite slot="dropdown-content" on-date-change="datePicked" date="{{inputDate}}" hidden$="{{hidden}}">
    
      </calendar-lite>
      
    `;
  }

  static get properties() {
    return {
      value: {
        type: String,
        notify: true,
        observer: 'valueChanged'
      },
      date: {
        type: Object,
        observer: 'dateChanged'
      },
      readonly: {
        type: Boolean,
        value: false
      },
      readableDate: String,
      label: String,
      maskedDate: {
        type: String
      },
      monthInput: {
        type: Number
      },
      dayInput: {
        type: Number
      },
      yearInput: {
        type: Number
      },
      invalid: {
          type: Boolean,
          value: false
      },
      hidden: {
        type: Boolean,
        value: true
      },
      inputDate: {
        type: Date,
        notify: true,
        computed: 'computeDate(monthInput, dayInput, yearInput)'
      }
    };
  }

  _getDateString(date) {
    let month = '' + (date.getMonth() + 1);
    let day = '' + date.getDate();
    let year = date.getFullYear();

    month = month.length < 2 ? '0' + month : month;
    day = day.length < 2 ? '0' + day : day;

    return [year, month, day].join('-');
  }

  datePicked(event) {
    let date = event.detail.date;
    let month = '' + (date.getMonth() + 1);
    let day = '' + date.getDate();
    let year = date.getFullYear();

    month = month.length < 2 ? '0' + month : month;
    day = day.length < 2 ? '0' + day : day;

    this.set('date', event.detail.date);
    this.set('monthInput', month);
    this.set('dayInput', day);
    this.set('yearInput', year);

    return;
  }

  computeDate(month, day, year){
    if (typeof month === 'undefined' || typeof day === 'undefined' || typeof year === 'undefined' || year.length < 4) {
      return;
    }
    let newDate = new Date(year, month - 1, day);
    this.set('invalid', !moment(newDate, 'YYYY-MM-DD', true).isValid());
    return newDate;
  }

  dateChanged() {
    this.readableDate = this.date.toDateString();

    this.dateJustChanged = true;
    this.value = this._getDateString(this.date);

    this.maskedDate = this._getDateString(this.date);
  }

  toggleCalendar(){
    this.set('hidden', !this.hidden);
  }

  valueChanged() {
    if (this.dateJustChanged) {
      this.dateJustChanged = false;
      return;
    }
    this.date = new Date(this.value);
  }
}

window.customElements.define('datepicker-lite', DatePickerLite);

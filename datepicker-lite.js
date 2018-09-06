'use strict';
import {PolymerElement, html} from '@polymer/polymer/polymer-element.js';
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
    // language=HTML
    return html`
      <style>

        :host {
          display: block;
          position: absolute;
        }

        paper-input-container {
          max-width: 225px;
        }

        paper-dropdown-menu {
          width: 100%;
        }

        .paper-input-input input {
          font-size: inherit;
          border: 0;
          text-align: center;
        }

        iron-icon {
          margin-right: 8px;
          cursor: pointer;
        }

        .clear-btn {
          background: var(--my-elem-primary);
          color: #fff;
          padding: 6px;
          margin: 10px 0 10px 10px;
        }

        .close-btn {
          background: var(--my-elem-grayed);
          color: #fff;
          padding: 6px;
          margin: 10px 0 10px 10px;
        }

        .monthInput {
          width: 60px;
        }

        .dayInput {
          width: 50px;
        }

        .yearInput {
          width: 50px;
        }

        *[hidden] {
          display: none;
        }
      </style>

      <paper-input-container always-float-label="true"
                             no-label-float="[[noLabelFloat]]"
                             required$="[[required]]" invalid="{{invalid}}" error-message="Invalid date.">
        <label hidden$=[[!label]] slot="label">[[label]]</label>
        <iron-icon slot="prefix" icon="date-range" alt="toggle" title="toggle"
                   on-tap="toggleCalendar"></iron-icon>
        <div slot="input" class="paper-input-input">
          <input value="{{monthInput::input}}" class="monthInput" placeholder="mm" type="number" max="12">/
          <input value="{{dayInput::input}}" class="dayInput" placeholder="dd" type="number" max="31">/
          <input value="{{yearInput::input}}" class="yearInput" placeholder="yyyy" type="number">
        </div>
      </paper-input-container>

      <calendar-lite on-date-change="datePicked" date="[[inputDate]]" hidden$="[[!opened]]">
        <div slot="actions">
          <paper-button raised class="clear-btn" on-tap="_clearData">Clear</paper-button>
          <paper-button raised class="close-btn" on-tap="toggleCalendar">Close</paper-button>
        </div>
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
      inputDate: {
        type: Date,
        notify: true,
        computed: 'computeDate(monthInput, dayInput, yearInput)'
      },
      opened: {
        type: Boolean,
        value: false
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

  computeDate(month, day, year) {
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
  }

  toggleCalendar() {
    this.set('opened', !this.opened);
  }

  _clearData() {
    this.set('monthInput', '01');
    this.set('dayInput', '01');
    this.set('yearInput', '1970');
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

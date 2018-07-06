'use strict';
import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import '@polymer/paper-dropdown-menu/paper-dropdown-menu.js';
import '@polymer/paper-input/paper-input.js';
import './calendar-lite.js';

/**
 * @customElement
 * @polymer
 */
class DatePickerLite extends PolymerElement {
  static get template() {
    return html`
      <style>
        paper-dropdown-menu {
          width: 100%;
        }
        *[hidden] {
          display: none;
        }
      </style>

      <paper-dropdown-menu id="ddMenu" label="[[label]]" value="[[readableDate]]" hidden$="[[readonly]]">
        <calendar-lite slot="dropdown-content" on-date-change="datePicked">
        </calendar-lite>
      </paper-dropdown-menu>

      <paper-input type="text" label="[[label]]" readonly value="[[readableDate]]" hidden$="[[!readonly]]"></paper-input>
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
      label: String
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
    this.set('date', event.detail.date);
  }

  dateChanged() {
    this.$.ddMenu.opened = false;
    this.readableDate = this.date.toDateString();

    this.dateJustChanged = true;
    this.value = this._getDateString(this.date);
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

/*
Copyright (C) 2014 Felix Gladisch

Notify Awesome is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

Notify Awesome is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/

/*jslint browser: true, vars: true, forin: true*/
/*globals window, console, $*/

(function (global) {
  'use strict';
  
  global.notify = global.notify || {};
  
  var notify = global.notify;
  
  var updateInterval = 500;
  var nextId = 0;
  
  function remove(id) {
    $('#notification-' + id).fadeOut('slow', function () {
      this.remove();
    });
  }
  
  function update() {
    $('.notification').each(function (index, value) {
      var data = $(this).data('notification');
      var time = Math.floor((new Date()).getTime() - data.time);
      if (time > (data.duration * 1000)) {
        remove(data.id);
      }
    });
  }
  
  function generateHtml(id, faIcon, message) {
    var icon = '<i class="fa fa-' + faIcon + ' fa-fw"></i>';
    var html = '<div id="notification-'
      + id + '" class="notification"><div class="notification-logo">'
      + icon + '</div><div class="notification-text">'
      + message + '</div></div>';
    return html;
  }
  
  function generateNotification(id, html, duration) {
    $(html).prependTo('#notification-area').click(function () {
      var data = $(this).data('notification');
      remove(data.id);
    }).hover(function () {
      $(this).fadeTo('fast', 0.5);
      console.log(typeof this);
    }, function () {
      $(this).fadeTo('fast', 0.75);
      console.log(typeof this);
    }).data('notification', {
      'id' : id,
      'time': (new Date()).getTime(),
      'duration' : duration
    }).fadeTo('fast', 0.75);
  }
  
  notify.generic = function (message, duration) {
    var html = generateHtml(nextId, 'info-circle', message);
    generateNotification(nextId, html, duration);
    nextId += 1;
  };

  notify.custom = function (message, duration, faIcon) {
    var html = generateHtml(nextId, faIcon, message);
    generateNotification(nextId, html, duration);
    nextId += 1;
  };
  
  $(document).ready(function () {
    setInterval(update, updateInterval);
  });

}(this));

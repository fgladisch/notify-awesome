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
  
  var updateInterval = 200;
  var nextId = 0;
  
  function remove(id) {
    $('#notification-' + id).animate({
      'opacity' : '0',
      'right' : '-=25'
    }, 500, function () {
      $(this).remove();
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
  
  function generateNotification(message, duration, faIcon) {
    var icon = '<i class="fa fa-' + faIcon + ' fa-fw"></i>';
    var html = '<div id="notification-'
      + nextId + '" class="notification"><div class="notification-logo">'
      + icon + '</div><div class="notification-text">'
      + message + '</div></div>';
    var element = $(html).prependTo('#notification-area').click(function () {
      var data = $(this).data('notification');
      remove(data.id);
    }).hover(function () {
      $(this).fadeTo('fast', 0.5);
    }, function () {
      $(this).fadeTo('fast', 0.75);
    }).data('notification', {
      'id' : nextId,
      'time': (new Date()).getTime(),
      'duration' : duration
    }).animate({
      'opacity' : '0.75',
      'right' : '+=25'
    }, 500);
    nextId += 1;
    return element;
  }
  
  notify.generic = function (message, duration) {
    var element = generateNotification(message, duration, 'info-circle');
    return element;
  };

  notify.custom = function (message, duration, faIcon) {
    var element = generateNotification(message, duration, faIcon);
    return element;
  };
  
  $(document).ready(function () {
    setInterval(update, updateInterval);
  });

}(this));

/*
Copyright (C) 2014 Felix Gladisch

notify.js is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

notify.js is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/

var notificationId = 0;
var notificationResource = {};

$(document).ready( function() {
  setInterval(update, 500);
});

function Notification(element, duration) {
  this.initTime = (new Date).getTime();
  this.element = element;
  this.duration = duration * 1000;
}

function notify(message, duration, faIcon) {
  var icon = '<i class="fa fa-' + faIcon + '"></i>';
  var html = '<div id="notification-'
    + notificationId + '" class="notification"><div class="notification-logo">'
    + icon + '</div><div class="notification-text">'
    + message + '</div></div>';
  $('#notification-area').prepend(html);
  var element = $('#notification-' + notificationId);
  notificationResource[notificationId] = new Notification(element, duration);
  notificationResource[notificationId].element.click(function() {
    var elementId = parseInt($(this).attr('id').split('-')[1]);
    removeNotification(elementId);
  }).hover(function() {
    element.fadeTo('fast', 0.5);
  }, function() {
    element.fadeTo('fast', 0.75);
  });
  element.fadeTo('fast', 0.75);
  notificationId += 1;
}

function update() {
  for ( var key in notificationResource) {
    var notification = notificationResource[key];
    var time = Math.floor((new Date).getTime() - notification.initTime);
    if (time > notification.duration) {
      removeNotification(key);
    }
  }
}

function removeNotification(id) {
  var notification = notificationResource[id];
  notification.element.fadeOut('slow', function() {
    notification.element.remove();
    delete notificationResource[id];
  })
}

Notify Awesome
=========

A lightweight notification system, powered by Font Awesome and jQuery.

## Requirements

* [jQuery](http://jquery.com)
* [Font Awesome](http://fontawesome.io)

## Bower

```sh
$ bower install notify-awesome
```

## Example

![Example](examples/example1.jpg?raw=true "Example")

## Usage

Include notify.js and notify.css in your HTML file like this:

```html
<!DOCTYPE html>
<html>
  <head>
    <link href="notify.css" rel="stylesheet" />
    <script src="notify.js"></script>
  </head>
  <body>...</body>
<html>
```
Now put a div with the id "notification-area" anywhere in the body-tag:

```html
<!DOCTYPE html>
<html>
  <head>...</head>
  <body>
    <div id="notification-area"></div>
  </body>
<html>
```

Notifications will be displayed in the top-right corner. You can change that by altering the CSS properties for "#notification-area".

A notification can be produced with the following code:

```javascript
var message = '<p><b>Public Service Announcement</b></p><p>Never turn to the Dark Side!</p>';
var seconds = 5;
var icon = 'rebel';

Notify(message, seconds, icon);
```
As you can see, notify.js uses [Font Awesome identifiers](http://fortawesome.github.io/Font-Awesome/icons) (minus the fa-* prefix) for icons.

The result will be:

![Example](examples/example2.jpg?raw=true "Example")

Only the message parameter is required. This works too:

```javascript
Notify('Hello World!');
```

That's it! Have fun! :-)

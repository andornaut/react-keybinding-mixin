react-keybinding-mixin
====================================

A [ReactJS][react] mixin that enables components to bind callbacks to keyboard events.

## Install

```
npm install react-keybinding-mixin --save
```

## Instructions

```
var KeybindingMixin = require('react-keybinding-mixin');

module.exports = React.createClass({
    mixins: [KeybindingMixin],

    componentDidMount: function() {
        this.onKey('f', function(event) {
            // Handle keyboard event.
        });

        this.onKey(this.KEYS.UP, function(event) {
            // Handle keyboard event.
        }, { ctrl: true, shift: true });
    }
}
```

## Keybinding

The ``options`` argument to ``onKey()`` may contain booleans which describe the 
modifier keys to which the key-binding should apply. Additionally, if 
``options.input`` is true, then the supplied callback will be invoked even if 
the ``keydown`` event is triggered on an input field or button.

The ``this.KEYS`` map is also available to make it easier to bind certain key combinations as in the example above. 
```
DEFAULT_OPTIONS = {
    alt: false,
    ctrl: false,
    meta: false,
    shift: false,
    input: false
};

KEYS = {
    BACKSPACE: 8,
    TAB: 9,
    ENTER: 13,
    CAPS_LOCK: 20,
    ESC: 27,
    SPACE: 32,
    PAGE_UP: 33,
    PAGE_DOWN: 34,
    END: 35,
    HOME: 36,
    LEFT: 37,
    RIGHT: 39,
    UP: 38,
    DOWN: 40,
    INSERT: 45,
    DEL: 46,
    FORWARD_SLASH: 191,
    BACKSLASH: 222
};
```

The [event][react-event] object is passed to the callback function. You can use 
this to, among other things, prevent the default action from being triggered by 
calling ``event.preventDefault()``.

## Contributing

Contributions of any sort are welcome.

## License

[MIT][license].

[license]: /LICENSE
[react]: https://facebook.github.io/react/
[react-event]: https://facebook.github.io/react/docs/events.html#keyboard-events
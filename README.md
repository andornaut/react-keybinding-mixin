react-keybinding-mixin
====================================

A ReactJS mixin that enables components to bind callbacks to keyboard events.

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

```

## Contributing

Contributions of any sort are welcome.

## License

[MIT][license].

[license]: /LICENSE

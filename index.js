/**
 * A ReactJS mixin that enables components to bind callbacks keyboard events.
 */

var assign = require('react/lib/Object.assign');
var EventListener = require('react/lib/EventListener');
var SyntheticKeyboardEvent = require('react/lib/SyntheticKeyboardEvent');

var DEFAULT_OPTIONS = {
    alt: false,
    ctrl: false,
    meta: false,
    shift: false,
    input: false
};

var EVENT_TYPE = 'keydown';

var components = [];
var listener;

function isInputEvent(event) {
    var tagName = event.target.tagName;

    return (tagName == 'BUTTON'
        || tagName == 'INPUT'
        || tagName == 'SELECT'
        || tagName == 'TEXTAREA');
}

function dispatchEvent(event) {
    event = SyntheticKeyboardEvent.getPooled({}, 'KeyboardMixin', event);
    try {
        dispatchCallbacks(event);
    } finally {
        if (!event.isPersistent()) {
            event.constructor.release(event);
        }
    }
}

function dispatchCallbacks(event) {
    var bindings;
    var binding;
    var options;
    var i = 0;
    var j = 0;

    for (; i < components.length; i++) {
        bindings = components[i].keyBindings[event.keyCode];
        if (bindings) {
            for (; j < bindings.length; j++) {
                binding = bindings[j];
                options = binding.options;
                if (event.altKey == options.alt
                    && event.ctrlKey == options.ctrl
                    && event.metaKey == options.meta
                    && event.shiftKey == options.shift
                    && (options.input || !isInputEvent(event))) {
                    binding.callback(event);
                }
            }
        }
    }
}

module.exports = {

    /**
     * Convenience mapping of key name to event.keyCode.
     *
     * @type {Object}
     */
    KEYS: {
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
    },

    /**
     * Register for keyboard events.
     */
    componentDidMount: function() {
        // The first component to be mounted installs the event listener.
        if (!listener) {
            listener = EventListener.listen(document, EVENT_TYPE, dispatchEvent);
        }
        this.keyBindings = {};
        components.push(this);
    },

    /**
     * Un-register for keyboard events.
     */
    componentWillUnmount: function() {
        components.splice(components.indexOf(this), 1);

        // The last component to be unmounted removes the event listener.
        if (!components.length) {
            listener.remove();
            listener = null;
        }
    },

    /**
     * Bind a callback to the keydown event for a particular key.
     *
     * The options argument may contain booleans which describe the modifier
     * keys to which the key-binding should apply. If options.input is true,
     * then the supplied callback will be invoked even if the keydown event
     * is triggered on an input field or button.
     *
     * @param {!number|!string} key - A keyCode or single lowercase character.
     *  Set options.shift = true for uppercase.
     * @param {!function} callback
     * @param {{alt: boolean, ctrl: boolean, meta: boolean, shift: boolean,
     *  input: boolean}} options
     */
    onKey: function(key, callback, options) {
        var binding;

        key = key.charCodeAt ? key.toUpperCase().charCodeAt() : key;
        options = assign({}, DEFAULT_OPTIONS, options || {});
        binding = { callback: callback, options: options };

        if (!this.keyBindings[key]) {
            this.keyBindings[key] = [binding];
        } else {
            this.keyBindings[key].push(binding);
        }
    }
};
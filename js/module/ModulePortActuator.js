// const PIN_MODES = ['output', 'analog', 'input', 'input_pullup', 'input_pulldown', 'opendrain', 'af_output', 'af_opendrain', 'auto'];
const OUTPUT_PIN_MODES = ['output', 'analog', 'opendrain', 'af_output', 'af_opendrain', 'auto'];

/**
 * @class
 * Определяет основной функционал порта-актуатора и представляет каждый переданный порт в виде исполнительного канала.
 * Не используется в прикладных целях.
 */
class ClassPortActuator extends ClassActuator {
    constructor(opts) {
        ClassActuator.call(this, opts);

        if (opts.pinModes) {
            for (let i = 0; i < this._QuantityChannel;i++) 
                this.Configure(i, { mode: opts.pinModes[i] });
        }
    }
    On(_chNum, _val, _opts) {
        let opts = _opts || {};
        let curr_mode = this._Pins[_chNum].getMode();
        if (! (OUTPUT_PIN_MODES.includes(curr_mode) || opts.force)) return false;
        let val = E.clip(_val, 0, 1);

        this.Write(this._Pins[_chNum], val, opts);
        this._ChStatus[_chNum] = Math.round(val);
        return true;
    }
    Off(_chNum) {
        if (!this._Pins[_chNum]) return false;

        this.Write(this._Pins[_chNum], 0);
        this._ChStatus[_chNum] = 0;
        return true;
    }

    Write(_pin, _val, _opts) {
        print(arguments);
        if (this._TypeInSignals[this._Pins.indexOf(_pin)] == 'analog')
            analogWrite(_pin, _val, _opts);
        
        else digitalWrite(_pin, _val);
    }

    Configure(_chNum, _opts) {
        if (!OUTPUT_PIN_MODES.includes(_opts.mode))
            return false;
        this._Pins[_chNum].mode(_opts.mode); 
        return true;
    }
    GetInfo(_chNum) {
        return Object.assign(this._Pins[_chNum].getInfo(), { mode: this._Pins[_chNum].getMode() }); 
    }
}

exports = ClassPortActuator;
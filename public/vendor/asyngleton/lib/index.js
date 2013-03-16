define(["require", "/vendor/events/index.js"], function(require) {

    var __dirname = "/vendor/asyngleton/lib",
    __filename    = "/vendor/asyngleton/lib/index.js",
    module        = { exports: {} },
    exports       = module.exports,
    define        = undefined,
    window        = exports;

    

    var EventEmitter = require("/vendor/events/index.js").EventEmitter;

var singletonIndex = 0;

/**
 */

function singleton(fn) {

	var _id = singletonIndex++;

	var asyngleton = function() {

		var asyng = asyngleton.info.call(this);


		var args, cb, callback = arguments[arguments.length - 1];

		if(!(typeof callback == "function")) {
			callback = function(){ };
		}

		//result already set? return the value
		if(asyng.result) {
			callback.apply(this, asyng.result);
			return this;
		}


		asyng.em.once("singleton", callback);

		//still loading? add listener to event emitter
		if(asyng.loading) {
			return this;
		}

		asyng.loading = true;

		args = Array.prototype.slice.call(arguments, 0);
		cb = function() {
			asyng.result = Array.prototype.slice.call(arguments, 0);
			asyng.em.emit.apply(asyng.em, ["singleton"].concat(asyng.result));
		};


		//remove the callback
		args.pop();

		//and replace it.
		args.push(cb);

		//returned a value? Then it's not async...
		fn.apply(this, args);

		return this;
	};


	asyngleton.reset = function() {

		var asyng = asyngleton.info.call(this);

		asyng.loading = false;
		asyng.result  = undefined;

		return asyngleton;
	};


	asyngleton.info = function() {
		if(!this._asyngleton) {
			this._asyngleton = {
			};
		}


		var asyng;

		if(!(asyng = this._asyngleton[_id])) {
			asyng = this._asyngleton[_id] = {
				result: null,
				loading: false,
				em: new EventEmitter()
			}
		}

		return asyng;
	}

	return asyngleton;
}
/**
 */

function createDictionary() {

	var _dict = {};

	return {
		get: function(key, fn) {
			if(_dict[key]) return _dict[key];

			var asyngleton = _dict[key] = singleton(fn);

			asyngleton.dispose = function() {
				delete _dict[key];
			}

			return asyngleton;
		}
	}
}

/**
 */

function structrFactory(that, property, value) {

	return singleton(value);
}

/**
 */


module.exports            = singleton;
module.exports.dictionary = createDictionary;


//for structr
module.exports.type       = "operator";
module.exports.factory    = structrFactory;

    return module.exports;
});
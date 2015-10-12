"use strict";
var UTIL = (function() {
	var util = {};
	util.storedData = {};

	// localStorageSupport function()
	// Determines if the browser supports local storage
	util.localStorageSupport = function () {
		if (typeof (Storage) !== "undefined") {
			return true;
		} else {
			return false;
		}
	};
    
    // storageList function()
    // Returns a list of the localStorage keys.
    util.storageList = function () {
		if (util.localStorageSupport()) {
			return _.keys(localStorage);
		}
	};

	// setStorageItem function(key:String, value:Object|Array|String|Number)
	// Populates the local storage with a property name (key) and defines it (value - convertred to string)
	util.setStorageItem = function (key, value) {
		if (util.localStorageSupport()) {
			util.storedData[key] = value;
			if (typeof value === "object" || typeof value === "array") {
				localStorage.setItem(key, JSON.stringify(value));
			} else {
				localStorage.setItem(key, value);
			}
		} else {
			if(BROWSER.isMSIE() == false) {
                console.error("Local Storage NOT supported");
            }
		}
	};

	// getStorageItem function(key:String)
	// Returns the value of a local storage property or returns null if no storage item matches key
	util.getStorageItem = function (key) {
		if (util.localStorageSupport()) {
			var temp = localStorage.getItem(key);
			if (util.isJSON(temp)) {
				return JSON.parse(temp);
			} else {
				return temp;
			}
		} else {
			if(BROWSER.isMSIE() == false) {
                console.error("Local Storage NOT supported");
            }
		}
	};

	// removeStorageItem function(key:String)
	// Deletes the localstorage propery matching key
	util.removeStorageItem = function (key) {
		if (util.localStorageSupport()) {
			localStorage.removeItem(key);
		} else {
			if(BROWSER.isMSIE() == false) {
                console.error("Local Storage NOT supported");
            }
		}
	};
    
    // haveSameValue function(array1:Array, array2:Array)
    // Returns ture|false if two arrays contain the same value
    util.haveSameValue = function(array1, array2) {
        var sameValue = false;
        for(var i = 0; i < array1.length; i++) {
            for(var j = 0; j < array2.length; j++) {
                if(array1[i] === array2[j]) {
                    sameValue = true;
                    break;
                }
            }
        }
        return sameValue;
    };
    
    // isJSON (string:String)
    // Returns true|false if a string can be parsed as JSON
	util.isJSON = function(str) {
		try { 
			JSON.parse(str);
		} catch (e) {
			return false;
		}
		return true;
	};

	return util;
}());

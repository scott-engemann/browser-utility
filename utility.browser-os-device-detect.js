var BROWSER = (function () {
     "use strict";
     var device = {};
     var browser = {};
     browser.navigatorObject = navigator;
     browser.system = {};

     browser.system.operatingSystem = function () {
          var temp = browser.navigatorObject.platform.toLowerCase();
          if (temp.indexOf('mac') > -1) {
               device.platform = 'Mac OS';
          } else if (temp.indexOf('win') > -1) {
               var windowTemp = browser.navigatorObject.userAgent.toLowerCase();
               if (windowTemp.indexOf('windows nt 6.1') > -1) {
                    device.platform = 'Microsoft Windows 7';
               } else if (windowTemp.indexOf('windows nt 6.2') > -1) {
                    device.platform = 'Microsoft Windows 8';
               } else if (windowTemp.indexOf('windows nt 6.3') > -1) {
                    device.platform = 'Microsft Windows 8.1';
               }
          } else if (temp.indexOf('linux') > -1) {
               if (browser.system.platform().toLowerCase().indexOf('android') > -1) {
                    device.platform = "Android";
               } else {
                    device.platform  = "Linux";
               }
          } else if (temp.indexOf('android') > -1) {
               device.platform = 'Android';
          } else if (temp.indexOf('iphone') > -1 || temp.indexOf('ipad') > -1 || temp.indexOf('ipod') > -1) {
               device.platform = 'iOS';
          }
          return device.platform;
     };

     browser.system.platform = function() {
          var temp = browser.navigatorObject.appVersion.toLowerCase();
          if (temp.indexOf('android') > -1) {
               device.type = 'Android';
               device.isMobile = true;
          } else if (temp.indexOf('cros') > -1) {
               device.type = 'Chrome Book';
               device.isMobile = false;
          } else if (temp.indexOf('windows nt 6.1') > -1 || temp.indexOf('windows nt 6.2') > -1 || temp.indexOf('windows') > -1) {
               if (temp.indexOf('touch') > -1) { // On touch enabled devices that are running Windows 8 will include a 'Touch' flag in the userAgent string
                    device.type = 'Windows Tablet';
                    device.isMobile = true;
               } else {
                    device.type = 'Windows PC';
                    device.isMobile = false;
               }
          } else if (temp.indexOf('windows phone') > -1) {
               device.type = 'Windows Phone';
               device.isMobile = true;
          } else if (temp.indexOf('iphone') > -1) {
               device.type = 'iPhone';
               device.isMobile = true;
          } else if (temp.indexOf('ipad') > -1) {
               device.type = 'iPad';
               device.isMobile = true;
          } else if (temp.indexOf('ipod') > -1) {
               device.type = 'iPod';
               device.isMobile = true;
          } else if (temp.indexOf('mac') > -1) {
               device.type = 'Macintosh';
          device.isMobile = false;
          }
          return device.type;
     };

     browser.system.resolution = function() {
          device.resolution = {};
          device.resolution.width = screen.width;
          device.resolution.height = screen.height;
          return device.resolution;
     };

	browser.name = function () {
		var temp = browser.navigatorObject.userAgent.toLowerCase();
		if (temp.indexOf('trident') > -1) {
			device.browser = 'Microsoft Internet Explorer';
		} else if (temp.indexOf('chrome') > -1) {
			device.browser = 'Google Chrome';
		} else if (temp.indexOf('firefox') > -1) {
			device.browser = 'Mozilla FireFox';
		} else if (temp.indexOf('opera') > -1) {
			device.browser = 'Opera';
		} else /*if(temp.indexOf('apple safari') > -1)*/ {
			device.browser = 'Apple Safari';
		}
		return device.browser;
	};

	browser.versionNumber = function () {
	    var temp = browser.navigatorObject.userAgent,tem,M = temp.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
	    if (/trident/i.test(M[1])){
	        tem=/\brv[ :]+(\d+)/g.exec(temp) || [];
	        device.versionNumber = (tem[1]||'');
	    }
	    if(M[1]==='Chrome'){
	        tem=temp.match(/\bOPR\/(\d+)/);
	        if(tem!=null)   {
	        	device.versionNumber = tem[1];
	        }
	    }   
	    M=M[2]? [M[1], M[2]]: [browser.navigatorObject.appName, browser.navigatorObject.appVersion, '-?'];
	    if((tem=temp.match(/version\/(\d+)/i))!=null) {
	    	M.splice(1,1,tem[1]);
	    }
        if(device.versionNumber == undefined) {
            device.versionNumber = M[1];
        }
	    return device.versionNumber;
	};

	browser.isWebKit = function() {
		var temp = browser.navigatorObject.userAgent.toLowerCase();
		if(temp.indexOf('webkit') > -1) {
            device.isWebKit = true;
		} else {
            device.isWebKit = false;
		}
        return device.isWebKit;
	};

	browser.isMSIE = function() {
        if(device.browser == undefined) {
            browser.name();
        }
		if(device.browser == 'Microsoft Internet Explorer') {
			return true;
		} else {
			return false;
		}
	};
    
    browser.isCompatibilityEnabled = function() {
        if(browser.isMSIE()) {
            if(browser.system.operatingSystem() == 'Microsoft Windows 7') {
                if(browser.versionNumber() < 8) {
                    return true;
                } else {
                    return false;
                }
            } else if (browser.system.operatingSystem() == 'Microsoft Windows 8') {
                if(browser.versionNumber() < 11) {
                    return true;
                } else {
                    return false;
                }
            } else {
                return false;
            }
        } else {
            return null;
        }
    };

	browser.isChrome = function() {
        if(device.browser == undefined) {
            browser.name();
        }
		if(device.browser == 'Google Chrome') {
			return true;
		} else {
			return false;
		}
	};

	browser.isFireFox = function() {
        if(device.browser == undefined) {
            browser.name();
        } else if(device.browser == 'Mozilla FireFox') {
			return true;
		} else {
			return false;
		}
	};

	browser.isSafari = function() {
        if(device.browser == undefined) {
            browser.name();
        } else if(device.browser == 'Apple Safari') {
			return true;
		} else {
			return false;
		}
	};

	browser.isOpera = function() {
        if(device.browser == undefined) {
            browser.name();
        } else if(device.browser == 'Opera') {
			return true;
		} else {
			return false;
		}
	};

    browser.isMobile = function() {
        if(device.isMobile == undefined) {
            browser.system.platform();
        }
        return device.isMobile;
    };
    
    var os = browser.system.operatingSystem();
    var platform = browser.system.platform();
    var name = browser.name();
    var versionNumber = browser.versionNumber();
    var resolution = browser.system.resolution();

	return browser;

}());

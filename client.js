
var client = function(){

    //rendering engines
    var engine = {
        ie: 0,
        gecko: 0,
        webkit: 0,
        khtml: 0,
        opera: 0,
        type : null,
        //complete version
        ver: null  
    };
    
    //browsers
    var browser = {
        //browsers
        ie: 0,
        firefox: 0,
        safari: 0,
        konq: 0,
        opera: 0,
        chrome: 0,
        type:null,
        //specific version
        ver: null
    };

    
    //platform/device/OS
    var system = {
        win: false,
        mac: false,
        x11: false,
        
        winPhone : false,
        winMobile: false,
        iphone: false,
        ipod: false,
        ipad: false,
        ios: false,
        android: false,
        nokiaN: false,
        type: null
    };    

    //detect rendering engines/browsers
    var ua = navigator.userAgent;
    //opera   
    if (window.opera){
        engine.opera = browser.opera =window.opera.version();
        browser.type = "opera";
        engine.type  = "opera";
    } else if (/AppleWebKit\/(\S+)/.test(ua)){
        engine.type   = "webkit" ;
        engine.webkit = RegExp["$1"];
        
        //figure out if it's Chrome or Safari
        if(/OPR\/(\S+)/.test(ua)){//首先排除opera。由于在新版本中使用了webkit内核
            browser.type   = "opera";
            browser.opera = RegExp["$1"];
        }else if (/Chrome\/(\S+)/.test(ua)){
            browser.type   = "chrome";
            browser.chrome = RegExp["$1"];
        } else if (/Version\/(\S+)/.test(ua)){
            browser.type   = "safari";
            browser.safari = RegExp["$1"];
        } else {
            //approximate version
            var safariVersion = 1;
            if (engine.webkit < 100){
                safariVersion = 1;
            } else if (engine.webkit < 312){
                safariVersion = 1.2;
            } else if (engine.webkit < 412){
                safariVersion = 1.3;
            } else {
                safariVersion = 2;
            }   
            browser.type   = "safari";
            browser.safari  = safariVersion;        
        }
    } else if (/KHTML\/(\S+)/.test(ua) || /Konqueror\/([^;]+)/.test(ua)){
        engine.type = "khtml";
        engine.khtml = browser.konq = RegExp["$1"];
    } else if (/rv:([^\)]+)\) Gecko\/(\d{8}|\S+)/.test(ua)){// 添加了手机火狐不是8位数字的支持
        engine.type = "gecko"; 
        engine.gecko = RegExp["$1"];
        
        //determine if it's Firefox
        if (/Firefox\/(\S+)/.test(ua)){
            browser.type = "firefox";
            browser.firefox = RegExp["$1"];
        }
    } else if (/MSIE ([^;]+)/.test(ua)){    
        //engine.ver = browser.ver = RegExp["$1"]; browser.ver =
        engine.type = browser.type = "ie";
        engine.ie = browser.ie = RegExp["$1"];
    } else if( /Trident\/([^;]+)/.test(ua) ){//ie11
        if(/rv:([^\)]+)\)/.test(ua)){
            engine.type = browser.type = "ie";
            engine.ie = browser.ie = RegExp["$1"];
        }
    }

    //detect platform
    var p = navigator.platform;
    if(system.win = p.indexOf("Win") == 0){
        system.type = "win";
         //detect windows operating systems
        if (/Win(?:dows )?([^do]{2})\s?(\d+\.\d+)?/.test(ua)){
            if (RegExp["$1"] == "NT"){
                switch(RegExp["$2"]){
                    case "5.0":
                        system.win = "2000";
                        break;
                    case "5.1":
                        system.win = "XP";
                        break;
                    case "6.0":
                        system.win = "Vista";
                        break;
                    case "6.1":
                        system.win = "7";
                        break;
                    case "6.2":
                        system.win = "8";
                        break;
                    case "6.3":
                        system.win = "8.1";
                        break;
                    default:
                        system.win = "NT";
                        break;                
                }                            
            } else if (RegExp["$1"] == "9x"){
                system.win = "ME";
            } else if (RegExp["$1"] == "Ph"){//windows phone 7.5 and 8.0
                system.type = "winPhone";
                if(/Windows Phone OS (\d+.\d+)/.test(ua) || /Windows Phone (\d+.\d+)/.test(ua)){
                    system.winPhone = RegExp["$1"] ;
                }
            }else {
                system.win = RegExp["$1"];
            }
        }

        //windows mobile
        if (system.win == "CE"){
            system.winMobile = system.win;
        } else if (system.win == "Ph"){
            if(/Windows Phone OS (\d+.\d+)/.test(ua)){;
                system.type = "winMobile";
                system.winMobile = RegExp["$1"];
            }
        }
    }else if(system.x11 = (p == "X11") || (p.indexOf("Linux") == 0)){
        system.type = "x11";
        //determine Android version
        if (/Android (\d+\.\d+)/.test(ua)){
            system.type = "android";
            system.android = RegExp.$1;
        }
    }else if( system.mac = p.indexOf("Mac") == 0){
        system.type = "mac";
        //mobile devices
        if(system.iphone = ua.indexOf("iPhone") > -1) {
            system.type = "iphone";   
        }else if(system.ipod = ua.indexOf("iPod") > -1){
            system.type = "ipod";  
        }else if(system.ipad = ua.indexOf("iPad") > -1){
             system.type = "ipad"; 
        }

        //determine iOS version
        if (system.mac && ua.indexOf("Mobile") > -1){
            if (/CPU (?:iPhone )?OS (\d+_\d+)/.test(ua)){
                system.ios = parseFloat(RegExp.$1.replace("_", "."));
            } else {
                system.ios = 2;  //can't really detect - so guess
            }
        }
    }
    
    //处理一些特别的情况
    if(system.nokiaN = ua.indexOf("NokiaN") > -1){
        system.type = "nokiaN" ;
    }else if(/Android; Mobile/.test(ua)){//安卓上火狐浏览器
        system.type = "android";
        system.android = "Not detect" ;
    }
    

    //return it
    return {
        engine:     engine,
        browser:    browser,
        system:     system        
    };

}();

/*
 * 浏览器检测js代码，兼容各大主流浏览器
 */
var BrowserMatch = {
  init: function () {
    this.browser = this.getBrowser().browser || "An Unknown Browser"; // 获取浏览器名
    this.version = this.getBrowser().version || "An Unknown Version"; // 获取浏览器版本
    this.OS = this.getOS() || "An Unknown OS"; // 获取所处操作系统
  },
  getOS: function () {
    if (navigator.platform.indexOf("Win") != -1) return "Windows";
    if (navigator.platform.indexOf("Mac") != -1) return "Mac";
    if (navigator.platform.indexOf("Linux") != -1) return "Linux";
    if (navigator.userAgent.indexOf("iPhone") != -1) return "iPhone/iPod";
  },
  getBrowser: function () {
    var rMsie = /(msie\s|trident\/7)([\w\.]+)/;
    var rTrident = /(trident)\/([\w.]+)/;
    var rFirefox = /(firefox)\/([\w.]+)/;
    var rOpera = /(opera).+version\/([\w.]+)/;
    var rNewOpera = /(opr)\/(.+)/;
    var rChrome = /(chrome)\/([\w.]+)/;
    var rSafari = /version\/([\w.]+).*(safari)/;
    var ua = navigator.userAgent.toLowerCase();
    var matchBS, matchBS2;
    matchBS = rMsie.exec(ua);
    if (matchBS != null) {
      matchBS2 = rTrident.exec(ua);
      if (matchBS2 != null) {
        switch (matchBS2[2]) {
          case "4.0":
            return {
              browser: "IE", version: "8"
            };
            break;
          case "5.0":
            return {
              browser: "IE", version: "9"
            };
            break;
          case "6.0":
            return {
              browser: "IE", version: "10"
            };
            break;
          case "7.0":
            return {
              browser: "IE", version: "11"
            };
            break;
          default:
            return {
              browser: "IE", version: "Undefined"
            };
        }
      } else {
        return {
          browser: "IE",
          version: matchBS[2] || "0"
        };
      }
    }
    matchBS = rFirefox.exec(ua);
    if ((matchBS != null) && (!(window.attachEvent)) && (!(window.chrome)) && (!(window.opera))) {
      return {
        browser: matchBS[1] || "",
        version: matchBS[2] || "0"
      };
    }
    matchBS = rOpera.exec(ua);
    if ((matchBS != null) && (!(window.attachEvent))) {
      return {
        browser: matchBS[1] || "",
        version: matchBS[2] || "0"
      };
    }
    matchBS = rChrome.exec(ua);
    if ((matchBS != null) && (!!(window.chrome)) && (!(window.attachEvent))) {
      matchBS2 = rNewOpera.exec(ua);
      if (matchBS2 == null) {
        return {
          browser: matchBS[1] || "",
          version: matchBS[2] || "0"
        };
      } else {
        return {
          browser: "Opera",
          version: matchBS2[2] || "0"
        };
      }
    }
    matchBS = rSafari.exec(ua);
    if ((matchBS != null) && (!(window.attachEvent)) && (!(window.chrome)) && (!(window.opera))) {
      return {
        browser: matchBS[2] || "",
        version: matchBS[1] || "0"
      };
    }
  }
};
BrowserMatch.init();
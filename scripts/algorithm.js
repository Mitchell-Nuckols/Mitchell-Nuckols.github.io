var Algorithm = {
  _display: null,
  _currentScreen: null,
  _invert: false,
  _scale: 1,
  _width: 1560,
  _height: 1560,
  _rule: [],
  init: function () {
    this._display = new ROT.Display({width: this._width, height: this._height, fontSize: this._scale});
    this._currentScreen = Algorithm.screen;
    this._currentScreen.enter(this._rule);
    this._currentScreen.render(this._display, this._invert);
  },
  getDisplay: function () {
    return this._display;
  },
  getWidth: function () {
    return this._width;
  },
  getHeight: function () {
    return this._height;
  },
  getScale: function () {
    return this._scale;
  }
};

Algorithm.screen = {
  enter: function (rule) {
    var cells = new Array(Math.ceil(Algorithm.getWidth() / Algorithm.getScale()));
    cells[cells.length / 2] = 1;
    this._cellular = new Algorithm.CellularAutomata(cells, rule, Algorithm.getHeight());
  },
  render: function (display, invert) {
    this._cellular.generate(function (x, y, v) {
      display.draw(x, y, ' ', 'white', invert ? (v ? 'white' : 'black') : (v ? 'black' : 'white'));
    });
  }
}

$(document).ready(function () {
  if(!ROT.isSupported()) {
    alert("The ROT.js library is not supported by your browser!");
  }else {
    $("#rule").val($.urlParam("rule"));
    $("#range").val($.urlParam("scale"));
    $("#range_slider").val($.urlParam("scale"));

    $("#reverse").prop("checked", $.urlParam("reverse") == "true" ? true : false)

    if($.urlParam("rule") != undefined) {

        var rule = dec2bin(parseInt($.urlParam("rule")));

        if(rule.length < 8) {
            while(rule.length != 8) {
                rule = "0" + rule;
            }
        }

        Algorithm._rule = rule.split("");

        Algorithm._scale = parseInt($.urlParam("scale"));

        Algorithm._invert = ($.urlParam("reverse") == "true") ? true : false;

        for(var i = 0; i < 8; i++) {
            Algorithm._rule[i] = parseInt(Algorithm._rule[i]);
        }

        console.log("Rule: " + Algorithm._rule + " Invert: " + $.urlParam("reverse") + " Scale: " + Algorithm._scale);

        Algorithm.init();
        $("#content").append(Algorithm.getDisplay().getContainer());
    }
  }
});

$.urlParam = function(name){
    var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
    if (results==null){
       return null;
    }
    else{
       return decodeURI(results[1]) || 0;
    }
}

function dec2bin(dec){
    return (dec >>> 0).toString(2);
}

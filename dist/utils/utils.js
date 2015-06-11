System.register(['utils/math'], function (_export) {
  'use strict';

  var ColumnTotalWidth, requestAnimFrame;

  _export('ColumnsByPin', ColumnsByPin);

  _export('ColumnGroupWidths', ColumnGroupWidths);

  _export('DeepValueGetter', DeepValueGetter);

  /**
   * Returns the columns by pin.
   * @param {array} colsumns
   */

  function ColumnsByPin(cols) {
    var ret = {
      left: [],
      center: [],
      right: []
    };

    for (var i = 0, len = cols.length; i < len; i++) {
      var c = cols[i];
      if (c.frozenLeft) {
        ret.left.push(c);
      } else if (c.frozenRight) {
        ret.right.push(c);
      } else {
        ret.center.push(c);
      }
    }

    return ret;
  }

  /**
   * Returns the widths of all group sets of a column
   * @param {object} groups 
   * @param {array} all 
   */

  function ColumnGroupWidths(groups, all) {
    return {
      left: ColumnTotalWidth(groups.left),
      center: ColumnTotalWidth(groups.center),
      right: ColumnTotalWidth(groups.right),
      total: ColumnTotalWidth(all)
    };
  }

  /**
   * Returns a deep object given a string. zoo['animal.type']
   * @param {object} obj  
   * @param {string} path 
   */

  function DeepValueGetter(obj, path) {
    if (!obj || !path) return obj;

    var current = obj,
        split = path.split('.');

    if (split.length) {
      for (var i = 0, len = split.length; i < len; i++) {
        current = current[split[i]];
      }
    }

    return current;
  }

  return {
    setters: [function (_utilsMath) {
      ColumnTotalWidth = _utilsMath.ColumnTotalWidth;
    }],
    execute: function () {

      /**
       * Shim layer with setTimeout fallback
       * http://www.html5rocks.com/en/tutorials/speed/animations/
       */

      requestAnimFrame = (function () {
        return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function (callback) {
          window.setTimeout(callback, 1000 / 60);
        };
      })();

      _export('requestAnimFrame', requestAnimFrame);

      ;;
    }
  };
});
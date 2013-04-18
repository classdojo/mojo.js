// Generated by CoffeeScript 1.6.2
/*
this library is used over async.js since it doesn't use setImmediate, which causes a delay. Don't want that for rendering views
*/


(function() {
  define(function() {
    /*
    */

    var async;

    async = {
      /*
       Runs all items at the same time
      */

      forEach: function(items, each, next) {
        return async.eachLimit(items, -1, each, next);
      },
      /*
       Runs items sequentially
      */

      eachSeries: function(items, each, next) {
        return async.eachLimit(items, 1, each, next);
      },
      /*
       Allows for any number of items to be run in parallel
      */

      eachLimit: function(items, limit, each, next) {
        var called, currentIndex, err, finish, finished, nextItem, numRunning;

        numRunning = 0;
        currentIndex = 0;
        called = false;
        err = null;
        finished = false;
        finish = function() {
          if (finished || (numRunning && !err)) {
            return;
          }
          finished = true;
          return next(err);
        };
        nextItem = function() {
          var item;

          if ((currentIndex >= items.length) || err) {
            return finish();
          }
          numRunning++;
          item = items[currentIndex++];
          each(item, function(e) {
            err = e;
            numRunning--;
            return nextItem();
          });
          if (!~limit || numRunning < limit) {
            return nextItem();
          }
        };
        return nextItem();
      }
    };
    return async;
  });

}).call(this);
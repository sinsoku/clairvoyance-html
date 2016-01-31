require("../helper");
var fs = require("fs");

describe('HTML report', function() {
  it('write a html to coverage/index.html', function(done) {
    var result = {
      "test/integration/simple/app.css": [null, null, 1, 1, 1, null, 0, 0, 0],
      "test/integration/simple/button.css": [2, 2, null, 1, 1, null, 0, 0]
    };

    assert.doesNotThrow(function() { parse(result); });

    // FIXME:
    setTimeout(done, 1000);
  });
});

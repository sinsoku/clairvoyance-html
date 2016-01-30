var fs = require("fs"),
    crypto = require("crypto");

module.exports = CssFile;

function CssFile(abspath, coverage) {
  this.abspath = abspath;
  this.coverage = coverage;
  this.content = fs.readFileSync(this.abspath).toString();
}

CssFile.prototype.getId = function() {
  var md5 = crypto.createHash('md5');
  md5.update(this.abspath, 'utf8');
  return md5.digest('hex');
};

CssFile.prototype.getLines = function() {
  return this.content.split("\n").slice(0, -1).map(function(line, i) {
    return { no: i + 1, text: line };
  });
};

CssFile.prototype.getCovered = function() {
  var sum = this.coverage.filter(function(x) { return x !== null; }).length;
  var covered = this.coverage.filter(function(x) { return x > 0; }).length;
  return (covered / sum * 100).toFixed(2);
};

CssFile.prototype.getHit = function(no) {
  return this.coverage[no - 1];
};

CssFile.prototype.getStyle = function(no) {
  if (this.getHit(no) > 0) {
    return "success";
  } else if (this.getHit(no) == 0) {
    return "danger";
  } else {
    return null;
  }
};

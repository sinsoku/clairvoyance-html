var fs = require('fs'),
    path = require('path'),
    ECT = require("ect"),
    CssFile = require("./lib/cssfile");

module.exports = parse;

function parse(result) {
  var cssFiles = [];
  for (var key in result) {
    var css = new CssFile(key, result[key]);
    cssFiles.push(css);
  }

  fs.mkdir('coverage', function(err) {
    copyAssets();

    var renderer = ECT({ root : __dirname + '/templates' });
    var html = renderer.render('index.ect', {cssFiles: cssFiles});
    fs.writeFile("coverage/index.html", html);
  });
}

function copyAssets() {
  fs.mkdir('coverage/assets', function(err) {
    fs.mkdir('coverage/assets/stylesheets', function(err1) {
      cp('stylesheets/application.css');
      cp('stylesheets/bootstrap.min.css');
      cp('stylesheets/github.min.css');
      cp('stylesheets/jquery.dataTables.min.css');
    });
    fs.mkdir('coverage/assets/javascripts', function(err1) {
      cp('javascripts/application.js');
      cp('javascripts/bootstrap.min.js');
      cp('javascripts/highlight.min.js');
      cp('javascripts/jquery-2.2.0.min.js');
      cp('javascripts/jquery.dataTables.min.js');
    });
    fs.mkdir('coverage/assets/images', function(err1) {
      cp('images/sort_asc.png');
      cp('images/sort_asc_disabled.png');
      cp('images/sort_both.png');
      cp('images/sort_desc.png');
      cp('images/sort_desc_disabled.png');
    });
  });
}

function cp(src) {
  s = path.join(__dirname, 'assets', src);
  d = path.join('coverage/assets', src);
  fs.createReadStream(s).pipe(fs.createWriteStream(d));
}

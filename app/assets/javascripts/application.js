// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or any plugin's vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file. JavaScript code in this file should be added after the last require_* statement.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require bootstrap-sass/assets/javascripts/bootstrap-sprockets
//= require sweetalert/dist/sweetalert.min.js
//= require jquery-ujs
//= require react
//= require react_ujs
//= require human-format
//=  require js-routes
//= require components
//= require react_rails_img
//= require_tree .
$(document).ready(function(){
  $.ajaxSetup({
    headers: {
      'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content')
    }
  });
});

function LCS(a, b) {
  var m = a.length, n = b.length, C = [], i, j;
  for (i = 0; i <= m; i++) C.push([0]);
  for (j = 0; j < n; j++) C[0].push(0);
  for (i = 0; i < m; i++)
    for (j = 0; j < n; j++)
      C[i+1][j+1] = a[i] === b[j] ? C[i][j]+1 : Math.max(C[i+1][j], C[i][j+1]);
  return (function bt(i, j) {
    if (i*j === 0) { return ""; }
    if (a[i-1] === b[j-1]) { return bt(i-1, j-1) + a[i-1]; }
    return (C[i][j-1] > C[i-1][j]) ? bt(i, j-1) : bt(i-1, j);
  }(m, n));
}

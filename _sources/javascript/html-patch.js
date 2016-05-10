// Highlight current nav item
function levensthein(first, second) {
  if (first === second) return 0;

  var v0 = [];
  var v1 = [];

  for (var i = 0; i < second.length + 1; i++) {
    v0[i] = i;
  }

  for (var i = 0; i < first.length; i++) {
    // calculate v1 (current row distances) from the previous row v0
    v1[0] = i + 1;

    // use formula to fill in the rest of the row
    for (var j = 0; j < second.length; j++) {
      var cost = first[i] == second[j] ? 0 : 1;
      v1[j + 1] = Math.min(v1[j] + 1, v0[j + 1] + 1, v0[j] + cost);
    }

    // copy v1 (current row) to v0 (previous row) for next iteration
    for (var j = 0; j < v0.length; j++) {
      v0[j] = v1[j];
    }
  }

  return v1[second.length];
}

var firstTitle = $('.page-title-link').text().toUpperCase();
var links = $('#main-nav > li > .main-nav-list-link');

var bestLink = _(links.toArray()).min(function(link) {
  return levensthein(firstTitle, $(link).text().toUpperCase());
});
$(bestLink).addClass('current');

// Sidebar expend
$('#sidebar .sidebar-toggle').click(function() {
  if ($('#sidebar').hasClass('expend'))
    $('#sidebar').removeClass('expend');
  else
    $('#sidebar').addClass('expend');
});

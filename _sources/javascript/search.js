var postTemplate = _.template(
['<div class="article-row">',
' <article class="article article-summary full-width">',
'   <div class="article-summary-inner">',
'      <h2 class="article-title">',
'        <a href="<%= post.url %>" class="title"><%= post.title %></a>',
'      </h2>',
'      <p class="article-excerpt">',
'        <%= post.excerpt %>',
'      </p>',
'    </div>',
'  </article>',
'</div>'].join(''));

var search = function(posts) {

  var queryParams = (function(queries) {
    if (queries == "")
      return {};

    var params = {};
    for (var i = 0; i < queries.length; ++i) {
      var param = queries[i].split('=', 2);
      if (param.length == 1)
          params[param[0]] = "";
      else
          params[param[0]] = decodeURIComponent(param[1].replace(/\+/g, " "));
    }
    return params;
  })(window.location.search.substr(1).split('&'));

  var searched = queryParams['q'];
  $('.page-title-link').text('Search for "' + searched + '"');
  $('#search-form-wrap input').val(searched);

  var searchRegex = new RegExp(searched, 'i');
  _(posts)
  .filter(function (post) {
    var categoryMatch = _.any(post.categories, function (test) {
      return searchRegex.test(test)
    });
    return categoryMatch
      || post.excerpt.match(searchRegex)
      || post.title.match(searchRegex);
  })
  .forEach(function(match) {
      $('#search-results').append(postTemplate({post: match}));
  }).value();
}

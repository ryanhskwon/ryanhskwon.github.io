var providers = {
  twitter: {
    countUrl: 'http://opensharecount.com/count.json?url={url}&callback=?',
    postUrl: 'https://twitter.com/intent/tweet?url={url}&via=geowarin&text={title}',
    getCount: function(result) {
      return result && result.count;
    }
  },
  linkedIn: {
    countUrl: 'https://www.linkedin.com/countserv/count/share?format=jsonp&url={url}&callback=?',
    postUrl: 'http://www.linkedin.com/shareArticle?mini=true&url={url}&title={title}',
    getCount: function(result) {
      return result.count;
    }
  },
  facebook: {
    countUrl: 'https://graph.facebook.com/fql?q=SELECT%20url,%20normalized_url,%20share_count,%20like_count,%20comment_count,%20total_count,commentsbox_count,%20comments_fbid,%20click_count%20FROM%20link_stat%20WHERE%20url=%27{url}%27&callback=?',
    postUrl: 'http://www.facebook.com/sharer/sharer.php?u={url}&t={title}',
    getCount: function(result) {
      return result.data[0].share_count;
    }
  },
  google: {
    countUrl: null,
    postUrl: 'https://plus.google.com/share?&url={url}',
    getCount: function(result) {
      return '';
    }
  }
}

$('.article-share-links').each(function() {
  var $links = $(this);
  var articleUrl = $links.attr('data-url');
  var articleTitle = $links.attr('data-title');
  var encodedUrl = encodeURIComponent(articleUrl);

  var shareButtons = $links.find('a');
  $(shareButtons).each(function () {

      var $link = $(this);
      var linkProvider = $link.attr('data-provider');
      var provider = providers[linkProvider];

      if (provider) {

        if (provider.countUrl) {
          var url = provider.countUrl.replace('{url}', encodedUrl);
          $.getJSON(url, function(result) {
            var count = provider.getCount(result)
            $link.find('.count').text(count);
          });
        } else {
          var count = provider.getCount(null)
          $link.find('.count').text(count);
        }

        var href = provider.postUrl
          .replace('{url}', articleUrl)
          .replace('{title}', articleTitle);
        $link
          .attr('href', href)
          .on('click', function(e) {
            return !window.open(href, 'article-share-box-window-' + Date.now(), 'width=500,height=450');
          });
      }
  });
});

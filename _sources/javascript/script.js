// Nav bar toggle
$('#main-nav-toggle').on('click', function() {
  $('.nav-container-inner').slideToggle();
});

// anchors
anchors.options.visible = 'hover';
anchors.add('.article-inner h2');

// fast click
$(function() {
    FastClick.attach(document.body);
});

// Captions
$('.article-entry').each(function(i) {
  $(this).find('img').each(function() {
    if ($(this).parent().hasClass('fancybox')) return;

    var alt = this.alt;

    if (alt) $(this).after('<span class="caption">' + alt + '</span>');

    $(this).wrap('<a href="' + this.src + '" title="' + alt + '" class="fancybox"></a>');
  });

  $(this).find('.fancybox').each(function() {
    $(this).attr('rel', 'article' + i);
  });
});

if ($.fancybox) {
  $('.fancybox').fancybox();
}

//Back to top
$("#back-to-top").on('click', function() {
  $('body,html').animate({
    scrollTop: 0
  }, 600);
});

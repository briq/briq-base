(function ($) {
  $(document).on('click.collapse', '[data-toggle="collapse"]', function (e) {
    e.preventDefault();
    var selector = $(this).attr('href').split('#').pop();
    $('#' + selector).slideToggle();
    return false;
  });
})(jQuery);

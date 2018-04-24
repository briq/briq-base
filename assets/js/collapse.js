(function ($) {

  function getTargetSelector($toggle) {
    return $toggle.data('target') || ('#' + $toggle.attr('href').split('#').pop());
  }

  $(document).on('click.collapse', '[data-toggle="collapse"]', function (e) {
    e.preventDefault();
    var targetSelector = getTargetSelector($(this));
    $(targetSelector).toggleClass('c-collapse').find('input[type!="hidden"], textarea').focus();
    return false;
  });
})(jQuery);

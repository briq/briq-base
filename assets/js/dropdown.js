(function ($) {
  $(document).on('click.dropdown', function clearDropdowns(e) {
    $('.c-popover.open').removeClass('open');
  });

  $(document).on('click.dropdown', '[data-toggle="dropdown"]', function toggleDropdown(e) {
    e.preventDefault();
    var dropdownSelector = $(this).attr('href').split('#').pop();
    $('#' + dropdownSelector).toggleClass('open');
    return false;
  });
})(jQuery);

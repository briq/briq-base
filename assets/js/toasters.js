(function ($) {

  function hideElement(){
    $(this).slideUp();
  }

  $(document).on('click.toaster', '.c-toaster__item', hideElement);

  $('.c-toaster__item').each(function () {
    var $el = $(this);
    var hideAfter = $el.data('hideAfter');
    if (hideAfter) {
      setTimeout(hideElement.bind($el), parseInt(hideAfter, 10));
    }
  });
})(jQuery);

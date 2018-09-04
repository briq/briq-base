(function ($) {
  function hideElement() {
    $(this).slideUp();
  }

  $(document).on('click.toaster', '.c-toaster__item', hideElement);

  $('.c-toaster__item').each(function () {
    const $el = $(this);
    const hideAfter = $el.data('hideAfter');
    if (hideAfter) {
      setTimeout(hideElement.bind($el), parseInt(hideAfter, 10));
    }
  });

  const toaster = {
    message(message, icons) {
      icons = icons || '';
      const $el = $(
        `${'<div class="c-toaster__item">' +
        '<span class="c-icon '}${icons}"></span>` +
        `<p class="c-toaster__text">${message}</p>` +
        '<span class="c-close">&times;</span>' +
        '</div>'
      );
      $('.c-toaster').prepend($el);
      return $el;
    },
    info(message) {
      const $el = toaster.message(message, 'c-icon--pos c-icon--save');
      setTimeout(hideElement.bind($el), 5000);
    },
    error(message) {
      toaster.message(message, 'c-icon--neg c-icon--cancel');
    }
  };

  window.Briq = window.Briq || {};
  window.Briq.toaster = toaster;
}(jQuery));

(function ($) {
  $(() => {
    const template = document.querySelector('#confirm-template');

    $(document).on('click.cancelled', '.js-confirm-wrapper .js-cancel-btn, .js-confirm-wrapper .c-modal__overlay', function () {
      $(this).closest('.js-confirm-wrapper').remove();
    });

    function showConfirm(options, confirmed) {
      const clone = document.importNode(template.content, true);
      const $clone = $(clone);
      Object.keys(options).forEach((key) => {
        $clone.find(`[data-${key}]`).text(options[key]);
      });
      const id = `confirm-dialog-${new Date().getTime()}`;
      $(document.body).append(`<div class="js-confirm-wrapper" id="${id}">`).find(`#${id}`).append(clone);

      $(document).one('click.confirmed', `#${id} .js-confirm-btn`, () => {
        $(`#${id}`).remove();
        confirmed();
      });
    }

    $(document).on('click.confirm', '[data-confirm]', function (e) {
      const $this = $(this);
      const confirmed = $(this).data('confirmed');
      if (!confirmed) {
        e.preventDefault();
        const options = $this.data('confirm');
        showConfirm(options, () => {
          $this.data('confirmed', 'true');
          setTimeout(() => {
            $this.click();
          }, 0);
        });
        return false;
      }
    });
  });
}(jQuery));

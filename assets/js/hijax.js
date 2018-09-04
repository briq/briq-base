(function ($) {
  // hijax a clik on a link
  $(document).on('click.hijax', 'a[data-hijax]', function (e) {
    e.preventDefault();
    const $link = $(this);

    $.get(e.target).done((data) => {
      $link.replaceWith(data);
      $(document).trigger('briq.load');
    });

    return false;
  });

  // tag the button used to submit the form
  $(document).on('click.hijax', 'form[data-hijax] button, form[data-hijax] input[type=submit]', function () {
    $(this).closest('form').find('[data-hijax-clicked]').removeAttr('data-hijax-clicked');
    $(this).attr('data-hijax-clicked', true);
  });

  // hijax the form submission
  $(document).on('submit.hijax', 'form[data-hijax]', function (e) {
    e.preventDefault();
    e.stopImmediatePropagation();

    const form = this;
    const $form = $(form);
    const method = $form.find('input[name="_method"]').val() || $form.attr('method');
    let data = $form.serialize();

    const submitButton = $form.find('[data-hijax-clicked]');
    if (submitButton && submitButton.attr('name')) {
      data += `&${submitButton.attr('name')}=${submitButton.attr('value')}`;
    }

    const _options = {
      context: form,
      data,
      dataType: 'json',
      success(response) {
        if (response.message) {
          Briq.toaster.info(response.message);
        }
        if (response.replace) {
          const $replaced = $($form.data('hijax') || form);
          $replaced.replaceWith(response.replace);
        }
        $(document).trigger('briq.load');
      },
      type: method,
      url: $form.attr('action'),
      statusCode: {
        400(jqXHR) {
          const error = jqXHR.responseJSON.error;
          if (error) {
            Briq.toaster.error(error);
          }
        }
      }
    };

    $.ajax(_options);

    return false;
  });
}(jQuery));

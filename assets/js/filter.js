$(function () {
  $(document).on('keyup change', '.js-filter', $.debounce(100, function () {
    var q = $(this).val();
    var target = $(this).data('filter-target');

    if (!q) {
      $('.js-filterable', target).show();
      return;
    } else {
      var re = new RegExp(q, 'i');
      $('.js-filterable', target).each(function () {
        var $el = $(this);
        $el.toggle(re.test($el.data('filter-text')));
      });
    }
  }));
});

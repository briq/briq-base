$(function () {
  $(document).on('change.checkbox.toggleAll', 'input[type="checkbox"][data-toggle="checkbox"]', function () {
    var $this = $(this), checked = this.checked;
    var targetSelector = $this.data('target');
    var targets = $('input[name="' + targetSelector + '"]');
    targets.prop('checked', checked);
  });

  $(document).on('change.checkbox.toggleOne', 'input[type="checkbox"][name]', function () {
    var $this = $(this), checked = this.checked;
    if (!checked) {
      $('input[type="checkbox"][data-toggle="checkbox"][data-target="' + $this.attr('name') + '"]').prop('checked', false);
    }
  });
});

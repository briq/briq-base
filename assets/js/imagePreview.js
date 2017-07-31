$(function(){
  $(document).on('keyup change paste', '[data-preview-target]', function(){
    var $this = $(this);
    var $target = $($this.data('preview-target'));
    // wait until the paste event is finished before we get the value of the field
    setTimeout(function(){
      $target.attr('src', $this.val());
    }, 0);
  });
});

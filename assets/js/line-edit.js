(function($){
  $(document).on('click.line-edit', '[data-toggle="line-edit"]', function(){
    // toggle the form
    var $line = $(this).closest('.l-line').toggleClass('l-line--editing');
    // focus on the first field
    $line.find('input').not("[type='hidden']").first().focus();
    return false;
  });
})(jQuery);

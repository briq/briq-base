$(() => {
  const emoji = new EmojiConvertor();
  emoji.img_sets.apple.path = '/emoji-data/';

  function replaceEmojis() {
    $('.js-emoji').html((i, oldHtml) => {
      return emoji.replace_colons(oldHtml);
    });
  }

  $(document).on('briq.load', replaceEmojis);
  replaceEmojis();
});

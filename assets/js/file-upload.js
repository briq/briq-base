$(function() {
  function getSignedRequest(file, cb) {
    var url = '/s3/sign?fileType=' + encodeURIComponent(file.type);
    $.get(url, { dataType: 'json' })
      .done(function(data) {
        cb(null, data);
      })
      .fail(cb);
  }

  function uploadFile(file, signedRequest, cb) {
    var request = {
      url: signedRequest,
      type: 'PUT',
      contentType: file.type,
      data: file,
      processData: false
    };
    $.ajax(request)
      .done(function() {
        cb();
      })
      .fail(cb);
  }

  $(document).on('change.js-file-input', '.js-file-input', function(evt) {
    var files = evt.target.files;
    var urlInputSelector = $(evt.target).data('url-input');
    var urlInput = $(urlInputSelector);
    if (!files || !files.length) {
      return;
    }
    var file = files[0];
    getSignedRequest(file, function(err, data) {
      if (err) {
        return alert('There was an error uploading your file');
      }
      var signedRequest = data.signedRequest;
      var url = data.url;
      uploadFile(file, signedRequest, function(err) {
        if (err) {
          return alert('There was an error uploading your file');
        }
        urlInput.val(url);
        urlInput.change();
      });
    });
  });
});

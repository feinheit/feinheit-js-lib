$(function(){
    $.getScript(document.location.protocol + '//connect.facebook.net/en_US/all.js', function() {
        FB.init({appId: $('#FACEBOOK_APP_ID').val(), status: true, cookie: true, xfbml: true});
        FB.ready = true;
        $(document).trigger('FB.ready');
    })
});

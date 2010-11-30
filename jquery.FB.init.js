$(function(){
    lang = $('#fb-root').data('lang');
    
    if (!lang) {
        lang = 'en_US'
    }
    
    $.getScript(document.location.protocol + '//connect.facebook.net/' + lang + '/all.js', function() {
        FB.init({appId: $('#fb-root').data('app_id'), status: true, cookie: true, xfbml: true});
        FB.ready = true;
        $(document).trigger('FB.ready');
    })
});

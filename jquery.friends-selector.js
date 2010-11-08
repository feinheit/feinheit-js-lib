/* jQuery Plugin to display all friends of the user and give the opportunity to send them a mail 
 * 
 * Needs FB Api and jquery.tmpl to be loaded before
 * 
 */

(function( $ ){
    $.fn.friendsSelector = function() {
        var friends; // friends from facebook
        var targets = this;
        
        var settings = {
            'perms'         : 'email,publish_stream'
        };
        
        checkFB = function() {
            if (typeof FB != 'undefined') {
                FB.getLoginStatus(function(response) {
                    if (response.session) {
                        build(response)
                    } else {
                        FB.login({perms: settings['perms']})
                        FB.Event.subscribe('auth.login', build);
                    }
                });
                //FB.Event.subscribe('auth.sessionChange', build);
                clearInterval(checkFBInterval);
            }
        }
        var checkFBInterval = self.setInterval('checkFB()', 10);
        
        function build(response) {
            FB.api('/me/friends/', function(response) {
                friends = response['data'];
                targets.each(function(){
                    $(this).children().remove();
                    $('#friendTemplate').tmpl(friends).appendTo($(this));
                    $(this).find('a.fb-friend').click(function(){
                        $(this).siblings().removeClass('selected');
                        $(this).addClass('selected');
                        $(this).trigger('select.friendsMailer', [$(this).tmplItem().data])
                    });
                });
            })
        }
        
        return this.each(function(){
            $(this).append('<p>' + '<fb:login-button perms="' + settings['perms'] + '"></fb:login-button>' + '</p>');
        });
    }
})( jQuery );

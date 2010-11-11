/* jQuery Plugin to display all friends of the user and give the opportunity to send them a mail 
 * 
 * Needs FB Api and jquery.tmpl to be loaded before
 * 
 */

(function( $ ){
    $.fn.friendsSelector = function(method) {
        var friends; // friends from facebook
        var targets = this;
        
        var settings = {
            'perms'         : 'email,publish_stream'
        };
        
        var methods = {
            init: function(options){
                if (options) {
                    $.extend(settings, options);
                }
                if ((typeof FB != 'undefined') && (FB.ready)) {
                    checkFB();
                } else {
                    $(document).bind('FB.ready', checkFB);
                }
                return this.each(function(){
                    $(this).append('<p>' + '<fb:login-button perms="' + settings['perms'] + '"></fb:login-button>' + '</p>');
                });
            },
            unselect : function() {
                return this.each(function() {
                    $(this).find('.selected').removeClass('selected');
                })
            }
        }
        
        checkFB = function() {
            FB.getLoginStatus(function(response) {
                if (response.session) {
                    build(response)
                } else {
                    FB.login({perms: settings['perms']})
                    FB.Event.subscribe('auth.login', build);
                }
            });
            //FB.Event.subscribe('auth.sessionChange', build);
        }
        
        function build(response) {
            FB.api('/me/friends/', function(response) {
                friends = response['data'];
                targets.each(function(){
                    $(this).children().remove();
                    $(this).trigger('friendsLoaded.friendsSelector', friends);
                    $('#friendTemplate').tmpl(friends).appendTo($(this));
                    
                    $(this).find('a.fb-friend').click(function(){
                        $(this).siblings().removeClass('selected');
                        $(this).addClass('selected');
                        $(this).trigger('select.friendsSelector', [$(this).tmplItem().data])
                    });
                });
            })
        }
        
        // Method calling logic
        if ( methods[method] ) {
            return methods[ method ].apply( this, Array.prototype.slice.call( arguments, 1 ));
        } else if ( typeof method === 'object' || ! method ) {
            return methods.init.apply( this, arguments );
        } else {
            $.error( 'Method ' +  method + ' does not exist on jQuery.wallPoster' );
        }
    }
})( jQuery );

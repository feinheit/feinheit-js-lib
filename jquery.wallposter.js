/* jQuery Plugin post on users wall
 * 
 * Needs FB Api and jquery.tmpl to be loaded before
 * 
 */

(function( $ ){
    $.fn.wallPoster = function (method) {
        var settings = {
            'template' : $('#wallpostTemplate'),
            'friend' : { id : 1, name: ''}
        }
        
        var methods = {
            init : function(options) {
                if ( options ) { 
                     $.extend( settings, options );
                }
                return this.each(function() {
                    settings.template.tmpl(settings.friend).appendTo($(this));
                })
            },
            setFriend : function(friend) {
                if (typeof(friend) == 'object') {
                    settings.friend = friend
                } else {
                    $.error('Friend should be an object like { id : uid, name : "first last" }');
                }
                return this.each(function() {
                    var input = $($(this).children()[0]);
                    input = settings.template.tmpl(settings.friend).replaceAll(input);
                    input.find('.wallpostOverlay').hide();
                    input.find('button').click(function() {
                        FB.api('/' + settings.friend.id + '/feed', 'post', {
                            message : input.find('.message').val(),
                            link : 'http://www.feinheit.ch'
                        }, function(response) {
                            console.log(response);
                        });
                    });
                });
            }
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
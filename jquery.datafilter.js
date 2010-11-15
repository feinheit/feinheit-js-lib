/* jQuery Plugin to filter items loaded via tmpl
 * 
 * Needs jquery.tmpl to be loaded before
 * 
 */

(function( $ ){
    $.fn.dataFilter = function(method) {
        var settings = {
            'targets' : false
        }
        
        var methods = {
            init : function(options) {
                if (options) {
                    $.extend( settings, options )
                }
                if (settings.targets) {
                    return this.keyup(methods.filter);
                } else {
                    $.error('you have to define the targets');
                }
            },
            clear : function() {
                $(this).attr('value', '');
                targets.show();
                return this;
            },
            filter : function(obj) {
                var normal = $(this).attr('value');
                filter(normal);
                return this;
            }
        }
        
        function search_tokenizer(search_string) {
            result = Array(search_string.toLowerCase());
            tokens = search_string.split(" ");
            for(var i=1; i < tokens.length; i++) {
                var first = tokens.shift();
                tokens.push(first);
                result.push(tokens.join(" ").toLowerCase());
            }
            return result;
        }
        
        function filter(search){
            // targets can be a string or jq object. use string if you want to have
            // the jq function evaluatet when you press keys.
            if (typeof(settings.targets) == 'string') {
                targets = eval(settings.targets);
            } else {
                targets = settings.targets;
            }
            search_tokens = search_tokenizer(search);
            
            targets.each(function(){
                var name = $(this).tmplItem().data.name.toLowerCase();
                var name_permutations = search_tokenizer(name);
                
                // Dumbfucks search method
                var any_hit = false;
                for (i = 0; i < name_permutations.length; i++) {
                    for (y = 0; y < search_tokens.length; y++) {
                        if (name_permutations[i].indexOf(search_tokens[y]) != -1) {
                            any_hit = true;
                        }
                    }
                }
                
                if (any_hit) {
                    $(this).show();
                }
                else {
                    $(this).hide();
                }
            });
        };
        
        
        
        // Method calling logic
        if ( methods[method] ) {
            return methods[ method ].apply( this, Array.prototype.slice.call( arguments, 1 ));
        } else if ( typeof method === 'object' || ! method ) {
            return methods.init.apply( this, arguments );
        } else {
            $.error( 'Method ' +  method + ' does not exist on jQuery.dataFilter');
        } 
    }
})( jQuery );
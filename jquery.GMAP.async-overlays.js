/* Simple async overlay
 * ======================
 * 
 * needs google maps api is loaded before:
 * <script type="text/javascript" src="http://maps.google.com/maps/api/js?sensor=false"></script>
 * 
 * gets data from url /api/map/ and expect that data to be json in following format:
 * [{"title": "some title", 
 *   "id": 1, 
 *   "longitude": 8.5500001907348597, 
 *   "latitude": 47.36669921875, 
 *   "content": "<p>Content</p>", 
 *   "icon": "/media/img/taube.png"},
 *   < ... > 
 * ]
 */


$(function(){
    if ($('#map').length) {
        var latlng = new google.maps.LatLng(46.83, 8.1);
        var myOptions = {
            zoom: 7,
            center: latlng,
            mapTypeId: google.maps.MapTypeId.SATELLITE
        };
        var map = new google.maps.Map(document.getElementById("map"), myOptions);
        
        var infowindow = new google.maps.InfoWindow({
            content: '',
            maxWidth : 230,
            size: new google.maps.Size(60, 30)
        });
        
        
        function bindWindow(marker, content){
            google.maps.event.addListener(marker, 'click', function(){
                infowindow.close();
                infowindow.setContent(content);
                infowindow.open(map, marker);
            });
        }
        
        function drawMarker(item, show) {
            return (function() {
                var position = new google.maps.LatLng(item.latitude, item.longitude);
                        
                var marker = new google.maps.Marker({
                    position: position,
                    map: map,
                    title: item.title,
                    icon: item.icon
                });
                
                bindWindow(marker, item.content);
                if (show) {
                    infowindow.setContent(item.content);
                    infowindow.open(map, marker);
                }
            });
        }
        
        $.getJSON('/api/map/', function(data){
            all = data.length
            for (i in data) {
                
                var wait = 0;
                
                if ((all - i) < 50) {
                    wait = 500 * (all - i);
                } 
                
                
                var local = i;
                var item = data[local];
                
                if (parseInt(i)+1==all) {
                    show = true
                } else {
                    show = false
                }
                
                drawMarkerRef = drawMarker(item, show);
                
                var timeout = setTimeout(drawMarkerRef, wait)
            }
        })
    }
});



/* Author: J.Kim

*/

var socket = io.connect('http://localhost:3000');
var template = new Hogan.Template(T.post);
socket.on('connect', function() {
    $(function() {
        var status = $('.clearfix #status');
        status
        .removeClass('disconnected')
        .addClass('connected')
        .text('Connected');
    });
});

socket.on('disconnect', function() {
    $(function() {
        var status = $('.clearfix #status');
        status
        .removeClass('connected')
        .addClass('disconnected')
        .text('Disconnected');
    });
});

socket.on('datastart', function(data) {
    $(function() {
        var posts = $('.feed').empty();
        $.each(data.data.posts, function(index, post) {
            var time = new Date(post.timestamp*1000);
            post.time = time.getHours()+':'+time.getMinutes();
            posts.append(template.render(post));
        });
    });
});

socket.on('newpost', function(data) {
    
});

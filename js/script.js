/* Author: J.Kim

*/

var socket = io.connect('http://localhost:3000');

var posts = {};

$(function() {
    window.socketstatus = $('.clearfix #status');
    window.postscont = $('.feed');
});

socket.on('connect', function() {
    $(function() {
        socketstatus
        .removeClass('disconnected')
        .addClass('connected')
        .text('Connected');
    });
});

socket.on('disconnect', function() {
    $(function() {
        socketstatus
        .removeClass('connected')
        .addClass('disconnected')
        .text('Disconnected');
    });
});

socket.on('datastart', function(data) {
    $(function() {
        postscont.removeClass('loading').empty();
        $.each(data.data.posts, function(index, post) {
            addPost(post);
        });
    });
});

socket.on('newpost', function(data) {
    // data.posts = array of all posts
    // need to determine whether post is already displayed
    $.each(data.posts, function(index, post) {
        if(!posts[post.id]) {
            addPost(post);
        }
    });
});

function addPost(post, animate) {
    var time = new Date(post.timestamp*1000);
    var template = new Hogan.Template(T.post);
    post.time = time.getHours()+':'+time.getMinutes();
    posts[post.id] = post;
    postscont.append(template.render(post));
}

/* Author: J.Kim

*/

var socket = io.connect('http://localhost:3000');

var posts = {};

var template = {
    normal: new Hogan.Template(T.post),
    twitter: new Hogan.Template(T.posttwitter),
    picture: new Hogan.Template(T.postpicture)
}

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
        $.each(data.data.posts.reverse(), function(index, post) {
            addPost(post);
        });
    });
});

socket.on('newpost', function(data) {
    // data.posts = array of all posts
    // need to determine whether post is already displayed
    $.each(data.data.posts.reverse(), function(index, post) {
        if(!posts[post.id]) {
            addPost(post, true);
        }
    });
});

function addPost(post, animate) {
    var time = new Date(post.timestamp*1000);
    post.time = prefixNumber(time.getHours())+':'+prefixNumber(time.getMinutes());
    var render;
    if(!post.type) {
        render = $(template.normal.render(post));
    } else {
        render = $(template[post.type].render(post));
    }
    posts[post.id] = post;
    if(animate) {
        postscont.prepend(render);
        render.hide().fadeIn(600);
    } else {
        postscont.prepend(render);
    }
}

/*
 * If number is less than 10 then prefix with a 0
 */
function prefixNumber(number) {
    if(number < 10) {
        number = '0'+number;
    }
    return number;
}

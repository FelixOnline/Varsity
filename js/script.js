/* Author: J.Kim

*/

var posts = {};

var template = {
    normal: new Hogan.Template(T.post),
    twitter: new Hogan.Template(T.posttwitter),
    picture: new Hogan.Template(T.postpicture),
    quote: new Hogan.Template(T.postquote)
}

$(function() {
    window.socketstatus = $('.clearfix #status');
    window.socketupdate = $('.clearfix #update');
    window.postscont = $('.feed');
    window.cache = {
        sticky: $('.sticky')
    }
});

if(!config.static) {
    var socket = io.connect(config.url);
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

    /*
     * datastart
     * Called when client firsts connects to server
     * Can be called again if the client looses connection
     */
    socket.on('datastart', function(data) {
        $(function() {

            // display posts
            postscont.removeClass('loading');
            if(!posts) { // if no posts
                postscont.empty();
            }
            if(data.data.posts) { // if there are posts in the data
                $.each(data.data.posts.reverse(), function(index, post) {
                    if(!posts[post.id]) {
                        posts[post.id] = addPost(post);
                    }
                });
            }
            cache.sticky.html(data.data.sticky);
        });
    });

    /*
     * newpost
     * Called when there is a new post
     */
    socket.on('newpost', function(data) {
        // data.posts = array of all posts
        // need to determine whether post is already displayed
        $.each(data.data.posts.reverse(), function(index, post) {
            if(!posts[post.id]) {
                posts[post.id] = addPost(post, true);
            }
        });
        cache.sticky.html(data.data.sticky);
    });

    /*
     * reset
     * Called when the feed needs to be reset (on a post delete)
     */
    socket.on('reset', function(data) {
        posts = {};
        postscont.removeClass('loading').empty();
        if(data.data.posts) { // if there are posts in the data
            $.each(data.data.posts.reverse(), function(index, post) {
                posts[post.id] = addPost(post);
            });
        }
        cache.sticky.html(data.data.sticky);
    });
} else { // static page
    $(function() {
        socketstatus.hide(); // hide connection status
        socketupdate.hide();
        postscont.removeClass('loading').empty(); // clean posts cont

        // add posts
        $.each(config.data.posts.reverse(), function(index, post) {
            posts[post.id] = addPost(post);
        });
    });
}

/*
 * Add post
 * Render temmplate and prepend it to feed
 *
 * Returns post object
 */
function addPost(post, animate) {
    var time = new Date(post.timestamp*1000);
    post.time = prefixNumber(time.getHours())+':'+prefixNumber(time.getMinutes());
    var render;
    if(!post.type) {
        render = $(template.normal.render(post));
    } else {
        if(post.type == 'matchupdate' || post.type == 'matchfinish') {
            post.meta.team1 = matches[post.meta.match].team1;
            post.meta.team2 = matches[post.meta.match].team2;
            post.meta.location = matches[post.meta.match].location;
        }
        render = $(template[post.type].render(post));
    }
    if(animate) {
        postscont.prepend(render);
        render.hide().fadeIn(1000);
    } else {
        postscont.prepend(render);
    }
    return post;
}

/*
 * If number is less than 10 then prefix with a 0
 *
 * Returns prefixed number
 */
function prefixNumber(number) {
    if(number < 10) {
        number = '0'+number;
    }
    return number;
}


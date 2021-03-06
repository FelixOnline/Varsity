/**
 * Author: J.Kim
 */

var posts = {};

var matches = {};
var matchtemplate = new Hogan.Template(T.match);

var template = {
    normal: new Hogan.Template(T.post),
    twitter: new Hogan.Template(T.posttwitter),
    picture: new Hogan.Template(T.postpicture),
    quote: new Hogan.Template(T.postquote),
    matchupdate: new Hogan.Template(T.matchupdate),
    matchfinish: new Hogan.Template(T.matchfinish)
}

$(function() {
    window.socketstatus = $('.clearfix #status');
    window.socketupdate = $('.clearfix #update');
    window.postscont = $('.feed');
    window.cache = {
        sticky: $('.sticky'),
        match: {
            current: $('.matchlist #current'),
            coming: $('.matchlist #coming'),
            finished: $('.matchlist #finished'),
            jpr: $('.matchlist #jpr')
        }
    }
});

if(!config.static) {
    var socket = io.connect(config.url);
    socket.on('connect', function() {
        $(function() {
            socketstatus
            .removeClass('alert')
            .addClass('success')
            .text('Connected');
        });
    });

    socket.on('disconnect', function() {
        $(function() {
            socketstatus
            .removeClass('success')
            .addClass('alert')
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
            // display matches
            $.each(data.data.matches, function(index, match) {
                if(!matches[match.id]) { // if match isn't already displayed exists
                    matches[match.id] = addMatch(match);
                }
            });

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
     * matchupdate
     * Called when there is a match update
     */
    socket.on('matchupdate', function(data) {
        $.each(data.data.matches, function(index, match) {
            changeMatch(match);
        });
    });

    /*
     * reset
     * Called when the feed needs to be reset (on a post delete)
     */
    socket.on('reset', function(data) {
        // empty matches
        $.each(cache.match, function(index, section) {
            section.empty();
        });

        matches = {}; // reset matches

        $.each(data.data.matches, function(index, match) {
            matches[match.id] = addMatch(match);
        });

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

        // empty match sections
        $.each(cache.match, function(index, section) {
            section.empty();
        });

        // add matches
        $.each(config.data.matches, function(index, match) {
            matches[match.id] = addMatch(match);
        });

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
 * Add match
 * Render match and add it to match list
 *
 * Returns match object
 */
function addMatch(match) {
    var start = new Date(match.start*1000);
    match.time = prefixNumber(start.getHours())+':'+prefixNumber(start.getMinutes());
    var render = $(matchtemplate.render(match));
    match.elm = render;
    match.position = checkMatchTime(match);
    cache.match[match.position].append(render);
    return match;
}

/*
 * Check where match should be in list
 *
 * Returns:
 *      'jpr'       - rugby showdown match
 *      'finished'  - match has finished
 *      'coming'    - match is coming up
 *      'current'   - match is currently happening
 */
function checkMatchTime(match) {
    var start = new Date(match.start*1000);
    if(match.id == '57' || match.id == '58') {
        return 'jpr';
    } else if(match.finished == 1) { // finished
        return 'finished';
    } else if(start.getTime() > Date.now()) { // coming up
        return 'coming';
    } else {
        return 'current';
    }
}

/*
 * Change match details
 *
 * Returns match object
 */
function changeMatch(match) {
    if(matches[match.id]) {
        var elm = matches[match.id].elm;
        elm.find('.score1').text(match.score1);
        elm.find('.score2').text(match.score2);
        matches[match.id].score1 = match.score1;
        matches[match.id].score2 = match.score2;
        // movement
        var position = checkMatchTime(match);
        if(position != matches[match.id].position) {
            elm.hide().appendTo(cache.match[position]).fadeIn(1000);
            matches[match.id].position = position;
        }
        return matches[match.id];
    }
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

/*
 * Set up loop to check match time
 */
$(function() {
    // loop to check if match has started yet
    var duration = 2*60*1000 // 2 mins
    var loop = setInterval(function() {
        $.each(matches, function(index, match) {
            var position = checkMatchTime(match);
            if(position != match.position) {
                match.elm.hide().appendTo(cache.match[position]).fadeIn(1000);
                matches[match.id].position = position;
            }
        });
    }, duration);
});

/* Author: J.Kim

*/

//var socket = io.connect('http://176.34.227.200:3000');
var socket = io.connect('http://localhost:3000');

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
    window.postscont = $('.feed');
    window.cache = {
        sticky: $('.sticky'),
        match: {
            current: $('.matchlist #current'),
            coming: $('.matchlist #coming'),
            finished: $('.matchlist #finished')
        }
    }
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
        $.each(cache.match, function(index, section) {
            section.empty();
        });

        $.each(data.data.matches, function(index, match) {
            matches[match.id] = addMatch(match);
        });

        if(data.data.posts) {
            $.each(data.data.posts.reverse(), function(index, post) {
                addPost(post);
            });
        }
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
    cache.sticky.html(data.data.sticky);
});

socket.on('matchupdate', function(data) {
    $.each(data.data.matches, function(index, match) {
        changeMatch(match);
    });
});

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
    posts[post.id] = post;
    if(animate) {
        postscont.prepend(render);
        render.hide().fadeIn(1000);
    } else {
        postscont.prepend(render);
    }
}

function addMatch(match) {
    var start = new Date(match.start*1000);
    match.time = prefixNumber(start.getHours())+':'+prefixNumber(start.getMinutes());
    var render = $(matchtemplate.render(match));
    match.elm = render;
    match.position = checkMatchTime(match);
    cache.match[match.position].append(render);
    return match;
}

function checkMatchTime(match) {
    var start = new Date(match.start*1000);
    if(match.finished == 1) { // finished
        return 'finished';
    } else if(start.getTime() > Date.now()) { // coming up
        return 'coming';
    } else {
        return 'current';
    }
}

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

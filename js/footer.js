/*
 *  Copyright 2011 Twitter, Inc.
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *  http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */

var Hogan = {};

(function (Hogan, useArrayBuffer) {
  Hogan.Template = function (renderFunc, text, compiler, options) {
    this.r = renderFunc || this.r;
    this.c = compiler;
    this.options = options;
    this.text = text || '';
    this.buf = (useArrayBuffer) ? [] : '';
  }

  Hogan.Template.prototype = {
    // render: replaced by generated code.
    r: function (context, partials, indent) { return ''; },

    // variable escaping
    v: hoganEscape,

    // triple stache
    t: coerceToString,

    render: function render(context, partials, indent) {
      return this.ri([context], partials || {}, indent);
    },

    // render internal -- a hook for overrides that catches partials too
    ri: function (context, partials, indent) {
      return this.r(context, partials, indent);
    },

    // tries to find a partial in the curent scope and render it
    rp: function(name, context, partials, indent) {
      var partial = partials[name];

      if (!partial) {
        return '';
      }

      if (this.c && typeof partial == 'string') {
        partial = this.c.compile(partial, this.options);
      }

      return partial.ri(context, partials, indent);
    },

    // render a section
    rs: function(context, partials, section) {
      var tail = context[context.length - 1];

      if (!isArray(tail)) {
        section(context, partials, this);
        return;
      }

      for (var i = 0; i < tail.length; i++) {
        context.push(tail[i]);
        section(context, partials, this);
        context.pop();
      }
    },

    // maybe start a section
    s: function(val, ctx, partials, inverted, start, end, tags) {
      var pass;

      if (isArray(val) && val.length === 0) {
        return false;
      }

      if (typeof val == 'function') {
        val = this.ls(val, ctx, partials, inverted, start, end, tags);
      }

      pass = (val === '') || !!val;

      if (!inverted && pass && ctx) {
        ctx.push((typeof val == 'object') ? val : ctx[ctx.length - 1]);
      }

      return pass;
    },

    // find values with dotted names
    d: function(key, ctx, partials, returnFound) {
      var names = key.split('.'),
          val = this.f(names[0], ctx, partials, returnFound),
          cx = null;

      if (key === '.' && isArray(ctx[ctx.length - 2])) {
        return ctx[ctx.length - 1];
      }

      for (var i = 1; i < names.length; i++) {
        if (val && typeof val == 'object' && names[i] in val) {
          cx = val;
          val = val[names[i]];
        } else {
          val = '';
        }
      }

      if (returnFound && !val) {
        return false;
      }

      if (!returnFound && typeof val == 'function') {
        ctx.push(cx);
        val = this.lv(val, ctx, partials);
        ctx.pop();
      }

      return val;
    },

    // find values with normal names
    f: function(key, ctx, partials, returnFound) {
      var val = false,
          v = null,
          found = false;

      for (var i = ctx.length - 1; i >= 0; i--) {
        v = ctx[i];
        if (v && typeof v == 'object' && key in v) {
          val = v[key];
          found = true;
          break;
        }
      }

      if (!found) {
        return (returnFound) ? false : "";
      }

      if (!returnFound && typeof val == 'function') {
        val = this.lv(val, ctx, partials);
      }

      return val;
    },

    // higher order templates
    ho: function(val, cx, partials, text, tags) {
      var compiler = this.c;
      var options = this.options;
      options.delimiters = tags;
      var t = val.call(cx, text, function(t) {
        return compiler.compile(t, options).render(cx, partials);
      });
      this.b(compiler.compile(t.toString(), options).render(cx, partials));
      return false;
    },

    // template result buffering
    b: (useArrayBuffer) ? function(s) { this.buf.push(s); } :
                          function(s) { this.buf += s; },
    fl: (useArrayBuffer) ? function() { var r = this.buf.join(''); this.buf = []; return r; } :
                           function() { var r = this.buf; this.buf = ''; return r; },

    // lambda replace section
    ls: function(val, ctx, partials, inverted, start, end, tags) {
      var cx = ctx[ctx.length - 1],
          t = null;

      if (!inverted && this.c && val.length > 0) {
        return this.ho(val, cx, partials, this.text.substring(start, end), tags);
      }

      t = val.call(cx);

      if (typeof t == 'function') {
        if (inverted) {
          return true;
        } else if (this.c) {
          return this.ho(t, cx, partials, this.text.substring(start, end), tags);
        }
      }

      return t;
    },

    // lambda replace variable
    lv: function(val, ctx, partials) {
      var cx = ctx[ctx.length - 1];
      var result = val.call(cx);
      if (typeof result == 'function') {
        result = result.call(cx);
      }
      result = coerceToString(result);

      if (this.c && ~result.indexOf("{\u007B")) {
        return this.c.compile(result, this.options).render(cx, partials);
      }

      return result;
    }

  };

  var rAmp = /&/g,
      rLt = /</g,
      rGt = />/g,
      rApos =/\'/g,
      rQuot = /\"/g,
      hChars =/[&<>\"\']/;


  function coerceToString(val) {
    return String((val === null || val === undefined) ? '' : val);
  }

  function hoganEscape(str) {
    str = coerceToString(str);
    return hChars.test(str) ?
      str
        .replace(rAmp,'&amp;')
        .replace(rLt,'&lt;')
        .replace(rGt,'&gt;')
        .replace(rApos,'&#39;')
        .replace(rQuot, '&quot;') :
      str;
  }

  var isArray = Array.isArray || function(a) {
    return Object.prototype.toString.call(a) === '[object Array]';
  };

})(typeof exports !== 'undefined' ? exports : Hogan);

T={};
T.post=function(c,p,i){i = i || "";var b = i + "";var _ = this;b += "<div class=\"post\">";b += "\n" + i;b += "    <div class=\"row\">";b += "\n" + i;b += "        <div class=\"time span1\">";b += (_.v(_.f("time",c,p,0)));b += "</div>";b += "\n" + i;b += "        <div class=\"content span5\">";b += (_.f("content",c,p,0));b += "</div>";b += "\n" + i;b += "    </div>";b += "\n" + i;b += "</div>";b += "\n";return b;};
T.postpicture=function(c,p,i){i = i || "";var b = i + "";var _ = this;b += "<div class=\"post picture\">";b += "\n" + i;b += "    <div class=\"row\">";b += "\n" + i;b += "        <div class=\"time span1\">";b += (_.v(_.f("time",c,p,0)));b += "</div>";b += "\n" + i;b += "        <div class=\"piccont row clearfix\">";b += "\n" + i;b += "            <img src=\"";b += (_.v(_.d("meta.picurl",c,p,0)));b += "\" class=\"span5\"/>";b += "\n" + i;b += "        </div>";b += "\n" + i;b += "    </div>";b += "\n" + i;b += "    <div class=\"row\">";b += "\n" + i;b += "        <div class=\"content span5 offset1\">";b += (_.f("content",c,p,0));b += "</div>";b += "\n" + i;b += "    </div>";b += "\n" + i;b += "</div>";b += "\n";return b;};
T.postquote=function(c,p,i){i = i || "";var b = i + "";var _ = this;b += "<div class=\"post quotecont\">";b += "\n" + i;b += "    <div class=\"row\">";b += "\n" + i;b += "        <div class=\"span1\">";b += "\n" + i;b += "            <div class=\"time\">";b += (_.v(_.f("time",c,p,0)));b += "</div>";b += "\n" + i;b += "        </div>";b += "\n" + i;b += "        <div class=\"span5 quote\">";b += (_.d("meta.quote",c,p,0));b += "</div>";b += "\n" + i;b += "    </div>";b += "\n" + i;b += "    <div class=\"row\">";b += "\n" + i;b += "        <div class=\"content span5 offset1\">";b += (_.f("content",c,p,0));b += "</div>";b += "\n" + i;b += "    </div>";b += "\n" + i;b += "</div>";b += "\n";return b;};
T.posttwitter=function(c,p,i){i = i || "";var b = i + "";var _ = this;b += "<div class=\"post twitter\">";b += "\n" + i;b += "    <div class=\"row\">";b += "\n" + i;b += "        <div class=\"span1\">";b += "\n" + i;b += "            <div class=\"time\">";b += (_.v(_.f("time",c,p,0)));b += "</div>";b += "\n" + i;b += "            <div id=\"twittericon\"></div>";b += "\n" + i;b += "        </div>";b += "\n" + i;b += "        <div class=\"span5\">";b += (_.d("meta.tweetcontent.html",c,p,0));b += "</div>";b += "\n" + i;b += "    </div>";b += "\n" + i;b += "    <div class=\"row\">";b += "\n" + i;b += "        <div class=\"content span5 offset1\">";b += (_.f("content",c,p,0));b += "</div>";b += "\n" + i;b += "    </div>";b += "\n" + i;b += "</div>";b += "\n";return b;};
window.config = {};

//config.url = 'http://176.34.227.200:3000';
config.url = 'http://localhost:3000';

config.live = true;
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
    setTimeout(function(){
        // Hide the address bar!
        window.scrollTo(0, 1);
    }, 0);
});

if(config.live) {
    var socket = io.connect(config.url);
    socket.on('connect', function() {
        $(function() {
            socketstatus
            .removeClass('disconnected')
            .addClass('connected')
            .text('Connected');
            socketupdate.show();
        });
    });

    socket.on('disconnect', function() {
        $(function() {
            socketstatus
            .removeClass('connected')
            .addClass('disconnected')
            .text('Disconnected');
            socketupdate.hide();
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


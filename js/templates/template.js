T={};
T.post=function(c,p,i){i = i || "";var b = i + "";var _ = this;b += "<div class=\"post\">";b += "\n" + i;b += "    <div class=\"row\">";b += "\n" + i;b += "        <div class=\"time span1\">";b += (_.v(_.f("time",c,p,0)));b += "</div>";b += "\n" + i;b += "        <div class=\"content span4\">";b += (_.f("content",c,p,0));b += "</div>";b += "\n" + i;b += "    </div>";b += "\n" + i;b += "</div>";b += "\n";return b;;}
T.postpicture=function(c,p,i){i = i || "";var b = i + "";var _ = this;b += "<div class=\"post picture\">";b += "\n" + i;b += "    <div class=\"row\">";b += "\n" + i;b += "        <div class=\"time span1\">";b += (_.v(_.f("time",c,p,0)));b += "</div>";b += "\n" + i;b += "        <div class=\"piccont span4\">";b += "\n" + i;b += "            <img src=\"";b += (_.v(_.d("meta.image.url",c,p,0)));b += "\"/>";b += "\n" + i;b += "        </div>";b += "\n" + i;b += "    </div>";b += "\n" + i;b += "    <div class=\"row\">";b += "\n" + i;b += "        <div class=\"content span4 offset1\">";b += (_.f("content",c,p,0));b += "</div>";b += "\n" + i;b += "    </div>";b += "\n" + i;b += "</div>";b += "\n";return b;;}
T.posttwitter=function(c,p,i){i = i || "";var b = i + "";var _ = this;b += "<div class=\"post twitter\">";b += "\n" + i;b += "    <div class=\"row\">";b += "\n" + i;b += "        <div class=\"time span1\">";b += (_.v(_.f("time",c,p,0)));b += "</div>";b += "\n" + i;b += "        <div class=\"content span4\">";b += (_.f("content",c,p,0));b += "</div>";b += "\n" + i;b += "    </div>";b += "\n" + i;b += "</div>";b += "\n";return b;;}
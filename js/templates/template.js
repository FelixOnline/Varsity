T={};
T.post=function(c,p,i){i = i || "";var b = i + "";var _ = this;b += "<div class=\"post\">";b += "\n" + i;b += "    <div class=\"time\">";b += (_.v(_.f("time",c,p,0)));b += "</div>";b += "\n" + i;b += "    <div class=\"content\">";b += (_.v(_.f("content",c,p,0)));b += "</div>";b += "\n" + i;b += "    <div class=\"author\">";b += "\n" + i;b += "        <a href=\"";b += (_.v(_.d("author.url",c,p,0)));b += "\">";b += (_.v(_.d("author.name",c,p,0)));b += "</a>";b += "\n" + i;b += "    </div>";b += "\n" + i;b += "</div>";b += "\n";return b;;}
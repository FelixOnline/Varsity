<!doctype html>
<!--[if lt IE 7]> <html class="no-js lt-ie9 lt-ie8 lt-ie7" lang="en"> <![endif]-->
<!--[if IE 7]>    <html class="no-js lt-ie9 lt-ie8" lang="en"> <![endif]-->
<!--[if IE 8]>    <html class="no-js lt-ie9" lang="en"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js" lang="en"> <!--<![endif]-->
<head>
	<meta charset="utf-8" />
    <!-- Use the .htaccess and remove these lines to avoid edge case issues.
       More info: h5bp.com/i/378 -->
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">

	<title>Varsity - Felix Online</title>
    <meta name="description" content="">

    <meta name="viewport" content="width=device-width">

    <!-- Place favicon.ico and apple-touch-icon.png in the root directory: mathiasbynens.be/notes/touch-icons -->

	<meta name="viewport" content="width=device-width, initial-scale=1.0" />
	
	<!-- Bootstrap -->
	<link rel="stylesheet/less" href="css/bootstrap/bootstrap.less" type="text/css" media="screen" />
	<link rel="stylesheet/less" href="css/bootstrap/responsive.less" type="text/css" media="screen" />
	
	<!-- Your styles -->
	<link rel="stylesheet/less" href="css/style.less" type="text/css" media="screen" />
    <script src="js/libs/less-1.3.0.min.js" type="text/javascript"></script>
	
	<!--css3-mediaqueries-js - http://code.google.com/p/css3-mediaqueries-js/ - Enables media queries in some unsupported browsers-->
	<script type="text/javascript" src="js/css3-mediaqueries.js"></script>
</head>

<body>
    <div class="container">
        <div id="topBarCont">
            <div class="row">
                <div id="topBar" class="span12">
                    <div class="links first">
                        <ul>
                            <li class="first"><a href="<?php echo STANDARD_URL; ?>" class="selected">Felix Online</a></li>
                            <li><a href="<?php echo STANDARD_URL; ?>media/">Media</a></li>
                            <li class="last"><a href="<?php echo STANDARD_URL; ?>issuearchive/">Issue Archive</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        <header>
            <!-- Begin row 1 -->
            <div class="row">
                <div class="span5 line hidden-phone"></div>
                <div class="span2 strapline" id="header1">
                    <p>"Keep the Cat Free"</p>
                </div>
                <div class="span5 line last hidden-phone"></div>
            </div>
            <!-- End row 1 -->

            <!-- Begin header main -->
            <div class="row">
                <div class="span4 date hidden-phone">
                    <p><?php echo date('d.m.Y');?></p>
                </div>
                <div class="span4 logocont">
                    <a href="<?php echo STANDARD_URL; ?>">
                        <div class="logo"> 
                            <h1>Felix</h1>
                        </div>
                    </a>
                </div>
                <div class="span4 catPic last">
                    <!--<img src="../img/felix_cat-small.jpg" width="100px" height="110px"/>-->
                </div>
            </div>
            <!-- End header main -->

            <!-- Begin header 2 -->
            <div class="row">
                <div class="span3 line hidden-phone"></div>
                <div class="span6 strapline" id="header2">
                    <p>The student voice of Imperial College London since 1949</p>
                </div>
                <div class="span3 line last hidden-phone"></div>
            </div>
            <!-- End header 2 -->
        </header>
        <div role="main" id="main">
            <!-- Masthead -->
            <div class="row">
                <div class="span12">
                    <div id="masthead" class="clearfix">
                        <h2>Varsity <span>Live</span></h2>
                        <div class="info">
                            <p>Varsity info</p>
                        </div>
                    </div>
                </div>
            </div>

            <div class="row">
                <div class="span12 socket-info clearfix">
                    <p id="update">Page updates automatically</p>
                    <p id="status"></p>
                </div>
            </div>
            <div class="row">
                <div class="span8 feed"></div>
                <div class="span4 sidebar">
                    <p>Sidebar</p>
                </div>
            </div>
        </div>
        <footer class="row">
            <div class="footerbg span12">
                <div class="row">
                    <div class="span6 alpha">
                        <img src="../img/title-small.jpg"/>
                    </div>
                    <div class="span6 details alpha">
                        <p>&copy; Felix Imperial MMXII <a href="#topBarCont">Top of page</a></p>
                    </div>
                </div>
            </div>
        </footer>
    </div>
    <!-- JavaScript at the bottom for fast page loading -->

    <!-- Grab Google CDN's jQuery, with a protocol relative URL; fall back to local if offline -->
    <script src="//ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js"></script>
    <script>window.jQuery || document.write('<script src="js/libs/jquery-1.7.1.min.js"><\/script>')</script>

    <script src="http://localhost:3000/socket.io/socket.io.js"></script>
    <script src="js/libs/template.js"></script>
    <script src="js/templates/template.js"></script>

    <!-- scripts concatenated and minified via build script -->
    <script src="js/plugins.js"></script>
    <script src="js/script.js"></script>
    <!-- end scripts -->

    <!-- Asynchronous Google Analytics snippet. Change UA-XXXXX-X to be your site's ID.
       mathiasbynens.be/notes/async-analytics-snippet -->
    <script>
        var _gaq=[['_setAccount','UA-XXXXX-X'],['_trackPageview']];
        (function(d,t){var g=d.createElement(t),s=d.getElementsByTagName(t)[0];
        g.src=('https:'==location.protocol?'//ssl':'//www')+'.google-analytics.com/ga.js';
        s.parentNode.insertBefore(g,s)}(document,'script'));
    </script>
</body>
</html>

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
	
	<!-- 1140px Grid styles for IE -->
	<!--[if lte IE 9]><link rel="stylesheet" href="css/ie.css" type="text/css" media="screen" /><![endif]-->

	<!-- The 1140px Grid - http://cssgrid.net/ -->
	<link rel="stylesheet" href="css/1140.css" type="text/css" media="screen" />
	
	<!-- Your styles -->
	<link rel="stylesheet/less" href="css/style.less" type="text/css" media="screen" />
    <script src="js/libs/less-1.3.0.min.js" type="text/javascript"></script>
	
	<!--css3-mediaqueries-js - http://code.google.com/p/css3-mediaqueries-js/ - Enables media queries in some unsupported browsers-->
	<script type="text/javascript" src="js/css3-mediaqueries.js"></script>
</head>

<body>
    <div class="container">
        <header>
            <!-- Begin row 1 -->
            <div class="row">
                <div class="fivecol line"></div>
                <div class="twocol strapline" id="header1">
                    <p>"Keep the Cat Free"</p>
                </div>
                <div class="fivecol line last"></div>
            </div>
            <!-- End row 1 -->

            <!-- Begin header main -->
            <div class="row">
                <div class="twocol date">
                    <p><?php echo date('d.m.Y');?></p>
                </div>
                <div class="eightcol logocont">
                    <a href="<?php echo STANDARD_URL; ?>">
                        <div class="logo"> 
                            <img src="../../img/title.jpg"/>
                        </div>
                    </a>
                </div>
                <div class="twocol catPic last">
                    <img src="../img/felix_cat-small.jpg" width="100px" height="110px"/>
                </div>
            </div>
            <!-- End header main -->

            <!-- Begin header 2 -->
            <div class="row">
                <div class="threecol line"></div>
                <div class="sixcol strapline" id="header2">
                    <p>The student voice of Imperial College London since 1949</p>
                </div>
                <div class="threecol line last"></div>
            </div>
            <!-- End header 2 -->
        </header>
        <div role="main">

        </div>
        <footer>

        </footer>
    </div>
    <!-- JavaScript at the bottom for fast page loading -->

    <!-- Grab Google CDN's jQuery, with a protocol relative URL; fall back to local if offline -->
    <script src="//ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js"></script>
    <script>window.jQuery || document.write('<script src="js/libs/jquery-1.7.1.min.js"><\/script>')</script>

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

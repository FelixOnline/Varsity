<?php
    //define('STANDARD_URL', 'http://felixonline.co.uk/');
    require_once('inc/ez_sql_core.php');
    require_once('inc/ez_sql_mysql.php');
    require_once('inc/config.inc.php');
    require_once('core/baseModel.class.php');
    require_once('core/blog.class.php');
    $blog = new Blog('varsity-2015');
?>
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
    <link rel="stylesheet/less" href="css/foundation.css" type="text/css" media="screen" />
    <link rel="stylesheet/less" href="css/felix.css" type="text/css" media="screen" />
    <link href='https://fonts.googleapis.com/css?family=Alegreya+Sans:400,700,400italic,700italic|Noto+Serif:400,700,400italic,700italic|Sorts+Mill+Goudy:400,400italic' rel='stylesheet' type='text/css'>
    <link href='http://fonts.googleapis.com/css?family=Arimo:400,700,400italic,700italic&subset=latin,latin-ext' rel='stylesheet' type='text/css'>


    <!-- Your styles -->
    <link rel="stylesheet/less" href="css/style.less" type="text/css" media="screen" />
    <script src="js/libs/less-1.3.0.min.js" type="text/javascript"></script>

    <!--css3-mediaqueries-js - http://code.google.com/p/css3-mediaqueries-js/ - Enables media queries in some unsupported browsers-->
    <script type="text/javascript" src="js/css3-mediaqueries.js"></script>

    <script type="text/javascript">
        var _gaq = _gaq || [];
        _gaq.push(['_setAccount', 'UA-12220150-1']);
        _gaq.push(['_trackPageview']);

        (function() {
            var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
            ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
            var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
        })();
    </script>
</head>

<body>
    <div id="fb-root"></div>
    <script>(function(d, s, id) {
        var js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) return;
        js = d.createElement(s); js.id = id;
        js.src = "//connect.facebook.net/en_GB/all.js#xfbml=1&appId=200482590030408";
        fjs.parentNode.insertBefore(js, fjs);
        }(document, 'script', 'facebook-jssdk'));
    </script>

        <div class="felix-header felix-header-sport">
            <div class="row">
                <div class="medium-6 columns felix-header-actions">
                    <a href="http://www.felixonline.co.uk">Back to Felix Online</a>
                </div>
            </div>
        </div>

        <div class="felix-title felix-title-sport">
            <div class="row">
                <div class="medium-8 columns felix-title-logo">
                    <div>
                            <img src="img/logo.png" alt=""> 
                            <h1>Felix Live</h1>
                    </div>
                </div>
            </div>
        </div>

        <div role="main" id="main">
            <div class="row">
                <div class="medium-12 columns">
                    <div id="bg"></div>
                </div>
            </div>
            <!-- Masthead -->
            <div class="row">
                <div class="small-12 columns">
                    <div class="masthead">
                        <div class="row">
                            <div class="small-6 columns">
                                <div class="clearfix">
                                    <div class="socket-info clearfix">
                                        <p id="status" class="label radius">Connecting, please wait...</p>
                                        <p id="update" class="label radius secondary">Page updates automatically</p>
                                    </div>
                                </div>
                            </div>
                            <div class="small-6 columns">
                                <div class="clearfix">
                                    <div id="social-links">
                                        <div class="fb-like" data-send="true" data-layout="button_count" data-width="150" data-show-faces="false" data-font="arial"></div>
                                        <a href="https://twitter.com/share" class="twitter-share-button">Tweet</a>
                                        <script>!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0];if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src="//platform.twitter.com/widgets.js";fjs.parentNode.insertBefore(js,fjs);}}(document,"script","twitter-wjs");</script>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="row">
            </div>
            <div class="row">
                <div class="medium-8 columns">
                    <div class="sticky">
                    <?php if($blog->getSticky()) { ?>
                        <?php echo $blog->getSticky(); ?>
                    <?php } ?>
                    </div>
                    <div class="feed loading">
                    </div>
                </div>
                <div class="medium-4 columns sidebar">
                    <h3>Matches</h3>
                    <div class="matchlist">
                        <div id="jpr" class="cont"></div>
                        <h4>Finished</h4>
                        <div id="finished" class="cont"></div>
                        <h4>Coming up</h4>
                        <div id="coming" class="cont"></div>
                        <h4>Current</h4>
                        <div id="current" class="cont"></div>
                    </div>
                </div>
            </div>
        </div>
        <div class="felix-footer felix-footer-news">
            <div class="row">
                <div class="medium-12 columns text-center">
                    <div class="felix-nametype"><img alt="" src="img/white logo.png" style="width: 1.5em; height: 1.5em;">&nbsp;Felix</div>
                    <p><b>Felix</b> • Beit Quad • Prince Consort Road • London • SW7 2BB</p>
                    <p><b>Email:</b> <a href="mailto:felix@imperial.ac.uk">felix@imperial.ac.uk</a> • <b>Phone:</b> <a href="tel:02075948072">020 7594 8072</a> • <b>Twitter:</b> @<a href="http://www.twitter.com/FelixImperial">FelixImperial</a></p>
                    <p>Web design by Philippa Skett, Philip Kent, and Jonathan Kim • &copy; Felix Imperial, All Rights Reserved</p>
                </div>
            </div>
        </div>
    <!-- JavaScript at the bottom for fast page loading -->

    <!-- Grab Google CDN's jQuery, with a protocol relative URL; fall back to local if offline -->
    <script src="//ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js"></script>
    <script>window.jQuery || document.write('<script src="js/libs/jquery-1.7.1.min.js"><\/script>')</script>
    <script src="http://platform.twitter.com/widgets.js"></script>

    <script src="http://127.0.0.1:3000/socket.io/socket.io.js"></script>
    <script src="js/libs/template.js"></script>
    <script src="js/templates/template.js"></script>

    <!-- scripts concatenated and minified via build script -->
    <script src="js/config.js"></script>
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

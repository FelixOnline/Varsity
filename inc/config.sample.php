<?php
    $dbname = "media_felix";
    $host = "localhost";
    $user = "root";
    $pass = "password";

    /*
     * Change these urls to your local versions, e.g http://localhost/felix
     */
    define('STANDARD_SERVER', 'felixonline.co.uk');
    define('STANDARD_URL','http://felixonline.co.uk/');
    define('BASE_URL','http://felixonline.co.uk/');
    define('ADMIN_URL','http://felixonline.co.uk/engine/');
    define('AUTHENTICATION_SERVER','union.ic.ac.uk'); // authentication server
    define('AUTHENTICATION_PATH','https://union.ic.ac.uk/felix/'); // authentication path
    //define('RELATIVE_PATH','/preview'); // relative path from root

    define('PRODUCTION_FLAG', false); // if set to true css and js will be minified etc..
    define('LOCAL', false); // if true then site is hosted locally - don't use pam_auth etc.
    define('LOG_EMAILS', true); // log emails
    define('TIMING', false);

    //$cid = mysql_connect($host,$user,$pass);
    //$dbok = mysql_select_db($dbname,$cid);

    /* Initialise ezSQL database connection */
    $db = new ezSQL_mysql();
    $db->quick_connect($user,$pass,$dbname,$host);

    /* Set settings for caching (turned off by defualt) */
    // Cache expiry
    //$db->cache_timeout = 24; // Note: this is hours
    //$db->use_disk_cache = true;
    //$db->cache_dir = 'inc/ezsql_cache'; // Specify a cache dir. Path is taken from calling script
    //$db->show_errors();

    /*
     * To actually cache queries put this before any queries that you want to cache:
     *
     * $db->cache_queries = true;
     *  // db queries go here
     * $db->cache_queries = false;
     *
     * This will make sure that only the queries between the two commands will be cached.
     * ***Only cache queries if they are unlikely to change within the cache timeout***
     */

    /* Forces charset to be utf8 */
    if(is_resource($db->dbh)) {
        mysql_set_charset('utf8',$db->dbh);
    }
    /* turn off error reporting */
    error_reporting(0);
    /* to turn on error reporting uncomment line: */
    //error_reporting(E_ERROR | E_WARNING | E_PARSE);


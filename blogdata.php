<?php
/*
 * Blog data - JSON
 */

require_once('inc/ez_sql_core.php');
require_once('inc/ez_sql_mysql.php');
require_once('inc/config.inc.php');
require_once('core/baseModel.class.php');
require_once('core/user.class.php');
require_once('core/blog.class.php');
require_once('core/blogPost.class.php');

define('BLOG_POSTS_PER_PAGE', 10);

$blog = new Blog('varsity');
$output = array(
    'name' => $blog->getName()
);

foreach($blog->getPosts(1) as $key => $post) {
    $output['posts'][$key] = array(
        'content' => $post->getContent(),
        'timestamp' => $post->getTimestamp(),
        'type' => $post->getType(),
        'meta' => $post->getMeta()
    );
    // TODO
    $output['posts'][$key]['author'] = array(
        'name' => $post->getAuthor()->getName(),
        'uname' => $post->getAuthor()->getUser(),
        'url' => $post->getAuthor()->getURL() 
    );
}

header('Cache-Control: no-cache, must-revalidate');
header('Expires: Mon, 26 Jul 1997 05:00:00 GMT');
header('Content-type: application/json');

echo json_encode($output);
?>

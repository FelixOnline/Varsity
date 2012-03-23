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
require_once('core/match.class.php');

define('BLOG_POSTS_PER_PAGE', 10);

$blog = new Blog('tedx');
$output = array(
    'name' => $blog->getName(),
    'sticky' => $blog->getSticky(),
    'posts' => array()
);

foreach($blog->getPosts() as $key => $post) {
    if($post->getVisible() == 1) {
        $meta = unserialize($post->getMeta());
        $output['posts'][] = array(
            'id' => $post->getId(),
            'content' => $post->getContent(),
            'timestamp' => $post->getTimestamp(),
            'type' => $post->getType(),
            'meta' => $meta 
        );
    }
}

header('Cache-Control: no-cache, must-revalidate');
header('Expires: Mon, 26 Jul 1997 05:00:00 GMT');
header('Content-type: application/json');

echo json_encode($output);
?>

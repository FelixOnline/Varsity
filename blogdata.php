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

$blog = new Blog('varsity-2013');
$output = array(
    'name' => $blog->getName(),
    'sticky' => $blog->getSticky(),
    'posts' => array(),
    'matches' => array()
);

foreach($blog->getPosts() as $key => $post) {
    if($post->getVisible() == 1) {
        if($post->getId() > 0) {
            $meta = unserialize($post->getMeta());
            $output['posts'][] = array(
                'id' => $post->getId(),
                'content' => $post->getContent(),
                'timestamp' => $post->getTimestamp(),
                'type' => $post->getType(),
                'meta' => $meta 
            );
        } else {
            $output['posts'][] = array(
                'id' => $post->getId(),
                'content' => $post->getContent(),
                'timestamp' => $post->getTimestamp(),
                'type' => $post->getType(),
                'meta' => json_decode($post->getMeta(), true)
            );
        }
    }
}

$sql = "SELECT id FROM varsity ORDER BY start ASC";
$matches = $db->get_results($sql);

foreach($matches as $key => $object) {
    $match = new Match($object->id);
    $output['matches'][$key] = array(
        'id' => $match->getId(),
        'start' => $match->getStart(),
        'team1' => $match->getTeam1(),
        'team2' => $match->getTeam2(),
        'score1' => $match->getScore1(),
        'score2' => $match->getScore2(),
        'duration' => $match->getDuration(),
        'finished' => $match->getFinished(),
        'location' => $match->getLocation()
    );
}

header('Cache-Control: no-cache, must-revalidate');
header('Expires: Mon, 26 Jul 1997 05:00:00 GMT');
header('Content-type: application/json');

echo json_encode($output);

/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
function createTweetElement(){
  let $tweet = $("<article>").addClass("tweet");
  let $header = $("<header>");
  let $img = $("img").atrr("src",tweetData.user.avatars.small);
  let $author = $ ("author").text(tweetData.user.name);
  let $handler = $ ("handler").text(tweetData.user.handler);
  let $littleTweet = $("<p>").text(tweetData.content.text);
  let $footer      = $("<footer>");

  $('#tweets-container').append($tweet);
  $tweet.append($header);
  $header.append($img);
  $header.append($author);
  $header.append($handler);
  $tweetBody.append($littleTweet);
  $tweet.append($footer);

   return $tweet;
};





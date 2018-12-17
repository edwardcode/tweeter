//  Returns the DOM structure of a tweet
let lastFetched = new Date(0);

function createTweetElement(inputTweeter) {

//know the time countback method
  // var timeDiff = Math.floor(Date.now() - inputTweeter.created_at);
  // var time = 0;

  // if ((timeDiff / 1000) < 60) {
  //   time = Math.round(timeDiff/1000) + " seconds ago";
  // } else if (timeDiff / (1000*60) < 60) {
  //   time = Math.round(timeDiff / (1000*60)) + " minutes ago";
  // } else if (timeDiff / (1000*60*60) < 24) {
  //   time = Math.round(timeDiff / (1000*60*60)) +" hours ago";
  // } else {
  //   time = Math.round(timeDiff / (1000*60*60*24)) + " days ago";
  // }


  var $tweet = $(
    `<article class='tweet'>
       <header>
      <div class="userData">
        <img class="photo" src="${escape(inputTweeter.user.avatars.small) }">
        <h2>${escape(inputTweeter.user.name)}</h2>
      </div>
      <span>${escape(inputTweeter.user.handle)}</span>
    </header>
     <div class="tweetContent">
      <p>${escape(inputTweeter.content.text)}</p>
     </div>
      <footer>
      <p>${new Date(inputTweeter.created_at ).toDateString()}</p>
       <ul class="icons">
        <li><i class="far fa-flag"></i></li>
        <li><i class="fas fa-retweet"></i></li>
        <li><i class="fas fa-thumbs-up"></i></li>
      </ul>
      </footer>
    </article>`
  );

  return $tweet;
}


//watchout  xss
function escape(str) {
  var div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};













// Rmeber prepend not append
function renderTweets(tweets) {
  for (let tweetData of tweets){
    const $tweet = createTweetElement(tweetData);
    $("#tweet-container").prepend($tweet)
  }
};






//----------------------------

function loadTweets( ) {
  $.get("/tweets", function(tweets) {
      renderTweets(tweets);

  });
};

 // $.ajax('/tweets', { method: 'GET' })
 //    .then(function loadTweets() {
 //     tweets =>renderTweets(tweets);
 //    });




function showTheTweet(words) {
  $.post("/tweets", $(words).serialize(),function(){
    loadTweets();
  });
  $("section.new-tweet textarea").val("");
  $("section.new-tweet span.counter").text("140");
};







$(document).ready(function() {

  loadTweets();

  $("button.composeButton").on("click", function() {
    $("section.new-tweet").slideToggle() ;
    $("#new-tweet-content").focus();
  });


       // $("a").on("click",function(){
       //    if($("div").is(":hidden")){
       //      $("div").show();
       //   }else{
       //  $("div").hide();
       //   }
       //   })









   //only input >0,<140 can tweet
    $("section.new-tweet form").on("submit", function(event) {
      event.preventDefault();

    var errorMsg = $("div#error-msg");
    var tweetLength = $("section.new-tweet textarea").val().length;

    if (!tweetLength  ) {

      errorMsg.text("Share something to the world!").slideDown();
    } else if (tweetLength > 140) {

      errorMsg.text("Sorry 140 characters max").slideDown();
    } else {
      $("div#error-msg").slideUp()
      showTheTweet(this);
    }

  });
});
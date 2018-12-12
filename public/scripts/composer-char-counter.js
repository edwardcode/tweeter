"use strict";





$(document).ready(function() {
  // --- our code goes here ---
  $(".new-tweet textarea").keyup(function (){

    let $textarea = $( this);
    let $count = 140 - $textarea.val().length;
    let $counter = $(".counter");
    $counter.text($count);

    if ($count < 0) {
      $counter.css({"color": "red", "font-size": "100%"});
    } else {
      $counter.css({"color": "black", "font-size": "100%"});
    }

  });
})


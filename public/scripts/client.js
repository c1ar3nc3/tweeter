/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(() => {
  //used to safely render insecure text
  const escape =  function(str) {
    let div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  }

  //creates $tweet HTML data from "/tweet/" database
  const createTweetElement = tweetData => {
    const { userName, avatars, handle, content, createdAt } = tweetData;
    let $tweet = $(`
    <div class="tweet-card">
      <header>
        <div>
          <img src = ${tweetData.avatars}>
          <h2>${tweetData.userName}</h2>
        </div>
          <h2 id="tweet-handle">${tweetData.handle}</h2>
      </header>
        <p id="tweet-post">${escape(tweetData.content)}</p>
      <footer>
        <p>${tweetData.createdAt}</p>
        <div id="tweet-reacts">
          <i class="fas fa-flag"></i>
          <i class="fas fa-retweet"></i>
          <i class="fas fa-heart"></i>
        </div>
      </footer>
    </div>
    `)
    return $tweet;
  };

  //converts date from a timestamp to a readable format
  const getFormattedDate = function () {
    const date = new Date().toDateString();
    return date;
  }

  // loops through tweets
  // calls createTweetElement for each tweet
  // takes return value and appends it to the tweets container
  const renderTweets = tweetArray => {
    for (const post of tweetArray) {
      let newTweet = createTweetElement({
        userName: post.user.name,
        avatars: post.user.avatars,
        handle: post.user.handle,
        content: post.content.text,
        createdAt: getFormattedDate(post.created_at),
      });
      $(".all-tweets").prepend(newTweet);
    }
  };

  //will POST tweet to /tweets/ database
  //will give error messages if tweet is:  empty  || > 140 chars
  $("form").on("submit", function (event) {
    event.preventDefault();
    if ($('#tweet-text').val().length > 140) {
      $("#too-many").slideDown("fast");
    } else if ($('#tweet-text').val().length < 1) {
      $("#no-input").slideDown("fast");
    } else {
      const formData = $(this).serialize();
      $.post("/tweets/", formData)
        .then (function() {
          $.getJSON("/tweets")
          .then (data => {
            const newTweetArray = [];
            const currentTweet = data[data.length -1];
            newTweetArray.push(currentTweet);
            renderTweets(newTweetArray);
          })
        }
      )
    }
    $("form")[0].reset();
  });
 
  //GET to /tweets/, render new tweet to all-tweets
  const loadTweets = function() {
    $.get("/tweets/", function (data) {
      renderTweets(data);
    })
  };

  loadTweets();

});




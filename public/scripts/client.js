/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

 //test code, will eventually pull tweetData from server
// const tweetData = [
  // {
  //   "user": {
  //     "name": "Newton",
  //     "avatars": "https://i.imgur.com/73hZDYK.png"
  //     ,
  //     "handle": "@SirIsaac"
  //   },
  //   "content": {
  //     "text": "If I have seen further it is by standing on the shoulders of giants"
  //   },
  //   "created_at": 1461116232227
  // },
  // {
  //   "user": {
  //     "name": "Descartes",
  //     "avatars": "https://i.imgur.com/nlhLi3I.png",
  //     "handle": "@rd" },
  //   "content": {
  //     "text": "Je pense , donc je suis"
  //   },
  //   "created_at": 1461113959088
  // }
// ]


$(document).ready(() => {
  //creates $tweet HTML data from "/tweet/" database
  const createTweetElement = tweetData => {
    const { userName, avatars, handle, content, createdAt } = tweetData;
    let $tweet = $(`
      <header>
        <div>
          <img src = ${tweetData.avatars}>
          <h2>${tweetData.userName}</h2>
        </div>
          <h2 id="tweet-handle">${tweetData.handle}</h2>
      </header>
        <p id="tweet-post">${tweetData.content}</p>
      <footer>
        <p>${tweetData.createdAt}</p>
        <div id="tweet-reacts">
          <i class="fas fa-flag"></i>
          <i class="fas fa-retweet"></i>
          <i class="fas fa-heart"></i>
        </div>
        </footer>
    `)
    return $tweet;
  };

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
        createdAt: post.created_at,
      });
      $(".all-tweets").append(newTweet);
    }
  };

  //will POST tweet to /tweets/ database as an array
  //will give error messages if tweet is:  empty  || > 140 chars
  $("form").on("submit", function (event) {
    event.preventDefault();
    if ($('#tweet-text').val().length > 140) {
      alert("Max characters reached!")
    } else if ($('#tweet-text').val().length < 1) {
      alert("Tweet cannot be empty!")
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
  });

  //GET to /tweets/, render new tweet to webpage
  const loadTweets = function() {
    $.get("/tweets/", function (data) {
      renderTweets(data);
    })
  };

  loadTweets();

});




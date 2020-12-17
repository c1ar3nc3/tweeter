/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

 //test code, will eventually pull tweetData from server
const tweetData = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png"
      ,
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  }
]


$(document).ready(() => {

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
  renderTweets(tweetData);

});




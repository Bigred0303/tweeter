$(document).ready(function() {
    // Fake data
    const data = [
      {
        "user": {
          "name": "Newton",
          "avatars": "https://i.imgur.com/73hZDYK.png",
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
          "handle": "@rd"
        },
        "content": {
          "text": "Je pense , donc je suis"
        },
        "created_at": 1461113959088
      }
    ];
  
    // Create a tweet element from a tweet object
    const createTweetElement = function(tweet) {
      const { user, content, created_at } = tweet;
  
      // Convert the timestamp
      const date = new Date(created_at).toLocaleString();
  
      // HTML structure using template literals
      const $tweet = $(`
        <article class="tweet">
          <div class="user-info">
            <div class="left">
              <img src="${user.avatars}" alt="Profile Image">
              <h3>${user.name}</h3>
            </div>
            <span class="handle">${user.handle}</span>
          </div>
          <div class="tweet-content">
            <p>${content.text}</p>
          </div>
          <footer>
            <span class="timestamp">${date}</span>
            <div class="buttons">
              <button><i class="fas fa-heart"></i> Like</button>
              <button><i class="fas fa-retweet"></i> Retweet</button>
              <button><i class="fas fa-reply"></i> Reply</button>
            </div>
          </footer>
        </article>
      `);
  
      return $tweet;
    };
  
    // Render tweets
    const renderTweets = function(tweets) {
      // Empty the tweets container before adding new tweets
      const $tweetsContainer = $('#tweets-container');
      $tweetsContainer.empty();
  
      // Add each tweet to the tweets container
      tweets.forEach(tweet => {
        const $tweetElement = createTweetElement(tweet);
        $tweetsContainer.prepend($tweetElement);
      });
    };
  
    renderTweets(data);
  });

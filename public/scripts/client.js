$(document).ready(function() {
    // Create a tweet element from tweet object
    const createTweetElement = function(tweet) {
      const { user, content, created_at } = tweet;
  
      // Use timeago to format the timestamp
      const date = timeago.format(created_at);
  
      // Construct HTML structure using template literals
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
  
      tweets.forEach(tweet => {
        const $tweetElement = createTweetElement(tweet);
        $tweetsContainer.prepend($tweetElement); // Prepend to show the latest tweet first
      });
    };
  
    // Validate tweet
    const validateTweet = function(tweetText) {
      if (!tweetText) {
        alert('Tweet content cannot be empty.');
        return false;
      }
      if (tweetText.length > 140) {
        alert('Tweet content exceeds the maximum allowed length of 140 characters.');
        return false;
      }
      return true;
    };
  
    // Event listener for new tweet form submission
    $('#new-tweet-form').submit(function(event) {
      event.preventDefault();
  
      const $form = $(this);
      const tweetText = $form.find('#tweet-text').val().trim();
      const serializedData = $form.serialize();
  
      // Validate tweet content
      if (!validateTweet(tweetText)) {
        return;
      }
  
      $.ajax({
        url: '/tweets',
        method: 'POST',
        data: serializedData,
        success: function() {
          loadTweets();
          $form.trigger("reset"); // Clear the form after submission
        },
        error: function(error) {
          console.error('Error submitting tweet:', error);
        }
      });
    });
  
    // Function to fetch and render the latest tweets
    const loadTweets = function() {
      $.ajax({
        url: '/tweets',
        method: 'GET',
        success: function(tweets) {
          renderTweets(tweets);
        },
        error: function(error) {
          console.error('Error fetching tweets:', error);
        }
      });
    };
  
    // Initial load of tweets when the page is ready
    loadTweets();
  });
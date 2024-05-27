$(document).ready(function() {

    // Create a tweet element from tweet object
    const createTweetElement = function(tweet) {
      const { user, content, created_at } = tweet;
  
      // Use timeago to format the timestamp
      const date = timeago.format(created_at);
  
      // Construct HTML structure using jQuery and .text() to escape user input
      const $tweet = $(`
        <article class="tweet">
          <div class="user-info">
            <div class="left">
              <img src="${user.avatars}" alt="Profile Image">
              <h3></h3>
            </div>
            <span class="handle"></span>
          </div>
          <div class="tweet-content">
            <p></p>
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
  
      // Set text content to safely escape user input
      $tweet.find('h3').text(user.name);
      $tweet.find('.handle').text(user.handle);
      $tweet.find('.tweet-content p').text(content.text);
  
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
  
    // Function to validate tweet
    const validateTweet = function(tweetText) {
      if (!tweetText) {
        $('#error-message').text('Tweet content cannot be empty.').slideDown();
        return false;
      }
      if (tweetText.length > 140) {
        $('#error-message').text('Tweet content exceeds the maximum allowed length of 140 characters.').slideDown();
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
  
      // Hide the error message before validation
      $('#error-message').slideUp();
  
      // Validate tweet content
      if (!validateTweet(tweetText)) {
        return; // Do not submit the form if validation fails
      }
  
      $.ajax({
        url: '/tweets',
        method: 'POST',
        data: serializedData,
        success: function() {
          loadTweets();
          $form.trigger("reset"); // Clear the form after submission
          $form.find('.counter').text('140'); // Reset counter
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
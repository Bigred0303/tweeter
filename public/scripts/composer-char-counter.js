$(document).ready(function() {
    $('.new-tweet textarea').on('input', function() {
        let inputValue = $(this).val();
    
        
        let inputLength = inputValue.length;
        let counterElement = $(this).closest('.new-tweet').find('.counter');
    
        // Update the text of the counter element
        counterElement.text(140 - inputLength);

        if (inputLength > 140) {
            counterElement.addClass('counter-red');
          } else {
            counterElement.removeClass('counter-red');
          }
      });
  });
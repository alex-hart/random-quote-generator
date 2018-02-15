//This script sends an Ajax request to a server to acquire random quotes on design. It also includes code to send an Ajax request everytime the user presses the "New Quote" button and updates the webpage accordingly. Code has also been added so that when the user clicks on the "Tweet" button they are redirected to their Twitter with the quote ready to tweet.

$(document).ready(function() {
  //This is for loading a random quote on page load
  $.ajax({
    url:
      "https://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1&callback=",
    success: function(data) {
      var post = data.shift();
      $("#quote-title").text("- " + post.title);
      $("#quote-content").html(post.content);

      // If the source for the quote is available, use it. Otherwise hide it.
      if (
        typeof post.custom_meta !== "undefined" &&
        typeof post.custom_meta.Source !== "undefined"
      ) {
        $("#quote-source").html("Source:" + post.custom_meta.Source);
      } else {
        $("#quote-source").text("");
      }
    },
    //Making sure cache is false so that more random quotes can be generated upon clicking "New Quote"
    cache: false
  });

  //Generating another quote when the button is pressed
  $("#getQuote").on("click", function(e) {
    e.preventDefault();
    $.ajax({
      url:
        "https://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1&callback=",
      success: function(data) {
        var post = data.shift();
        $("#quote-title").html("- " + post.title);
        $("#quote-content").html(post.content);
        if (
          typeof post.custom_meta !== "undefined" &&
          typeof post.custom_meta.Source !== "undefined"
        ) {
          $("#quote-source").html("Source:" + post.custom_meta.Source);
        } else {
          $("#quote-source").html("");
        }
      },
      cache: false
    });
  });

  //Tweeting the quote when button is pressed
  $("#tweet-this").on("click", function() {
    var tweetQuote = $("#quote-content").text();
    var tweetTitle = $("#quote-title").text();
    window.open(
      'https://twitter.com/intent/tweet?text="' +
        tweetQuote +
        '"' +
        "   " +
        tweetTitle,
      "_blank"
    );
  });
});

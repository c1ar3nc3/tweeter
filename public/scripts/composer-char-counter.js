$(document).ready(function() {
  let maxLength = 140;
  $('textarea').keyup(function() {
    let counter = $(this).closest(".new-tweet").find(".counter");
    let textLength = $(this).val().length;
    let charsLeft = maxLength - textLength;
    counter.text(charsLeft);
    if (charsLeft < 0) {
      counter.addClass("negativeChar");
    } else {
      counter.removeClass("negativeChar");
      $(".err p").slideUp("fast");
    }
  })
});
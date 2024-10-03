$("document").ready(function () {
  let cardNum = 25;

  while (cardNum != 0) {
    var $newCard = $("<div></div>").addClass("card");
    var $front = $("<div></div>").addClass("card-front").text("Przód");
    var $back = $("<div></div>").addClass("card-back").text("Tył");

    $newCard.append($front, $back);

    $(".container").append($newCard);

    cardNum--;
  }

  let isCardFlippable = true;
  let isCardFlipped = false;
  let cardsFlipped = 0;
  let $prevCard;

  $(".card").click(function () {
    if (isCardFlippable) {
      cardsFlipped++;

      var $card = $(this);

      $card.addClass("is-flipped");

      if (cardsFlipped === 2) {
        isCardFlippable = false;

        setTimeout(function () {
          $card.removeClass("is-flipped");
          $prevCard.removeClass("is-flipped");

          isCardFlippable = true;
          cardsFlipped = 0;
        }, 1600);
      } else {
        $prevCard = $card;
      }
    }
  });
});

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function createCards(cardNum) {
  // tworzenie i dodawanie tabliczek do kontenera

  let rowSize = Math.sqrt(cardNum);
  var $container = $(".container");

  const colors = [
    "red",
    "blue",
    "green",
    "yellow",
    "purple",
    "orange",
    "cyan",
    "magenta",
  ];

  let cardColors = colors
    .slice(0, cardNum / 2)
    .concat(colors.slice(0, cardNum / 2));

  for (let i = cardColors.length - 1; i > 0; i--) {
    const j = getRandomInt(i + 1);
    [cardColors[i], cardColors[j]] = [cardColors[j], cardColors[i]];
  }

  for (let i = 0; i < cardNum; i++) {
    var $newCard = $("<div></div>").addClass("card");
    var $front = $("<div></div>").addClass("card-front"); //.text("Przód");
    var $back = $("<div></div>").addClass("card-back"); //.text("Tył");

    $newCard.attr("data-color", cardColors[i]);

    $newCard.append($front, $back);
    $container.append($newCard);
  }

  $container.css(
    "grid-template-columns",
    `repeat(${rowSize}, minmax(100px, 1fr)`
  );
}

let [milisec, sec, min, hrs] = [0, 0, 0, 0];

function displayTimer() {
  milisec++;

  if (milisec === 100) {
    sec++;
    milisec = 0;
    if (sec === 60) {
      min++;
      sec = 0;
    }
  }
  let m = min < 10 ? "0" + min : min;
  let s = sec < 10 ? "0" + sec : sec;
  let ms = milisec < 10 ? "0" + milisec : milisec;

  $(".timer").text(`${m}:${s}:${ms}`);
}

$("document").ready(function () {
  let cardNum = 16;
  let isCardFlippable = true;
  let cardsFlipped = 0;
  let isFirstMove = true;
  let movesNum = 0;
  let $prevCard;
  let prevColor;
  let timer;
  let matchedCards = 0;

  createCards(cardNum);

  $(".card").click(function handleCardClick() {
    if (isFirstMove) {
      isFirstMove = false;
      timer = setInterval(displayTimer, 10);
    }

    if (isCardFlippable) {
      var $card = $(this);

      let currColor = $card.attr("data-color");

      $card.find(".card-back").css("background-color", currColor);
      $card.addClass("is-flipped").off("click");

      cardsFlipped++;

      if (cardsFlipped === 2) {
        isCardFlippable = false;
        movesNum++;

        if (currColor === prevColor) {
          $prevCard = null;
          prevColor = null;
          isCardFlippable = true;
          cardsFlipped = 0;
          matchedCards++;
        } else {
          setTimeout(function () {
            $card.removeClass("is-flipped").on("click", handleCardClick);
            $prevCard.removeClass("is-flipped").on("click", handleCardClick);

            setTimeout(function () {
              $card.find(".card-back").css("background-color", "");
              $prevCard.find(".card-back").css("background-color", "");

              $prevCard = null;
              prevColor = null;
              isCardFlippable = true;
              cardsFlipped = 0;
            }, 500);
          }, 1000);
        }
      } else {
        $prevCard = $card;
        prevColor = currColor;
      }
    }

    $(".counter").text(movesNum);

    console.log(matchedCards);

    if (matchedCards === cardNum / 2) {
      clearInterval(timer);
      alert("Congratulations, you won!");
    }
  });
});

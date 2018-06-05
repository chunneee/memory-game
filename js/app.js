const icons = ['diamond', 'paper-plane-o', 'anchor', 'bolt', 'cube', 'bomb', 'leaf', 'bicycle', 'diamond', 'paper-plane-o', 'anchor', 'bolt', 'cube', 'bomb', 'leaf', 'bicycle'];

const deck = $('.deck');
const stars = $('.fa-star');
const timer = $('.timer');
const modal = $('.modal');

// Create the deck of cards on screen
const buildDeck = function() {
  deck.empty();
  let cards = shuffle(icons);
  for (let i = 0; i < cards.length; i++) {
    deck.append('<li class="card"><i class="fa fa-' + cards[i]+'"></i></li>');
  };
};

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
  let currentIndex = array.length, temporaryValue, randomIndex;

  while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
  }

  return array;
}

// Start the timer counting
const startTimer = function() {
  timeCount++;
  timer.html(timeCount);
  timeIncreases = setTimeout(startTimer, 1000);
};

//Resets stars when game is restarted
const resetStarRating = function() {
  $('.fa-star-o').attr('class', 'fa fa-star');
};

//Decreases star rating with moves
const starRating = function() {
  if (moves > 24 && moves < 32){
    stars.eq(2).removeClass('fa-star').addClass('fa-star-o');
  } else if (moves > 31 && moves < 40) {
    stars.eq(1).removeClass('fa-star').addClass('fa-star-o');
  }
  else if (moves > 39) {
    stars.eq(0).removeClass('fa-star').addClass('fa-star-o');
  }
};
// Increments moves counter with each valid click
const movesCounter = function() {
  moves++;
  $('.moves').text(moves);
};

// Increments match counter as cards are matched
const matchMade = function() {
  matched++;
};

// Turn cards over and check cards if cards are clicked
const clickCard = function() {
  if (!($(this).hasClass('show')||$(this).hasClass('match'))) {
  movesCounter();
  starRating();
  if (openCards.length < 2) {
    $(this).toggleClass('open show');
    openCards.push($(this).children().attr('class'));
  }
  if (openCards.length === 2) {
    setTimeout(checkCards, 500);
  }
}
};

// Check if open cards are a match
const checkCards = function() {
  if (openCards[0] === openCards[1]) {
    if (openCards.length === 2) {
      deck.find('.open').toggleClass('open show match');
      matchMade();
    }
   } else {
    deck.find('.open').toggleClass('open show');
  };
  openCards = [];
  if (matched === 8) {
    showModal();
  }
};

// If game is completed, show modal
const showModal = function() {
  $('.num-stars').html($('.fa-star').length);
  clearTimeout(timeIncreases);
  modal.css("display", "block");
};

// Reset everything to start new game
const resetGameMetrics = function() {
  openCards = [];
  matched = 0;
  moves = 0;
  $('.moves').html(moves);
  resetStarRating();
  buildDeck();
  modal.css ("display", "none");
  $('.card').click(clickCard);
  timeCount = 0;
};

const newGame = function() {
  resetGameMetrics();
  startTimer();
};

$(document).ready(newGame());
$('.restart').click(resetGameMetrics);
$('.new-game').click(newGame);

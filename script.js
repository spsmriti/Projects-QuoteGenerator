const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const twitterBtn = document.getElementById("twitter");
const newQuoteBtn = document.getElementById("new-quote");
const loader = document.getElementById("loader");

let apiQuotes = [];

// Show loading
function loading() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}

// Hide Loading

function complete() {
  quoteContainer.hidden = false;
  loader.hidden = true;
}

// show New Quote
function newQuote() {
  loading();

  // Pick a random Quote from apiQuotes array
  const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
  
  // check if author field is blank and replace it with 'Unknown'
  if (!quote.author) {
    authorText.textContent = "Unknown";
  } else {
    authorText.textContent = quote.author;
  }

  // check the quote length to determine the styling
  if (quote.text.length > 120) {
    quoteText.classList.add("long-quote");
  } else {
    quoteText.classList.remove("long-quote");
  }
  
  // Set Quote, Hide Loader
  quoteText.textContent = quote.text;
  complete();
  
  //   authorText.textContent = quote.author;
  quoteText.textContent = quote.text;
  //   console.log(quote);
}

//Get Quotes From API
async function getQuotes() {
  loading();
  const apiUrl = "https://type.fit/api/quotes";
  // const apiUrl = "https:///www.brainyquote.com/nationality/quotes-by-indian-authors";
  try {
    const response = await fetch(apiUrl);
    apiQuotes = await response.json();
    //console.log(apiQuotes[6])
    newQuote();
  } catch (error) {
    // Catch Error Here
  }
}

// Tweet a quote
  function tweetQuote() {
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.tet}`;
  window.open(twitterUrl, "_blank");
}

// Event Listeners
newQuoteBtn.addEventListener("click", newQuote);
twitterBtn.addEventListener("click", tweetQuote);
//onload
getQuotes();

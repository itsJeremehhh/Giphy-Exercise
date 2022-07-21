const $gifArea = $("#gif-area"); //this is the same as DOM, lays out where the images go
const $searchInput = $("#search"); //this is where we find the search button

/* use ajax result to add a gif */

function addGif(res) {
  let numResults = res.data.length;
  if (numResults) {
    let randomIdx = Math.floor(Math.random() * numResults);
    let $newCol = $("<div>", { class: "col-md-4 col-12 mb-4" });
    let $newGif = $("<img>", {
      src: res.data[randomIdx].images.original.url,
      class: "w-100"
    });
    $newCol.append($newGif); //creates the giph placement 
    $gifArea.append($newCol);//places the giph in the area
  }
}

/* handle form submission: clear search box & make ajax call */
//this function connects the gipgy API to our code
$("form").on("submit", async function(evt) {
  evt.preventDefault();

  let searchTerm = $searchInput.val(); //this translate our text in search 
  $searchInput.val("");//this will insert what we searched into the gyphy API

  const response = await axios.get("http://api.giphy.com/v1/gifs/search", {
    params: {
      q: searchTerm,
      api_key: "MhAodEJIJxQMxW9XqxKjyXfNYdLoOIym"
    }
  });
  addGif(response.data);
});

/* remove gif */

$("#remove").on("click", function() {
  $gifArea.empty();
});
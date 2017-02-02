$(document).ready(function() {
  document.getElementById("clear").style.display = "none";
});


// get data from form and trigger wikipedia search
function getFormData(){
  var search = document.getElementById('search').value;
  getWikipediaData(search);
}

// Pull data from wikipedia api
function getWikipediaData(search) {
  var output = $.ajax({
    url: "https://en.wikipedia.org/w/api.php?action=query&format=json&origin=*&generator=search&prop=extracts&exintro&explaintext&exsentences=1&exlimit=max&gsrsearch=" + search + "&gsrlimit=10&utf8=",
    type: 'POST',
    data: {},
    dataType: 'json',
    headers: { 'Api-User-Agent': 'CodePen Exercise/1.1 (https://codepen.io/anewdev/pen/dNmNKJ; iam@anewdev.io)' },
    success: function(data) {
      // if data pull successful, trigger getDetails function with the pulled data
      displayResults(data.query.pages);
      hideSearchBox();
    },
    error: function(err) { alert(err); },
  });
};

// display the results

function displayResults(object) {
  var node = "";
  for (var variable in object) {
    var pageLink = "https://en.wikipedia.org/?curid=" + object[variable].pageid;
    node += "<a href=" + pageLink + " class=" + "list-group-item active" + " target=" + "_blank" + "><h4 class=" + "list-group-item-heading" + ">" + object[variable].title + "</h4><p class=" + "list-group-item-text" + ">" + object[variable].extract + "</p></a>";
    document.getElementById("data").innerHTML = node;
  };
};

function hideSearchBox() {
  document.getElementById("searchBox").style.display = "none";
  document.getElementById("random").style.display = "none";
  document.getElementById("clear").style.display = "inline";
};

function showSearchBox() {
  document.getElementById("data").innerHTML = "";
  document.getElementById("searchBox").style.display = "inline";
  document.getElementById('search').value = "";
  document.getElementById("random").style.display = "inline";
  document.getElementById("clear").style.display = "none";
};

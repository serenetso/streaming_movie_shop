//SEARCH FUNCTION Starts
    function searchMovie() {

        $("#searchResult").html("");

        var searchInput = document.getElementById("searchInputField"); //$("#searchInputField");

        var searchUrl = "http://medieinstitutet-wie-products.azurewebsites.net/api/search?searchText=";

        var resultUrl = searchUrl + searchInput.value;

        //console.log(resultUrl);



        $.getJSON( resultUrl, function( data ) {
            //console.log(data);

            var items = [];

            $.each( data, function( index, val ) {
                items.push("<li>" 
                    + "<a href='productPage.html?movie=" + val.id + "'>" 
                    + "<img src= '" + val.imageUrl + "' >"
                    + "<span class='stext'>" + val.name + "</span>"
                    + "</a>"
                    + "</li>");
                    });

                    $( "<ul/>", { "class": "my-new-list", html: items.join( "" )})
                .appendTo($("#searchResult"));
            });
    }
    //SEARCH FUNCTION ends


$(document).ready(function () {
    
    function getParameterByName( name, url ){
  name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
  var regexS = "[\\?&]"+name+"=([^&#]*)";
  var regex = new RegExp( regexS );
  var results = regex.exec( window.location.href );
  if( results == null )
    return "";
  else
    return decodeURIComponent(results[1].replace(/\+/g, " "));
};
    
 var selectedMovieId = getParameterByName("movie");
    
        $.getJSON("http://medieinstitutet-wie-products.azurewebsites.net/api/products", function (moviesData) {
        console.log(moviesData);
        
        $.getJSON("http://medieinstitutet-wie-products.azurewebsites.net/api/categories", function (categories) { 
        
        console.log(categories);
            })

/*function createAllDiv() {*/
for (var i = 0; i < moviesData.length; i++) {
    if(selectedMovieId == moviesData[i].id) {
    
        var secondContainer = $("<div>")
                    .addClass("secondContainer")
                    .insertBefore("#footerId");

        var imgDiv = $("<div>")
                    .addClass("col-md-5")
                    .attr("id", "imgDivId")
					.appendTo(secondContainer);
					
    
                $("<img>")
                    .attr("src", moviesData[i].imageUrl)
                    .addClass("filmImgSelected")
                    .appendTo(imgDiv);
    
        var thirdContainer =  $("<div>")
                    .addClass("col-md-7")
                    .attr("id", "thirdContainer")
                     .appendTo(secondContainer);
        
                $("<div>")
                    .attr("id", "filmTitleDiv")
                    .addClass("col-md-12")
                    .appendTo(thirdContainer);

               $("<span>")
                    .addClass("filmTitleSpan")
                    .text(moviesData[i].name)
                    .appendTo("#filmTitleDiv");
    
    
                 $("<div>")
                    .attr("id", "genreGenre")
                    .addClass("col-md-12")
                    .appendTo(thirdContainer);
        
                 $("<span>")
                    .addClass("filmGenreSpan")
                    .text(moviesData[i].name)
                    .appendTo("#genreGenre");
        
                 $("<span>")
                .addClass("filmYearSpan")
                .text(moviesData[i].year)
                .appendTo("#genreGenre");
    
                 $("<div>")
                    .attr("id", "movieInfo")
                    .addClass("col-md-12")
                    .appendTo(thirdContainer);
        
                 $("<span>")
                    .addClass("filmDescriptionSpan")
                    .text(moviesData[i].description)
                    .appendTo("#movieInfo");
        
                $("<div>")
                    .attr("id", "buy")
                    .addClass("col-md-12")
                    .appendTo(thirdContainer);


					$("<button>")
                    .attr({ id: moviesData[i].id, type: "button" }).text("Köp för " + moviesData[i].price + " kr")
                    .addClass("addMovie")
                    .appendTo("#buy");
					
    
    $(".addMovie").click(function () {
            console.log("hej");
			

            var ordersFromLs = [];

            if (localStorage.getItem("orders") != null) {
                ordersFromLs = JSON.parse(localStorage.getItem("orders"));
				alert("Din vara har lagts till i varukorgen");
            }

            console.log($(this).attr("id"));
            ordersFromLs.push({ ProductId: $(this).attr("id"), Amount: 1 });



            localStorage.setItem("orders", JSON.stringify(ordersFromLs));
        });
    
   
             }}  

})
})

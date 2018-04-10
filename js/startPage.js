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

    $.getJSON("http://medieinstitutet-wie-products.azurewebsites.net/api/products", function (moviesData) {
        $.getJSON("http://medieinstitutet-wie-products.azurewebsites.net/api/categories", function (categories) {

            $(categories).each(function (index, category) {

                var categoryContainer = $("<div>")
                    //.attr("id", category.id)
                    .attr("class", "categoryOverallContainer")
                    .appendTo("#entireBodyDivId");

                $("<div>")
                    //.attr("id", category.id)
                    .attr("class", "spanInCategoryOverallContainer")
                    .html(category.name)
                    .appendTo(categoryContainer);

                var moviesContainerPerCategory = $("<div>")
                    //.attr("id", category.id)
                    .attr("class", "productsInCategoryOverallContainer")
                    .appendTo(categoryContainer);


                // Skapa upp div för karuseller här

                var carouselSlide = $("<div>")
                    .attr("id", "genreCategory_" + category.id)
                    .attr("class", "carousel")
                    .addClass("slide")
                    .attr("data-ride", "carousel")
                    .attr("data-interval", "false") //stop autoplay
                    .appendTo(moviesContainerPerCategory);

                var carouselInner = $("<div>")
                    .addClass("carousel-inner")
                    .appendTo(carouselSlide);

                var controlPrev = $("<a>")
                    .addClass("left carousel-control")
                    .attr("href", "#genreCategory_" + category.id)
                    .attr("data-slide", "prev")
                    .appendTo(carouselSlide);

                $("<span>")
                    .addClass("glyphicon glyphicon-chevron-left")
                    .appendTo(controlPrev);

                var controlNext = $("<a>")
                    .addClass("right carousel-control")
                    .attr("href", "#genreCategory_" + category.id)
                    .attr("data-slide", "next")
                    .appendTo(carouselSlide);

                $("<span>")
                    .addClass("glyphicon glyphicon-chevron-right")
                    .appendTo(controlNext);

                for (var i = 0; i < moviesData.length; i++) {
                    if (i == 0) {
                        var item = $("<div>")
                            .addClass("item active")
                            .appendTo(carouselInner);
                        
                    }
                    else {
                        var item = $("<div>")
                            .addClass("item")
                            .appendTo(carouselInner);
                    }
                    
                  // var responsiv = $(window).width(min-width  768)
                    
                    if (document.documentElement.clientWidth > 1024) {
                            // scripts
                        }


                    for (var j = 0; j < 5; j++) {
                        if (moviesData.length > i) {
                            var addThisMovie = false;
                            
                            for (var k = 0; k < moviesData[i].productCategory.length; k++) {
                                if (moviesData[i].productCategory[k].categoryId == category.id) {
                                    addThisMovie = true;
                                }
                            }

                            if (addThisMovie == true) {
                                var img = $("<img>")
                                    .addClass("imgClass")
                                    .attr("id", moviesData[i].id)
                                    .attr("src", moviesData[i].imageUrl)
                                    .appendTo(item);
                                
                                var moviePrice = $("<span>")
                                    .addClass("moviePrice")
                                    .html(moviesData[i].price)
                                    .appendTo(item);
                                
                            }
                            else {
                                j--;
                            }
                            
                        }

                        i++;
                        $("img.imgClass").on("click", function () {
                                window.location.href = "productPage.html?movie=" + this.id; });
                                   
                                   
                                };
                    
                    }
                    
                })

                $('#genreCategory_' + categories.id).carousel({
                    interval: false
                });
                
                
            })
        })
    
    
    });





    /*End of Ajax*/


       
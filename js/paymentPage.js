function getParameterByName(name, url) {
   if (!url) url = window.location.href;
   name = name.replace(/[[]]/g, "\$&");
   var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
       results = regex.exec(url);
   if (!results) return null;
   if (!results[2]) return '';
   return decodeURIComponent(results[2].replace(/+/g, " "));
}

$(document).ready(function () {


function getDateTime() {
        var dateTime    = new Date();
        dateTime.setHours(dateTime.getHours()+1);
        return dateTime;
        console.log(dateTime);
    }

    $("#buttonBuy").on("click", ValidateButton);
function ValidateButton() {

        var firstName5 = document.getElementById("resultOfFirstName").value;

        var lastName5 = document.getElementById("lastName").value;

        var phoneNumber5 = document.getElementById("resultOfPhoneNumber").value;

        var email5 = document.getElementById("resultOfEmailAddress").value;

        var radioButton5 = $("input:radio[name ='example']:checked").val();

       // alert(radioButton5);

            //Här kommer regular expressions för validering

        //var emailReg = /^\w+@[a-zA-Z_]+?.[a-zA-Z]{2,3}$/;
        var phoneno = /^\d{10}$/;


if( firstName5 ==='' || lastName5 ==='' || phoneNumber5 ==='' || email5 ===''){
        alert("Fyll i alla obligatoriska fält.");
        return false;
    }

else if(!(email5).match(emailReg)){
        alert("Ange rätt email!");
        return false;
    }
else if (!(phoneNumber5).match(phoneno))
        {
        alert("Ange rätt telefon nummer!");
        return false;
        }
else 
{   $("#buttonBuy").on("click", sendApiToSebastian);
        }
 

function sendApiToSebastian() {
    var sendSebastionHisApi = {
      CompanyId: 77,
      Created: getDateTime(),
      CreatedBy: email5,
      TotalPrice: 1000,
      Status: 1,
      PaymentMethod: radioButton5,
      OrderRows: [] //Sista har ingen ","
    };

    //Vi har ingen order som vi kan framkalla från localstorage
 for (var i = 0; i < order.length; i++) {


      sendSebastionHisApi.OrderRows.push({
        ProductId: order[i].Id,
        Amount: order[i].count
      });
    }
    return sendSebastionHisApi;
  }
$.ajax({
        method: "POST",
        url: "https://medieinstitutet-wie-products.azurewebsites.net/api/orders",
        data: JSON.stringify(sendApiToSebastian()),
        contentType: "application/json; charset=utf-8",
        headers: {
          accept: "application/json"
        },
        success: function(result) {
          localStorage.clear(order);
          $("#myModal").modal("show");
          localStorage.clear(order);
          window.location.href = 'start.html';
        },
        error: function(error) {

        }
      })
    }
    
});


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
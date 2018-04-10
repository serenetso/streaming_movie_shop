$(document).ready(function () {

    $.getJSON( "http://medieinstitutet-wie-products.azurewebsites.net/api/orders?companyId=42", function( orderData ) {
                //console.log(data);
        
        var lists = "";
        

            for (var i= 0; i < orderData.length; i++){


                lists += "<li> companyId: " + orderData[i].companyId + "</li>";
                lists += "<li> created: " + orderData[i].created + "</li>";
                lists += "<li> createdBy: " + orderData[i].createdBy + "</li>";
                lists += "<li> paymentMethod: " + orderData[i].paymentMethod + "</li>";
                lists += "<li> totalPrice: " + orderData[i].totalPrice + "</li>";
                //lists += "<li> status: " + orderData[i].status + "</li>";
                lists += "<li id='oRow'> orderRow: <ul>";
                

                for (var j= 0; j < orderData[i].orderRows.length; j++){ //gör en ul-li i ordersRows ul-li!

                    //var olists = "";

                   // lists += "<li> amount: " + orderData[i].orderRows[j].amount + "</li>";
                    //lists += "<li> id: " + orderData[i].orderRows[j].id + "</li>";
                   // lists += "<li> orderId: " + orderData[i].orderRows[j].orderId + "</li>";
                   // lists += "<li> product: " + orderData[i].orderRows[j].product + "</li>";
                    lists += "<li> orderId: " + orderData[i].orderRows[j].orderId + "</li>";

                    $.ajax({
                        url: "http://medieinstitutet-wie-products.azurewebsites.net/api/products/" + orderData[i].orderRows[j].productId,
                        dataType: "json",
                        async: false,
                        success: function(product) {
                            console.log(product.name);
                            lists += "<li> Titel: " + product.name + "</li>";
                        }
                    });
                    
                }
                lists += "</ul></li>";
          
                
                lists += "<br> <hr>";
                //olists += "<br>";
            }      

                var htmlToAdd = "<ul>" + lists + "</ul>";
                //var ohtmlToAdd = "<ul>" + olists + "</ul>";

                document.getElementById("adminContainer").innerHTML = htmlToAdd;
                //document.getElementById("oRow").innerHTML = ohtmlToAdd;
      
    });
})

//Om man klickar button på vänster sidan körs den här funktionen

function generateUserInfo() {

        getAllUsers();

        var myCreationButton = document.getElementById("myCreationButtonId");

        var table = document.getElementById("tableId");

 for (var i in resultsOfAllDance) {


if(resultsOfAllDance[i] != null) {
        console.log(resultsOfAllDance[i]);

for (var j = 0; j < resultsOfAllDance[i].length; j++) {
        var row = table.insertRow();

        var tableRow = document.createElement("tr");
        tableRow.innerHTML += i;

//Här sättar jag in cell till min row
        var firstNameCell9= row.insertCell(0);
        var lastNameCell9 = row.insertCell(1);
        var phoneNumberCell9= row.insertCell(2);
        var emailCell9 = row.insertCell(3);
        var danceLevelCell9 = row.insertCell(4);
        var commentCell9 = row.insertCell(5);
        var teacherCell9= row.insertCell(6);
        var selectedDanceLessonCell9= row.insertCell(7);
firstNameCell9.innerHTML = "Förnamn: " + "<br>" + resultsOfAllDance[i][j].firstName;
        lastNameCell9.innerHTML= "Efternamn: " +  "<br>" + resultsOfAllDance[i][j].lastName;
        phoneNumberCell9.innerHTML= "Telefonnummer: " +  "<br>" + resultsOfAllDance[i][j].phone;
        emailCell9.innerHTML= "Mejl Adress: " +  "<br>" + resultsOfAllDance[i][j].email;
        danceLevelCell9.innerHTML= "Dans Nivå: " +  "<br>" + resultsOfAllDance[i][j].danceLevel;
        commentCell9.innerHTML= "Kommentarer: " +  "<br>" + resultsOfAllDance[i][j].comment;
        teacherCell9.innerHTML= "Lärare: " +  "<br>" + resultsOfAllDance[i][j].teacher;
        selectedDanceLessonCell9.innerHTML= "Kurs: " +  "<br>" + resultsOfAllDance[i][j].selectedDanceCourse;

        tableRow.appendChild(selectedDanceLessonCell9);
        tableRow.appendChild(firstNameCell9);
        tableRow.appendChild(lastNameCell9);
        tableRow.appendChild(phoneNumberCell9);
        tableRow.appendChild(emailCell9);
        tableRow.appendChild(danceLevelCell9);
        tableRow.appendChild(commentCell9);
        tableRow.appendChild(teacherCell9);


        table.appendChild(tableRow);
         };
        };
    };

        table.style.display = "block";
        myCreationButton.style.display = "none";

};


//Om man klickar button på höger sidan körs den här funktionen
function generateNewActivity() {

     location.href = "createNewActivity.html";

};
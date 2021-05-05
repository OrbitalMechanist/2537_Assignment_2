function updateTable() {
    $.ajax({
        url: "/request-db",
        dataType: "json",
        type: "GET",
        success: function (data) {

            console.log("Data returned from MySQL", data);

            let t = "<table><tr><th> First Name </th><th> Last Name </th><th> Email </th><th> Vehicle </th><th> Verified </th></tr>";
            for (let i = 0; i < data.msg[1].length; i++) {
                let user = data.msg[1][i];
                console.log(user.first_name, user.last_name, user.email, user.vehicle, user.verified);

                t += "<tr><td>" + user.first_name + "</td><td>" +
                    user.last_name + "</td><td>" +
                    user.email + "</td><td>" +
                    user.vehicle + "</td><td>" +
                    user.verified + "</td></tr>";
            }
            t += "</table>";
            let div = $("#members");
            div.html(t);


        },
        error: function (jqXHR, textStatus, errorThrown) {
            $("#p1").text(textStatus + " " + errorThrown +
                jqXHR.responseText);
        }
    });
}

$(document).ready(updateTable());

$('#submit').click(function (e) {
    e.preventDefault();

    let dataToSend = {
        first_name: $("#fname").val(),
        last_name: $("#lname").val(),
        email: $("#email").val(),
        model: $("#vehicle").val(),
        verified: $("#verified").val()
    };
    $("#fname").val("");
    $("#lname").val("");
    $("#email").val("");
    $("#vehicle").val("");
    $("#verified").val("");

    console.log(dataToSend);

    $.ajax({
        url: '/add-member-db',
        dataType: "json",
        type: "POST",
        data: dataToSend,
        success: function (data) {
            updateTable();
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log("Problem on Client");
            console.log("ERROR:", jqXHR, textStatus, errorThrown);
        }
    })
})
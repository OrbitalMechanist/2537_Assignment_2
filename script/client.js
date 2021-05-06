function updateTable() {
    $.ajax({
        url: "/request-db",
        dataType: "json",
        type: "GET",
        success: function (data) {

            console.log("Data returned from MySQL", data);

            let t = '<table id="dataTable"><tr><th> First Name </th><th> Last Name </th><th> Email </th><th> Vehicle </th><th> Verified </th></tr>';
            for (let i = 0; i < data.msg[1].length; i++) {
                let user = data.msg[1][i];
                console.log(user.first_name, user.last_name, user.email, user.vehicle, user.verified);

                t += '<tr class="tableRow" id="' + data.msg[1][i].ID + '"><td class = "first_name"><span>' + user.first_name + '</span></td><td class = "last_name"><span>' +
                user.last_name + '</span></td><td class = "email"> <span>' +
                user.email + '</span></td><td class = "model"><span>' +
                user.vehicle + '</span></td><td class = "verified"><span>' +
                user.verified + "</span></td></tr>";
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

$('#members').on("click", "span", function () {
    console.log("clicked");
    console.log($(this).attr('class'));

    let initialText = $(this).text();
    let num = $(this).parent().parent().attr('id');
    let field = $(this).parent().attr('class');
    let input = $("<input type='text' value='" + initialText + "'>");
    let parent = $(this).parent();

        parent.html(input);
    $(input).keyup(function (e) {
        let val = null;
        let span = null;
        if (e.which == 13) { // 13 = Enter key
            val = $(input).val();
            span = $("<span>" + val + "</span>");
            parent.html(span);

            let resultData = {
                data: val,
                field: field,
                target_id: num
            };
            //console.log(dataToSend);
            $.ajax({
                url: "/modify-member-db",
                dataType: "json",
                type: "POST",
                data: resultData,
                success: function (data) {
                    updateTable();
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    console.log("ERROR:", jqXHR, textStatus, errorThrown);
                }

            });

        }

    });

});
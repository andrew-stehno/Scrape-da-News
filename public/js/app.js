$(document).ready(() => {
  $(".scrape").on("click", () => {
    $.ajax({
      method: "GET",
      url: "/scrape"
    }).then(data => {
      console.log(data);
      location.reload();
    });
  });

  $(".note").on("click", function() {
    $("#notes-here").empty();
    const thisId = $(this).attr("data-id");
    console.log(this);
    $.ajax({
      method: "GET",
      url: "/articles/" + thisId
    }).then(data => {
      console.log(data);

      const noteCard = $("<div>").addClass("card card-notes");
      const cardBody = $("<div>").addClass("card-body");

      cardBody.append("<h2>" + "Article Notes" + "</h2>");
      cardBody.append("<h3>" + data.title + "</h3>");
      cardBody.append("<input id='titleinput' name='title' ><br>");
      cardBody.append("<textarea id='bodyinput' name='body'></textarea><br>");
      cardBody.append(
        "<button data-id='" +
          data._id +
          "' type='button' class='btn btn-danger save-note'>Save Note</button>"
      );
      noteCard.append(cardBody);
      $("#notes-here").append(noteCard);
    });
  });

  $(document).on("click", ".save-note", function() {
    const thisId = $(this).attr("data-id");

    $.ajax({
      method: "POST",
      url: "/articles/" + thisId,
      data: {
        title: $("#titleinput").val(),
        body: $("#bodyinput").val()
      }
    }).then(data => {
      console.log(data);
    });
  });
});

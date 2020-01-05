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
    $.ajax({
      method: "GET",
      url: "/articles/" + thisId
    }).then(data => {
      console.log(data);

      // Dynamically create a card to display text area for adding a note:
      const noteCard = $("<div>").addClass("card card-notes");
      const cardBody = $("<div>").addClass("card-body");

      cardBody.append("<h2>" + "Article Notes" + "</h2>");
      cardBody.append("<h3>" + data.title + "</h3>");
      cardBody.append("<input id='titleinput' placeholder='Title' ><br>");
      cardBody.append(
        "<textarea id='bodyinput' placeholder='Notes'></textarea><br>"
      );
      cardBody.append(
        "<button data-id='" +
          data._id +
          "' type='button' class='btn btn-danger save-note'>Save Note</button>"
      );

      noteCard.append(cardBody);
      $("#notes-here").append(noteCard);

      // Dynamically create a card to display saved notes:
      const savedNoteCard = $("<div>").addClass("card saved-notes");
      const savedCardBody = $("<div>").addClass("card-body");

      savedCardBody.append("<h2>" + "Saved notes for this article" + "</h2>");
      savedCardBody.append("<h4>" + data.note.title + "</h4>");
      savedCardBody.append("<h5>" + data.note.body + "</h5>");
      savedCardBody.append(
        "<button class='btn btn-danger delete-note' data-id='" +
          data.note._id +
          "' style='float: right'>Delete</button>"
      );
      savedNoteCard.append(savedCardBody);
      $("#notes-here").append(savedNoteCard);
    });
  });

  $(document).on("click", ".save-note", function() {
    const thisId = $(this).attr("data-id");

    $.ajax({
      method: "POST",
      url: "/articles/" + thisId,
      data: {
        title: $("#titleinput")
          .val()
          .trim(),
        body: $("#bodyinput")
          .val()
          .trim()
      }
    }).then(data => {
      console.log(data);
    });
  });
  
  $(document).on("click", ".delete-note", function() {
    const thisId = $(this).attr("data-id");
    $.ajax({
      method: "GET",
      url: "/delete/" + thisId,
      success: location.reload()
    });
  });
});

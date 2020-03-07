$(document).ready(() => {
    var currentId = "";

    $('.row-card').on('click', "h5.card-title", function () {
        console.log($(this).data('link'));
        let link = $(this).data('link');
        window.open(link, '_blank');
    });

    $('.row-card').on('click', "p.card-text", function () {
        console.log($(this).data('link'));
        let link = $(this).data('link');
        window.open(link, '_blank');
    });

    $('.row-card').on('click', "a.save-btn", function () {
        var link = $(this).parent().find('.card-title').data('link');
        var heading = $(this).parent().find('.card-title').text();
        var info = $(this).parent().find('.card-text').text();
        console.log('HEADING: ' + heading
            + '\n\nINFO: ' + info
            + '\n\nLINK: ' + link
        );

        var articleData = {
            link,
            heading,
            info
        }

        $(this).parent().parent().remove();
        $('#saveArticleModal').modal('show');

        $.ajax({
            url: "/saved",
            type: "POST",
            data: articleData
        })
    });

    $('.btn-scraper').on('click', event => {
        event.preventDefault();
        $('.row-card').empty();
        $('.jumbotron').remove();

        $.ajax({
            url: "/scrape",
            type: "GET",
            success: (data) => {
                $('#scrapeModal').modal('show');
                for (var i = 0; i < data.length; i++) {
                    var cardDiv = $('<div>');
                    var cardbodyDiv = $('<div>');
                    var cardTitle = $('<h5>');
                    var cardText = $('<p>');
                    var saveBtn = $('<a>');
                    cardDiv.addClass('card col-sm-5');
                    cardbodyDiv.addClass('card-body');
                    cardTitle.addClass('card-title');
                    cardText.addClass('card-text');
                    saveBtn.addClass('btn btn-primary save-btn');
                    cardTitle.attr('data-link', data[i].link);
                    cardText.attr('data-link', data[i].link);
                    cardTitle.text(data[i].heading);
                    cardText.text(data[i].info);
                    saveBtn.text('Save Article');
                    cardDiv.append(cardbodyDiv);
                    cardbodyDiv.append(cardTitle, cardText, saveBtn);
                    $('.row-card').append(cardDiv);
                }
            }
        })
    })


    $('.card-delete-btn').on('click', function () {
        event.preventDefault();
        var currentId = $(this).data('id');
        location.reload();

        $.ajax({
            url: "/delete-article/" + currentId,
            type: "DELETE"
        })
    })

    $('.comment-btn').on('click', function () {
        event.preventDefault();
        $('.comments').empty();
        currentId = $(this).data('id');

        $.ajax({
            method: "GET",
            url: "/comments/" + currentId,
            success: () => {
                $('#commentsModal').modal('show');
            }
        }).then((data) => {
            console.log(data);
            for (var i = 0; i < data.comments.length; i++) {
                var notesDiv = $('<div>');
                var notesTitle = $('<h1>');
                var notesText = $('<textarea>');
                var notesBtn = $('<button>');
                notesBtn.text('Delete');
                notesBtn.addClass('btn btn-primary delete-btn');
                notesBtn.attr('data-id', data.comments[i]._id)
                notesText.addClass('form-control')
                notesText.attr('type', 'text');
                notesText.attr('rows', '3');
            //     notesText.attr('data-id', data.comments[i]._id)
            //     notesTitle.attr('data-id', data.comments[i]._id)
                notesTitle.text(data.comments[i].title);
                notesText.text(data.comments[i].body);
                notesDiv.append(notesTitle);
                notesDiv.append(notesText);
                notesDiv.append(notesBtn);
                $('.comments').append(notesDiv);
            }


        })

    });

    $('.saveNoteBtn').on('click', function () {
        event.preventDefault();
        console.log('hey', currentId);
        const articleNotes = {};

        articleNotes.title = $('.title').val().trim();
        articleNotes.body = $('.body').val().trim();

        if (articleNotes.title && articleNotes.body) {
            $.ajax({
                method: "POST",
                url: "/comments/" + currentId,
                data: articleNotes
            })
            $('.title').val('');
            $('.body').val('');
            $('#commentsModal').modal('hide');
            $('#saveNoteModal').modal('show');
        }
    });

    $('.comments').on('click', "button.delete-btn", function () {
        let id = $(this).data('id');
        $.ajax({
            method: "DELETE",
            url: "/comments/" + id
        }).then(()=> {
            location.reload();
        })
    });

});


    // $(".notes-btn").on("click", function () {
    //     event.preventDefault();
    //     $(".noteArea").empty();

    //     var articleId = $(this).attr("data-id");
    //     $.ajax({
    //         method: "GET",
    //         url: "/getnotes/" + articleId,
    //         success: function () {
    //             $('#notesModal').modal('show');
    //         }
    //     })
    //         .then(function (data) {
    //             var id = data._id;
    //             $(".modal-title").html(data.title);
    //             $(".saveNoteBtn").attr("data-id", id);

    //             // If there's already a note for the article...
    //             if (data.notes) {
    //                 console.log(data.notes);
    //                 for (i = 0; i < data.notes.length; i++) {
    //                     $(".noteArea").append(
    //                         "<div class='card-body notecard' id='notecard'>" +
    //                         "<h4 class='notecardTitle' data-id='" + data.notes[i]._id + "'>" +
    //                         data.notes[i].title +
    //                         "</h4>" +
    //                         "<button type='button' class='btn btn-danger deleteNote' data-id='" + data.notes[i]._id + "'>Delete</button>" +
    //                         "</div>"
    //                     );
    //                     $(".noteArea").append(
    //                         "<hr>"
    //                     );
    //                 }
    //             }
    //         });
    // });


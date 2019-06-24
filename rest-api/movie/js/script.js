function moviesearch() {
    $('#movies').html('');
    $.ajax({
        url:'http://omdbapi.com',
        type:'get',
        datatype:'json',
        data : {
            'apikey' : 'ddffcdcf',
            's' : $('#search-input').val()
        },
        success : function (result) {
            if (result.Response == "True") {
                let movie=result.Search;

                $.each(movie, function (i,data) {
                    $('#movies').append(`
                    <div class="col-md-4">
                    <div class="card mb-3">
                        <img src="`+ data.Poster +`" class="card-img-top">
                        <div class="card-body">
                            <h5 class="card-title">`+ data.Title +`</h5>
                            <h6 class="card-subtitle mb-2 text-muted">`+ data.Year +`</h6>
                            <a href="#" class="card-link see-detail" data-toggle="modal" data-target="#exampleModal" data-id="`+ data.imdbID +`">See Details</a>
                        </div>
                    </div>
                    </div>
                    `)
                });

                $('#search-input').val('');

            }else{
                $('#movies').html('<div class="col"><h1 class="text-center">'+ result.Error +'</h1></div>');
            }
        }
    });  
    
};
$('#search-button').on('click', function(){
    moviesearch();
});

$('#search-input').on('keyup', function (e) {
    if (e.keyCode == 13) {
        moviesearch();
    }
});

$('#movies').on('click', '.see-detail', function () {
    $.ajax({
        url:'http://omdbapi.com',
        type:'get',
        datatype:'json',
        data : {
            'apikey' : 'ddffcdcf',
            'i' : $(this).data('id')
        },
        success : function (film) {
            console.log(film);
            if (film.Response === "True") {
                
                $('.modal-body').html(`
                
                    <div class="container-fluid">
                        <div class="row">
                            <div class="col-md-4">
                                <img src="` + film.Poster + `" class="img-fluid">
                            </div>
                            <div class="col-md-8">
                                <ul class = "list-group" >
                                    <li class = "list-group-item" ><h3> ` + film.Title + `</h3></li>
                                    <li class = "list-group-item" >Released : ` + film.Released + `</li> 
                                    <li class = "list-group-item" >Genre : ` + film.Genre + `</li> 
                                    <li class = "list-group-item" >Director : ` + film.Director + `</li> 
                                    <li class = "list-group-item" >Actors : ` + film.Actors + `</li> 
                                </ul>
                            </div>
                        </div>
                    </div>
    
                `)
    
            }
            
        }
    });
});
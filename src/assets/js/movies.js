function tampilkanMovie(){
    $('#daftarmovie').html('');
    $.ajax({
        url: 'https://api.themoviedb.org/3/search/movie/',
        type: 'get',
        dataType: 'json',
        data:{
            'api_key':'1216e18b9c421393ef5def1d47ac24b1',
            'query': $('#cariJudul').val()
        },
        success : function(result){
            let movie = result.results;
            if(result.errors == "" || result.errors == null){
                $.each(movie, function(i,data){
                    $('#daftarmovie').append(`
                        <div class="col col-md-4 mb-3">
                            <div class="card">
                                <img src="https://image.tmdb.org/t/p/w500`+data.poster_path+`" class="card-img-top" alt="...">
                                <div class="card-body">
                                    <h5 class="card-title">`+data.title+`</h5>
                                    <h6 class="card-subtitle mb-2 text-muted">`+data.release_date+`</h6>
                                    <a href="#" class="btn btn-primary detailMovie" 
                                    data-bs-toggle="modal" 
                                    data-bs-target="#exampleModal" data-id="`+data.id+`">Detail Movie</a>
                                </div>
                            </div>
                        </div>
                    `)
                })
            }else{
                $('#daftarmovie').html(`
                <div class="col">
                    <h2 class="text-center">`+result.errors+`</h2>
                </div>
                `)
            }
        }
    });
}
$('#tombolCari').on('click',function(){
    tampilkanMovie();
});
$('#cariJudul').on('keyup',function(e){
    if(e.keyCode == 13){
        tampilkanMovie();
    }
});

$('#daftarmovie').on('click','.detailMovie',function(){
    let idMovie = $(this).data('id');
    $.ajax({
        url: 'https://api.themoviedb.org/3/movie/' + idMovie,
        type: 'get',
        dataType: 'json',
        data:{
            'api_key':'1216e18b9c421393ef5def1d47ac24b1',
            // 'query': idMovie
        },
        success: function(result){
           // console.log(result);
           if(result.errors == "" || result.errors == null){
               $('.modal-title').html('');
               $('.modal-title').html(result.title);
              $('.modal-body').html(`
                <div class="container-fluid">
                    <div class="row">
                        <div class="col-md-4">
                            <img src="https://image.tmdb.org/t/p/w500`+result.poster_path+`" class="img-fluid">
                        </div>
                        <div class="col-md-8">
                            <ul class="list-group">
                                <li class="list-group-item">Release Date: `+result.release_date+`</li>
                                <li class="list-group-item">Overview: `+result.overview+`</li>
                                <li class="list-group-item">Language: `+result.original_language+`</li>
                                <li class="list-group-item">Popularity: `+result.popularity+`</li>
                                <li class="list-group-item">Votes: `+result.vote_count+`</li>
                                <li class="list-group-item">Vote Average: `+result.vote_average+`</li>
                            </ul>
                        </div>
                    </div>
                </div>
              `)
           }
        }
    })
})

import { Component, OnInit } from '@angular/core';
import { MovieCard } from './movie-card/movie-card.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit{
  title:string = '';
  year:string = '';
  username: string = '';
  temp: string = '';
  tab: number = 1;
  mCards: Array<MovieCard>;
  mCardsFav: Array<MovieCard>;
  rating: number;
  poster_path: string;
  release_date: string;
  overview: string;
  original_language: string;
  popularity: number;
  vote_count: number;
  vote_average: string;

  constructor(){
    this.mCards = [];
    this.mCardsFav = [];
    this.rating = 10;
    this.poster_path = '';
    this.release_date = '';
    this.overview = '';
    this.original_language = '';
    this.popularity = 0;
    this.vote_count = 0;
    this.vote_average = '';
  }
  
  ngOnInit(this: any): void{
    this.username = sessionStorage.getItem('username');
  }

  assignMovie(data: any){
    this.mCards.push(new MovieCard(data.id, data.title, "https://image.tmdb.org/t/p/w500" + data.poster_path, data.release_date, data.overview, data.original_language, data.popularity, data.vote_count, data.vote_average, false));
  }

  assignMovieFav(data: any){
    this.mCardsFav.push(new MovieCard(data.id, data.title, "https://image.tmdb.org/t/p/w500" + data.poster_path, data.release_date, data.overview, data.original_language, data.popularity, data.vote_count, data.vote_average, false));
  }

  showMovieFav(this: any){
    this.tab = 3;
    this.temp = localStorage.getItem('mCardFav');
    this.mCardsFav = JSON.parse(this.temp);
  }

  showMovie(this: any){
    var request = $.ajax({
        url: 'https://api.themoviedb.org/3/search/movie/',
        type: 'get',
        dataType: 'json',
        data:{
            'api_key':'1216e18b9c421393ef5def1d47ac24b1',
            'query': $('#cariJudul').val()
        }
    });
    request.done((result) =>{
      let movie = result.results;
      if(result.errors == "" || result.errors == null){
        for(let n of movie){
          if(n.vote_average <= parseFloat(this.rating)){
            if(this.year == ''){
              this.assignMovie(n);
            }
            else{
              if(n.release_date.split('-')[0] == this.year){
                this.assignMovie(n);
              }
            }
          }
        }
      }
    });
  }

  search(){
    this.mCards = [];
    this.showMovie();
  }

  reset(){
    this.year = '';
    this.search();
  }

  showModal(id: number){
    var request2 = $.ajax({
        url: 'https://api.themoviedb.org/3/movie/' + id,
        type: 'get',
        dataType: 'json',
        data:{
          'api_key':'1216e18b9c421393ef5def1d47ac24b1'
      }
    });

    request2.done((result) =>{
      if(result.errors == "" || result.errors == null){
        this.title = result.title;
        this.poster_path = "https://image.tmdb.org/t/p/w500" + result.poster_path;
        this.release_date = result.release_date;
        this.overview = result.overview;
        this.original_language = result.original_language;
        this.popularity = result.popularity;
        this.vote_count = result.vote_count;
        this.vote_average = result.vote_average;
      }
    })
  }

  logout(){
    // localStorage.clear();
    sessionStorage.clear();
  }
}

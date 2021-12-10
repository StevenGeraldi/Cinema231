import { Component, OnInit, HostBinding, Input, Output, EventEmitter } from '@angular/core';
import { MovieCard } from './movie-card.model';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.css']
})

export class MovieCardComponent implements OnInit{
  @HostBinding("attr.class") cssClass="col-md-4";
  @Input() mCard: MovieCard = new MovieCard(0, "", "", "", "", "", "", 0, "", false);
  @Output() mID = new EventEmitter<number>();
  mCardFav: MovieCard[] = [];
  temp: string = '';
  obj: MovieCard[] = [];

  constructor(){
    console.log(this.mCard);
  }

  ngOnInit(): void {}

  sendID(value: number) {
    this.mID.emit(value);
  }

  alreadyFav(this:any){
    if(localStorage.getItem('mCardFav') == null){
      return false;
    }
    else{
      this.temp = localStorage.getItem('mCardFav');
      this.mCardFav = JSON.parse(this.temp);
      for(let m of this.mCardFav){
        if(m.id == this.mCard.id){
          return true;
        }
      }
      return false;
    }
  }

  addFav(this:any){
    if(localStorage.getItem('mCardFav') == null){
      this.obj = [];
      this.obj.push(this.mCard);
      localStorage.setItem('mCardFav', JSON.stringify(this.obj));
      return;
    }
    else{
      if(this.alreadyFav()){
        this.temp = localStorage.getItem('mCardFav');
        this.obj = JSON.parse(this.temp);
        for(let o in this.obj){
          if(this.obj[o].id == this.mCard.id){
            this.obj.splice(o,1);
            localStorage.setItem('mCardFav', JSON.stringify(this.obj));
            return;
          }
        }
        return;
      }
      else{
        this.temp = localStorage.getItem('mCardFav');
        this.obj = JSON.parse(this.temp); 
        this.obj.push(this.mCard);
        localStorage.setItem('mCardFav', JSON.stringify(this.obj));
        return;
      }
    }
  }
}

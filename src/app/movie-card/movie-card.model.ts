export class MovieCard{
    id: number;
    title: string;
    poster_path: string;
    release_date: string;
    overview: string;
    original_language: string;
    popularity: string;
    vote_count: number;
    vote_average: string;
    favorite: boolean;

    constructor(Tid: number, Ttitle: string, Tposter_path: string, Trelease_date: string, Toverview: string, Toriginal_language: string, Tpopularity: string, Tvote_count: number, Tvote_average: string, Tfavorite: boolean){
        this.id = Tid | 0;
        this.title = Ttitle;
        this.poster_path = Tposter_path;
        this.release_date = Trelease_date;
        this.overview = Toverview;
        this.original_language = Toriginal_language;
        this.popularity = Tpopularity;
        this.vote_count = Tvote_count | 0;
        this.vote_average = Tvote_average;
        this.favorite = Tfavorite;
    }
}
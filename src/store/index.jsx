import axios from "axios";



export const FETCH_ACTION_MOVIES = 'FETCH_ACTION_MOVIES';
export const FETCH_COMEDY_MOVIES = 'FETCH_COMEDY_MOVIES';

const API_KEY = '82776dd4e021405937c471b1f995902b'; //계정마다 발급받는 api키를 변수화
const BASE_URL = 'https://api.themoviedb.org/3';


//액션
export const fetchActionData = (data) => {
    return {
        type: FETCH_ACTION_MOVIES,
        data
    }
}
export const fecthActionMovies = () => {
    return (dispatch) => {
        //dipatch : 외부에서 데이터를 가져올때 사용하는 reducer의 기능 useState의 대체
        return axios.get(`${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=28`)
            .then((res) => {
                dispatch(fetchActionData(res.data))
                //then => axios에서 콜백함수를 대체하는 return과 같은 구문
            })
    }
}

export const fetchComedyData = (data) => {
    return {
        type: FETCH_COMEDY_MOVIES,
        data
    }
}
export const fecthComedyMovies = () => {
    return (dispatch) => {
        //dipatch : 외부에서 데이터를 가져올때 사용하는 reducer의 기능 useState의 대체
        return axios.get(`${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=35`)
            .then((res) => {
                dispatch(fetchComedyData(res.data))
                //then => axios에서 콜백함수를 대체하는 return과 같은 구문
            })


    }
}

/*
{
"genres": [
{
"id": 28,
"name": "Action"
},
{
"id": 12,
"name": "Adventure"
},
{
"id": 16,
"name": "Animation"
},
{
"id": 35,
"name": "Comedy"
},
{
"id": 80,
"name": "Crime"
},
{
"id": 99,
"name": "Documentary"
},
{
"id": 18,
"name": "Drama"
},
{
"id": 10751,
"name": "Family"
},
{
"id": 14,
"name": "Fantasy"
},
{
"id": 36,
"name": "History"
},
{
"id": 27,
"name": "Horror"
},
{
"id": 10402,
"name": "Music"
},
{
"id": 9648,
"name": "Mystery"
},
{
"id": 10749,
"name": "Romance"
},
{
"id": 878,
"name": "Science Fiction"
},
{
"id": 10770,
"name": "TV Movie"
},
{
"id": 53,
"name": "Thriller"
},
{
"id": 10752,
"name": "War"
},
{
"id": 37,
"name": "Western"
}
]
}
 
*/
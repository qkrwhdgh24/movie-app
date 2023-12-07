import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import { BiSearch } from "react-icons/bi";
import { MdClear } from "react-icons/md";
import styled from 'styled-components';
import MovieCard from './MovieCard';
import { fetchGenres } from '../api/api';


function Search() {
    const [text, setText] = useState('')//검색어의 텍스트를 받아올 상태 state
    const [visible, setVisible] = useState(false)//인풋창의 기본 속성 값 지정
    const [showClearBtn, setShowClearBtn] = useState();
    const [genres, setGenres] = useState({});

    //검색어의 입력 여부를 보기 위해서 만든 상태 변수 state
    const [list, setList] = useState(false) //검색리스트가 있는지 여부
    const [movieList, setMovieList] = useState([]); //검색결과 리스트 출력
    const searchRef = useRef();

    let data = [];//영화 리스트가 들어올 변수

    const API_KEY = '82776dd4e021405937c471b1f995902b';
    const BASE_URL = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${text}&include_adult=false&language=ko-KR&page=1`

    console.log(text)
    

    const onToggleEvent = (e) => {
        e.preventDefault();
        setVisible((prev) => !prev)
    }
    const onClear = (e) => {
        e.preventDefault();
        setText('');
        setShowClearBtn(false);
        setList(false);
        setMovieList([]);
    }
    const fetch = async () => {
        const res = await axios.get(BASE_URL);
        data = res.data.results || [];
        setMovieList(data)
        console.log(data)
    }

    const inputChange = (e) => {
        setText(e.target.value);
        setShowClearBtn(e.target.value.trim() !== '');
        //fetch(setMovieList());
        setList(true);
        if (e.target.value.trim()) {
            //trim()문자열에서 공백을 제거해주는 메서드
            fetch(setMovieList());
            setList(true);
        } else {
            setMovieList([]);
            setList(false);
        }
    }
    /*
    리스트가 있을때에는 document.body에 no-scorll 클래스 적용
    없을때에는 no-scorll클래스 remove

    기본값은 no-scorll remove
    */
    useEffect(() => {

        if (list) {
            document.body.classList.add('no-scroll');
        } else {
            document.body.classList.remove('no-scroll');
        }
        return () => {
            document.body.classList.remove('no-scroll');
        }
    }, [list])

    useEffect(() => {

        const fetchSraechGenres = async()=>{
            try{
                const genresData = await fetchGenres();
                setGenres(genresData)
                console.log(genres)
            }catch(error){
                console.error(error);
            }
        }
        
        const clickSideCloseEvent = (e) => {

            if (searchRef.current && !searchRef.current.contains(e.target) && !text) {
                setVisible(false);
            }
        }
        document.addEventListener('mousedown', clickSideCloseEvent);
        fetchSraechGenres()
        return () => {
            document.removeEventListener('mousedown', clickSideCloseEvent)
        }
        
    }, [text])

    //엔터키 실행막기
    const enterPress = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
        }
    }
    
    
    



    return (
        <>
            <SearchForm visible={`${visible}`} className={visible ? 'on' : null} ref={searchRef}>
                {/* 리액트에서 null은 값을 비운다는 의미이기도 하다. */}
                <button className='search-btn' onClick={onToggleEvent}><BiSearch /></button>
                {visible && (
                    <input
                        type='text'
                        placeholder='검색어를 입력하세요'
                        value={text}
                        onChange={inputChange}
                        onKeyPress={enterPress}
                    ></input>
                )}
                {showClearBtn && (
                    <button className='clear-btn' onClick={onClear} ><MdClear /></button>
                )}
            </SearchForm>

            <ResultContainer className={(list ? 'on' : '')}>
                <div className='searchMovie'>
                    <h3>{text}로 검색한 결과입니다.</h3>
                    {list ? (
                        <div className='listContainer'>
                            {movieList && movieList.map((el) => (
                                <List props={el} key={el.id}/>
                            ))}
                        </div>
                    ) : (<p>결과물을 불러오는 중입니다...</p>)}
                </div>
            </ResultContainer>
        </>
    )
}


const List = (props) => {
    const { backdrop_path, title, genre_ids } = props.props;


    return (
        <div className='listItem'>
            {/* <img src={`https://image.tmdb.org/t/p/original/${imgUrl}`} /> */}
            <MovieCard movie={props.props}/>
        </div>
    )
}
export default Search

const SearchForm = styled.form`
    display: flex;
    position: fixed;
    top: 30px;
    right : 30px;
    transition: 500ms;
    width: 30px;
    z-index: 11;
    &.on{
        border: solid 1px #ffffff;
        transition: 500ms;
        width: 240px;
        border-radius: 4px;
    }
    .search-btn{
        color: #ffffff;
        font-size: 30px;
        display: flex;
        align-items: center;
    }
    input{
        width : ${({ visible }) => (visible ? '200px' : '0px')};
        color: #ffffff;
        opacity:  ${({ visible }) => (visible ? 1 : 0)};
        transition: opacity 500ms ;
    }
    .clear-btn{
        position: absolute;
        top: 0;
        right: 0;
        color: #ffffff;
        font-size: 24px;
        display: flex;
        align-items:center

    }
`
const ResultContainer = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    max-height: 100vh;
    background: black;
    z-index: 10;
    padding: 100px;
    box-sizing: border-box;
    overflow: auto;
    display: none;
    &.on{
        display: block;
    }
    .searchMovie{
        width: 100%;
        position: relative;
        top: 0;
        left: 0;
        h3{
            color: #fff;
            font-weight: bold;
            font-size: 40px;
            text-align: center;
            margin-bottom: 24px;
        }
        .listContainer{
            width: 100%;
            height: 100%;
            display: flex;
            justify-content: center;
            flex-wrap: wrap;
            gap: 20px;
            .listItem{
                position: relative;

                img{
                    width: 350px;
                }
            }
        }
    }

`
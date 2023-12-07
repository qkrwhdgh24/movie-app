import React, { useEffect, useRef, useState } from 'react'
import axios from '../api/axios';
import request from '../api/request';
import { styled } from 'styled-components';

function MainVideos() {
    const [movie, setMovie] = useState(null) //영화의 리스트가 있음을 반환
    const [videoKey, setVideoKey] = useState(null) //영화동영상을 연결할 아이디를 반환
    const [showImg, setShowImg] = useState(true)//맨처음 썸네일 이미지를 보여줄 이미지 상태값
    //const maxCount = 5;
    //let currCount = useRef(0)
    useEffect(() => {
        fetchData();
    }, [])

    useEffect(() => {
        if (videoKey) {
            changeVideo()
        }

    }, [videoKey])

    const fetchData = async () => {
        //async 비동식으로 데이터에 접근하는 메서드
        try {
            const res = await axios.get(request.fetchNowPlayMovie);
            //console.log(res)
            const movieId = res.data.results[
                Math.floor(Math.random() * res.data.results.length)
            ].id;

            const { data: movieDetail } = await axios.get(`movie/${movieId}`, {
                params: { append_to_response: 'videos' },
            })
            if (movieDetail.videos && movieDetail.videos.results.length > 0) {
                setMovie(movieDetail)
                setVideoKey(movieDetail.videos.results[0].key)
                //console.log(movieDetail.videos.results[0].key)

                setTimeout(()=>{
                    setShowImg(false)
                },2000)
            }

            //console.log(movieId)
        } catch (error) {
            console.error(error)
        }
    }

    // const fetchData = async () => {
    //     if (currCount.current >= maxCount) {
    //         return;
    //     }
    //     try {
    //         const res = await axios.get(request.fetchNowPlayMovie);
    //         //console.log(res)
    //         const movieId = res.data.results[
    //             Math.floor(Math.random() * res.data.results.length)
    //         ].id;

    //         if (!res.data.results[0].key) {
    //             currCount.current ++
    //             fetchData();
    //             return
    //         }
    //         setVideoKey(res.data.results[0].key)
    //     } catch (error) {
    //         console.error(error);
    //         currCount.current ++
    //         fetchData()
    //     }
    // }

    const changeVideo = () => {
        const videoContainer = document.getElementById('videoContainer');
        videoContainer.innerHTML = '';

        const iframe = document.createElement('iframe');
        iframe.src = `https://www.youtube.com/embed/${videoKey}?controls=0&autoplay=1&loop=1&mute=1&playlist=${videoKey}`;
        iframe.width = '100%';
        iframe.height = '100%';
        videoContainer.appendChild(iframe);
    }
    return (
        <>
        {showImg && movie &&(
            <MainVideoImg img={movie.backdrop_path}/>
        )}
            <MainVideoWrapper id='videoContainer'/>
        </>
    )
}

export default MainVideos;

const MainVideoImg = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    z-index: 99;
    background: url(https://image.tmdb.org/t/p/original/${(props)=>props.img}) no-repeat center center / cover;
`

const MainVideoWrapper = styled.div`
    width : 100%;
    height: 100vh;
`



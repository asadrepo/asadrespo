import React, {Component, useEffect, useState} from 'react';
import OwlCarousel from "react-owl-carousel2";
import {SlideOne} from "../SlideOne";
import {SlideTwo} from "../SlideTwo";
import {SlideThree} from "../SlideThree";
import {SlideFour} from "../SlideFour";
import MainLayout from '../Layout/MainLayout'
import Data2Dna from '../Widgets/Data2Dna';
import UserSetting from '../Widgets/UserSetting';
import PopupHOC from "../../hoc/PopupHOC";
import axiosClient from "../../shared/axiosClient";
import AdvertisementPopup from "../../components/common/AdvertisementPopup";
import AdvertisementDetail from "../../components/Advertisement/AdvertisementDetail";

const Home = (props) => {
    const [adContainer, setAdContainer] = useState(null);
    const [isModelshow, setIsModelshow] = useState(true);
    const [postion, setPosition] = useState(0);
    const [slider, setSlider] = useState(0);

    useEffect(() => {
        setIsModelshow(true);
    }, []);

    const updateCarouselPosition = (object) => {

        if(object.item.index !== postion){
            setPosition(object.item.index);
        }
    }


   const events = {
        onDragged: function (event) {

        },
        onChanged: function (event) {

          //  setSlider(event.item.index);
            //setPosition(event.item.index);
            // if(event.item.index === 1 && !isModelshow && postion === 0){
            //      setIsModelshow(true);
            //
            //     updateCarouselPosition(event);
            // }


            console.log("this is worked" + event.item.index, slider);

        }
    }

    const options = {
        autoplay: false,
        items: 1,
        nav: false,
        mouseDrag: false,
        startPosition: 0,
        dotsEach: true,
        dotsData: true,
        dots: true,
        dotClass: 'carousel-indicators',
        dotsClass: 'carousel-indicators-dots',
    };

    return (
        <MainLayout>
            <OwlCarousel options={options} events={events}>
                <div className="carousel-item active" data-dot="<span></span>">
                    <SlideOne ad={{}} activeSlider={slider}/>
                </div>
                <div className="carousel-item active" data-dot="<span></span>">
                    <SlideTwo ad={{}} activeSlider={slider} />
                </div>
                <div className="carousel-item active" data-dot="<span></span>">
                    <SlideFour/>
                </div>
                <div className="carousel-item active" data-dot="<span></span>">
                    <SlideThree/>
                </div>

            </OwlCarousel>

            {/*<Data2Dna />*/}
            {/*<UserSetting />*/}
        </MainLayout>
    );

}

export default PopupHOC(Home);
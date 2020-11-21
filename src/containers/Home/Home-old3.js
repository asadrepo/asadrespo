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

function areEqual(prevProps, nextProps) {
  return false
}

const Home = React.memo(function MyComponent(props) {
    const [adContainer, setAdContainer] = useState(null);
    const [isModelshow, setIsModelshow] = useState(true);
    const [postion, setPosition] = useState(0);
    const [slider, setSlider] = useState(0);

    // useEffect(() => {
    //     setIsModelshow(true);
    // }, []);

    const updateCarouselPosition = (object) => {
        console.log("index", object.item.index);
        console.log("position", postion);
        if(object.item.index !== null){
            if(object.item.index !== postion){
                console.log("in condition");
                 setPosition(object.item.index);
            }
        }

    }


    const events = {
        onDragged: function (event) {

        },
        onChanged: function (event) {

            // setSlider(event.item.index);
            // return false
            //setPosition(event.item.index);
            // if(event.item.index === 1 && !isModelshow && postion === 0){
            //      setIsModelshow(true);
            //
              // updateCarouselPosition(event);
            // }




        }
    }

    const options = {
        autoplay: false,
        items: 1,
        nav: false,
        mouseDrag: false,
        startPosition: postion,
        dotsEach: true,
        dotsData: true,
        dots: true,
        dotClass: 'carousel-indicators',
        dotsClass: 'carousel-indicators-dots',
    };

    return (
        <MainLayout>
            <OwlCarousel options={options} events={{
                onDragged: (object) => updateCarouselPosition(object),
                onChanged:(object) => updateCarouselPosition(object)

            }} >
                <div className="carousel-item active" data-dot="<span></span>">
                    <SlideOne ad={{}} />
                </div>
                <div className="carousel-item active" data-dot="<span></span>">
                    <SlideTwo ad={{}}  />
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

}, areEqual);


export default PopupHOC(Home);
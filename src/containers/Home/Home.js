import React, {Component} from 'react';
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

class Home extends Component {


    constructor() {
        super();
        this.updateCarouselPosition = this.updateCarouselPosition.bind(this);
    }

    state = {
        isModelshow: false,
        timer: 10,
        adContainer: null,
        loadedModule: 0,
        screenOneAd: {

        },
        activeScreenOneAd : {

        },

        screenTwoAd: {

        },
        activeScreenTwoAd: {

        },
        screenThreeAd: {

        },
        activeScreenThreeAd: {

        },

        screenFourAd: {

        },
        startPosition: 1,
        positionState: 0,
        activeSlider:  null,
        secondSliderComp: null
    }





    updateCarouselPosition(object){
    console.log("this is update carosusel postion");
        if(object.item.index !== null) {
            if (object.item.index !== this.state.startPosition) {
                setTimeout(() => {



                    if(object.item.index === 0 && this.state.screenOneAd !== {} ){
                        this.setState({startPosition: object.item.index});
                        this.setState({activeScreenOneAd: this.state.screenOneAd});
                    }

                    if(object.item.index === 1  && this.state.screenTwoAd !== {} ){
                        this.setState({startPosition: object.item.index});
                        this.setState({activeScreenTwoAd: this.state.screenTwoAd});
                    }

                    if(object.item.index === 2 && this.state.screenThreeAd !== {}){
                        this.setState({startPosition: object.item.index});
                        this.setState({activeScreenThreeAd: this.state.screenThreeAd});
                    }

                }, 500);
            }
        }
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        console.log("props", this.state.activeScreenTwoAd);
        console.log("next state", nextState.activeScreenTwoAd);
        // if(this.state.activeScreenTwoAd !== nextState.activeScreenTwoAd){
        //     return true;
        // }
        //
        // if(this.state.activeScreenOneAd !== nextState.activeScreenOneAd){
        //     return true;
        // }
         return true;
    }

    componentDidMount() {
        axiosClient.advertisement.listAds().then(response => {

            
            const ads = response.data.results;
            ads.map(ad => {
                if(ad.screen.includes('1')){

                    this.setState({
                        screenOneAd: ad,
                        activeScreenOneAd: ad
                    });
                }

                if(ad.screen.includes('2')){

                    this.setState({
                        screenTwoAd: ad
                    });
                }

                if(ad.screen.includes('3')){

                    this.setState({
                        screenThreeAd: ad
                    });
                }

            })
        });



        // this.setState({activeSlider: <SlideOne ad={this.state.screenOneAd} activeSlider={this.state.startPosition} />});
        // window.addEventListener('load', this.handleLoad);
    }

    componentWillUnmount() {

    }

    onChangedSlider = (event) => {
        console.log('ON click change slider', this.state.positionState);
        this.setState({
            positionState: 1
        })
    }
    secondClickSlider = () => {
        console.log("this is s")
    }

    handleLoad = () => {
        //this.props.handleOnClickModal(<AdvertismentPopup />, 'none');
    }

    // componentDidMount() {
    //
    //     this.props.handleOnClickModal(<AdvertismentPopup />, 'none');
    // }

    events = {
        onDragged: function(event) {

        },
        onChange: function(event) {
            console.log("this is on change");
        },
        onChanged: function(event) {
            console.log("this is worked" + event.item.index);


            // this.setState({
            //     positionState: 1
            // })

            // this.updateCarouselPosition(event)

            // this.setState({
            //     loadedModule: event.item.index
            // });

            // alert(this.state.loadedModule);
        }
    }
    render() {
        const options = {
            autoplay:false,
            items:1,
            nav: false,
            mouseDrag: false,
            startPosition: 0,
            // items: 1,
            dotsEach: true,
            dotsData: true,
            dots: true,
            // responsive: {
            //     0: {
            //         items: 1
            //     },
            //     600: {
            //         items: 1
            //     },
            //     1000: {
            //         items: 1,
            //         nav: false
            //     },
            //     1200: {
            //         items: 1,
            //         nav: false
            //     }
            // },

            // rewind: true,
            // autoplay: false,
            // navText: [
            //     '<span aria-label="' + 'Previous' + '">&#x2039;</span>',
            //     '<span aria-label="' + 'Next' + '">&#x203a;</span>'
            // ],
            // navSpeed: false,
            // navElement: 'button type="button" role="presentation"',
            // navContainerClass: 'owl-nav',
            dotClass: 'carousel-indicators',
            dotsClass: 'carousel-indicators-dots',
            // dotsContainer: false,
        };

        return (
            <MainLayout>
                <OwlCarousel options={options} events={{
                     onChanged: this.updateCarouselPosition,
                    // translated: (object) => this.updateTransalted(object)
                }} >
                    <div className="carousel-item active" data-dot="<span></span>">
                        {/*{this.state.activeSlider}*/}
                        <SlideOne ad={this.state.screenOneAd} activeSlider={this.state.startPosition} />
                    </div>
                    <div className="carousel-item active" data-dot="<span></span>">
                        <SlideTwo ad={this.state.activeScreenTwoAd} activeSlider={this.state.startPosition} />
                        {/*{this.state.secondSliderComp}*/}
                    </div>
                    <div className="carousel-item active" data-dot="<span></span>">
                        <SlideFour ad={this.state.activeScreenThreeAd} activeSlider={this.state.startPosition} />
                    </div>
                    <div className="carousel-item active" data-dot="<span></span>">
                        <SlideThree ad={this.state.screenFourAd} activeSlider={this.state.startPosition} />
                    </div>

                </OwlCarousel>
                <AdvertisementPopup isShow={this.state.isModelshow}

                                    container={this.state.adContainers}
                                    timer={52}
                />
                {/*<Data2Dna />*/}
                {/*<UserSetting />*/}
            </MainLayout>
        );
    }
}

export default PopupHOC(Home);
export default GoogleApiWrapper(
    (props) => ({
            apiKey: props.apiKey,
            language: props.language,
        }
    ))(SliderFour);
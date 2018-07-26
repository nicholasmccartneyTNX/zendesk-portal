import React from 'react'

export default class DQPage extends React.Component{

render() {
    return(
        <div class="landing_container" align="center">
        <h2 class="centered">Welcome to the TriNetX Support Portal.  Select a menu option to continue.</h2>
        <img class="landingImage" src={require("./images/landing_image.jpg")}/>
        </div>
    )
}

}
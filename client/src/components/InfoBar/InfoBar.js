//importing react
import React from 'react'

//importing images 
import closeIcon from '../../icons/closeIcon.png'
import onlineIcon from '../../icons/onlineIcon.png'

//importing css files
import './InfoBar.css'

//creating our infoBar component and adding the room props
const InfoBar = ({room }) =>(
    <div className='infoBar'>
        <div className='leftInnerContainer'>
            <img  className='onlineIcon'alt="online" src={onlineIcon}/>
            <h3>{room}</h3>
        </div>
        <div className='rightInnerContainer'>
            <a href="/"><img src={closeIcon} alt="close" /></a>
        </div>
    </div>
)

export default InfoBar
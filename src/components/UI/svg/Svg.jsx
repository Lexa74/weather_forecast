import React from "react";


export const Svg = (props) => {

    const paramsSvg = props.className.split(' ')
    const widthSvg = paramsSvg[1].substring(1)
    const heightSvg = paramsSvg[2].substring(1)
    const fillSvg = paramsSvg[3].substring(4)
    const strokeSvg = paramsSvg[4].substring(6)

    return (

        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className={props.className} width={widthSvg} height={heightSvg}>
            <g fill={fillSvg} stroke={strokeSvg}>
                <path d="M19 7l-2-2H7L5 7H2v12h20V7h-3zm-7 10c-2.8 0-5-2.2-5-5s2.2-5 5-5 5 2.2 5 5-2.2 5-5 5z"></path>
                <circle cx="12" cy="12" r="3"></circle>
            </g>
        </svg>

    )
}
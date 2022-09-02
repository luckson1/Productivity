import React from 'react';
export const Button = ({bgColor, color, size,text, borderRadius, onClick, mb, animationType}) => {
    return(
    <>
    <button
    type="button"
    style={{backgroundColor:bgColor, color, borderRadius, marginBottom:mb}}
    className={`animate-${animationType}  text-${size} py-2 px-4 shadow-lg hover:drop-shadow-xl opacity-0.5 bg-opacity-20 transition ease-in-out delay-150`} 
    onClick={onClick}>
        {text}
    </button>
    </>);
};

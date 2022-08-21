import React from 'react';
export const Button = ({bgColor, color, size,text, borderRadius, onClick, mb}) => {
    return(
    <>
    <button
    type="button"
    style={{backgroundColor:bgColor, color, borderRadius, marginBottom:mb }}
    className={`text-${size} p-3 hover:drop-shadow-x1`} 
    onClick={onClick}>
        {text}
    </button>
    </>);
};

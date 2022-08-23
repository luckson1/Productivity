import React from 'react';
export const Button = ({bgColor, color, size,text, borderRadius, onClick, mb, type, padding}) => {
    return(
    <>
    <button
    type="button"
    style={{backgroundColor:bgColor, color, borderRadius, marginBottom:mb }}
    className={`text-${size} py-2 px-4 hover:drop-shadow-x1`} 
    onClick={onClick}>
        {text}
    </button>
    </>);
};

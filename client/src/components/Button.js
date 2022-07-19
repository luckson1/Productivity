import React from 'react';
export const Button = ({bgColor, color, size,text, borderRadius}) => {
    return(
    <>
    <button
    type="button"
    style={{backgroundColor:bgColor, color, borderRadius }}
    className={`text-${size} p-3 hover:drop-shadow-x1`} >
        {text}
    </button>
    </>);
};

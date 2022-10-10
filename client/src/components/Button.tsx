import React from "react";
interface Props {
  bgColor: string,
  size: string,
  text: string,
  borderRadius: string,
  onClick: any,
  animationType: string,
}
export const Button = (props: Props
 
) => {
  return (
    <>
      <button
        type="button"
        style={{
          backgroundColor: props.bgColor,
          borderRadius: props.borderRadius,
      
        }}
        className={`animate-${props.animationType}  text-${props.size} py-2 px-4 shadow-lg hover:drop-shadow-xl opacity-0.5 bg-opacity-20 transition ease-in-out delay-150`}
        onClick={props.onClick}
      >
        {props.text}
      </button>
    </>
  );
};

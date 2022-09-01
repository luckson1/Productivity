import React from 'react'



function InfoCard({ title, details}) {


  return (
    <div className="task dark:bg-[#484B52]" id="task" style={{minWidth: "120px"}} >
     
      <div className="text-left py-2 flex flex-row gap-2">
    <p className="text-blue-500">{title}: </p> <p> {details}</p>
      </div>
    
    </div>
  )
}

export default InfoCard
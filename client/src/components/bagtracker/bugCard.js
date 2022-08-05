import React from 'react'



function BugCard({ title, details}) {


  return (
    <div className="task" id="task"  >
     
      <div className="text-left py-2 flex flex-row gap-2">
    <p className="text-blue-500">{title}: </p> <p> {details}</p>
      </div>
    
    </div>
  )
}

export default BugCard
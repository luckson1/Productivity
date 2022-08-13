import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import BugEntryList from '../components/bagtracker/BugEntryList'
import CreateBugEntry from '../components/bagtracker/CreateBugEntry'




import { useStateContext } from '../context/ContextProvider'
import { fetchbugsAction } from '../redux/bugsSlices'

function BugTracker() {
  const {showModal, setShowModal,   bugs, setBugs, currentColor} = useStateContext();


  // dispatch action to fetch bugs
  const dispatch= useDispatch()
useEffect(()=> {
dispatch(fetchbugsAction())
}, [dispatch])


  const bugsState=useSelector(state=> state?.bugs)
  const {bugLoading, bugsFetched, bugAppErr, bugServerErr }=bugsState
useEffect(()=> {
  if(bugsFetched ) setBugs(bugsFetched?.bugs)
},[bugsFetched, setBugs])




  return (
    <div>


      <div className="entry-buttons " >
       <button id="task-button" style={{backgroundColor: currentColor}} onClick={() => setShowModal(true)}> Add Bug</button>
       
      </div>
  
    
<BugEntryList entries= {bugs}  loading={bugLoading} errors={bugAppErr|| bugServerErr}/>
      
     
      {showModal && <CreateBugEntry setShowModal={setShowModal} />}
    </div>
  )
}

export default BugTracker
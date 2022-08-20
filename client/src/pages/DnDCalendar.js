import { Calendar , dateFnsLocalizer} from 'react-big-calendar'
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop'
import 'react-big-calendar/lib/addons/dragAndDrop/styles.css'
import "react-big-calendar/lib/css/react-big-calendar.css";
import format from "date-fns/format";
import getDay from "date-fns/getDay";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchTasksAction } from '../redux/taskSlices';
import { useStateContext } from '../context/ContextProvider';
import TaskCard from '../components/kanban/TaskCard';






export default function DnDCalendar() {
  const DnDCalendarComponent = withDragAndDrop(Calendar)
  const locales = {
    "en-US": require("date-fns/locale/en-US"),
};
const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales,
});
const {tasks, setTasks} = useStateContext();
const dispatch= useDispatch()
useEffect(()=> {
dispatch(fetchTasksAction())
}, [])
const tasksState = useSelector((state) => state?.tasks)
const { tasksFetched, taskLoading, taskAppErr, taskServerErr } = tasksState
useEffect(() => {
  if(tasksFetched) {
     setTasks(tasksFetched?.tasks)
  }
 
 }, [tasksFetched, setTasks])

 const events=tasks.map(task=> {return task})
return (
  <div className=" w-10/12 mt-5 ml-10">
    <h1>Tasks with no timelines</h1>
    <div className='width-5/6 h-32 bg-slate-100 mb-3 rounded-lg flex flex-row flex-wrap justify-between'>
{tasks?.filter(task => !task?.start && task?.status !=="Done")?.map(task => 
  <div className="bg-white rounded m-5 p-1 shadow-2xl text-xs h-8"   key={task?.taskId} >
  <span>{task?.title}</span>
  </div>

)}
    </div>
  <DnDCalendarComponent 
    localizer={localizer}
    events={events}
    draggableAccessor={(event) => true}
    startAccessor="createdAt" endAccessor="createdAt"
    style={{ height: "60vh"}} 
    popup
  />
  </div>
)
}

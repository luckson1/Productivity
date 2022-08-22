import { Calendar, globalizeLocalizer } from 'react-big-calendar'
import { DateTime, Settings } from 'luxon'
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop'
import 'react-big-calendar/lib/addons/dragAndDrop/styles.css'
import "react-big-calendar/lib/css/react-big-calendar.css";
import React, { useEffect, useState, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchTasksAction } from '../redux/taskSlices';
import { useStateContext } from '../context/ContextProvider';
import CreateTask from '../components/kanban/createTask';
import DeleteDialogBox from '../components/DeleteDialogBox';
import { TasksInformation } from '../components/kanban/TaskInformation';
import globalize from 'globalize'
import { Button } from '../components/Button';
import { MdCancel } from 'react-icons/md';






export default function DnDCalendar() {
  const { showModal, showDeleteModal, currentEntry, tasks, setTasks, showInfoModal, currentColor } = useStateContext();
  const [showNoDateModal, setShowNoDateModal] = useState(false)
  const DnDCalendarComponent = withDragAndDrop(Calendar)

  const events = tasks?.map(task => {

    return {
      start: new Date(Date.parse(task?.start)),
      end: new Date(Date.parse(task?.end)),
      title: task?.title,
      allDay: function () {
        if (this.start === this.end) {
          return true
        } else {
          return false
        }
      }


    }

  }
  );
  console.log(events)
  const defaultTZ = DateTime.local().zoneName
  const defaultDateStr = '2015-04-13'

  function getDate(str, DateTimeObj) {
    return DateTimeObj.fromISO(str).toJSDate()
  }


  const [timezone, setTimezone] = useState(defaultTZ)

  const { getNow, localizer, scrollToTime } =
    useMemo(() => {
      Settings.defaultZone = timezone
      return {
        defaultDate: getDate(defaultDateStr, DateTime),
        getNow: () => DateTime.local().toJSDate(),
        localizer: globalizeLocalizer(globalize),
        scrollToTime: DateTime.local().toJSDate(),
      }
    }, [timezone])

  useEffect(() => {
    return () => {
      Settings.defaultZone = defaultTZ // reset to browser TZ on unmount
    }
  }, [])
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchTasksAction())
  }, [])
  const tasksState = useSelector((state) => state?.tasks)
  const { tasksFetched } = tasksState
  useEffect(() => {
    if (tasksFetched) {
      setTasks(tasksFetched?.tasks)
    }

  }, [tasksFetched, setTasks])

  return (
    
    <div className=" w-10/12 mt-5 ml-10  dark:bg-[#484B52] rounded-md dark:text-slate-50">

      {!showNoDateModal && <Button
        bgColor={currentColor}
        text="Show tasks with no Timelines"
        borderRadius="10px"
        mb="20px" 
        onClick={()=> setShowNoDateModal(true)} />}

      {showNoDateModal && <div className='width-5/6 h-32 bg-gradient-to-r from-indigo-100 via-purple-50 to-pink-50 mb-3 rounded-lg flex flex-row flex-wrap justify-between'>
        <div>
        <MdCancel className='close-icon' color='red' onClick={() => {            
                setShowNoDateModal(false);          
            }} 
            style={{cursor: "pointer"}}/>
        {tasks?.filter(task => !task?.start && task?.status !== "Done")?.map(task =>
          <div className="bg-white rounded m-5 p-1 shadow-2xl text-xs h-8" key={task?.taskId} >
            <span>{task?.title}</span>
          </div>

        )}
        </div>
      </div>}
      <DnDCalendarComponent
        localizer={localizer}
        events={events}
        getNow={getNow}
        draggableAccessor={(event) => true}
        startAccessor="start" endAccessor="end"
        allDayAccessor="allDay"
        style={{ height: "70vh" }}
        scrollToTime={scrollToTime}
        popup
      />
      {showModal && <CreateTask />}
      {showDeleteModal && <DeleteDialogBox task={currentEntry} item="Task" />}
      {showInfoModal && <TasksInformation />}
    </div>
  )
}

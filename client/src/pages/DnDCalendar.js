import { Calendar, globalizeLocalizer } from "react-big-calendar";
import { DateTime } from "luxon";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import "react-big-calendar/lib/css/react-big-calendar.css";
import React, { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTasksAction } from "../redux/taskSlices";
import { useStateContext } from "../context/ContextProvider";
import DeleteDialogBox from "../components/DeleteDialogBox";
import { TasksInformation } from "../components/kanban/TaskInformation";
import globalize from "globalize";
import { Button } from "../components/Button";
import { MdCancel } from "react-icons/md";
import EditTasks from "../components/kanban/EditTasks";

export default function DnDCalendar() {
  const {
    setCurrentEntry,
    showModal,
    showDeleteModal,
    currentEntry,
    showInfoModal,
    setShowInfoModal,
    currentColor,
  } = useStateContext();
  const [showNoDateModal, setShowNoDateModal] = useState(false);
  const DnDCalendarComponent = withDragAndDrop(Calendar);
  const dispatch = useDispatch();

  // get the start date and end date of a task
  useEffect(() => {
    dispatch(fetchTasksAction());
  }, []);
  const tasksState = useSelector((state) => state?.tasks);
  const tasks = tasksState?.tasksFetched?.tasks;
  const events = tasks?.map((task) => {
    return {
      start: new Date(Date.parse(task?.start)),
      end: new Date(Date.parse(task?.end)),
      title: task?.title,
      allDay: function () {
        if (this.start === this.end) {
          return true;
        } else {
          return false;
        }
      },
    };
  });

  const defaultDateStr = "2015-04-13";

  function getDate(str, DateTimeObj) {
    return DateTimeObj.fromISO(str).toJSDate();
  }

  const { getNow, localizer, scrollToTime } = useMemo(() => {
    return {
      defaultDate: getDate(defaultDateStr, DateTime),
      getNow: () => DateTime.local().toJSDate(),
      localizer: globalizeLocalizer(globalize),
      scrollToTime: DateTime.local().toJSDate(),
    };
  }, []);

  // useEffect(() => {
  //   if (tasksFetched) {
  //     setTasks(tasksFetched?.tasks);
  //   }
  // }, [tasksFetched, setTasks]);

  return (
    <div className=" w-10/12 mt-5 ml-10  dark:bg-[#484B52] rounded-md dark:text-slate-50">
      {!showNoDateModal && (
        <Button
          bgColor={currentColor}
          text="Show tasks with no Timelines"
          borderRadius="10px"
          mb="20px"
          onClick={() => setShowNoDateModal(true)}
        />
      )}

      {showNoDateModal && (
        <div className="width-5/6 h-32 bg-gradient-to-r from-indigo-100 via-purple-50 to-pink-50 mb-3 rounded-lg ">
          <div className="flex flex-row justify-end mx-2 mt-5">
            <MdCancel
              className="close-icon"
              color="red"
              onClick={() => {
                setShowNoDateModal(false);
              }}
              style={{ cursor: "pointer" }}
            />
          </div>
          <div className="flex flex-row flex-wrap gap-1">
            {tasks
              ?.filter((task) => !task?.start && task?.status !== "Done")
              ?.map((task) => (
                <div
                  className="bg-white rounded m-1 p-1 shadow-2xl text-xs h-8"
                  key={task?.taskId}
                  style={{cursor: "pointer"}}
                  onClick={()=> {setShowInfoModal(true); setCurrentEntry(task)}}
                >
                  <span>{task?.title}</span>
                </div>
              ))}
          </div>
        </div>
      )}
      <DnDCalendarComponent
        localizer={localizer}
        events={events}
        getNow={getNow}
        draggableAccessor={(event) => true}
        startAccessor="start"
        endAccessor="end"
        allDayAccessor="allDay"
        style={{ height: "70vh" }}
        scrollToTime={scrollToTime}
        popup
      />
      {showModal && <EditTasks />}
      {showDeleteModal && <DeleteDialogBox task={currentEntry} item="Task" />}
      {showInfoModal && <TasksInformation />}
    </div>
  );
}

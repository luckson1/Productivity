import React, { useEffect } from "react";
import { FaTasks } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/Button";
import { useStateContext } from "../context/ContextProvider";
import { fetchTasksAction, TasksData } from "../redux/taskSlices";
import { MdBugReport } from "react-icons/md";
import { BugsData, fetchbugsAction } from "../redux/bugsSlices";
import {  appDispatch, getState } from "../redux/Hooks";
import { useGetBugsQuery } from "../redux/bugsApiSlices";
import { useGetTasksQuery } from "../redux/tasksApiSlices";


const Dashboard = () => {
  const { currentColor, currentMode } = useStateContext();
  const navigate = useNavigate();
// fetch tasks data
  const {
    data: tasksData,
    isLoading:taskLoading,

    isError:taskError,

  }=useGetTasksQuery(undefined)
  const tasks=tasksData? Object.values(tasksData)[0] as Array<TasksData>: null

  // tasks data

  const toDoTasks =tasks?.filter(
    (task) => task?.status === "To Do"
  );
  const inProgressTasks =tasks?.filter(
    (task) => task?.status === "In Progress"
  );
  const completeTasks =tasks?.filter(
    (task) => task?.status === "Complete"
  );


  // fetch bugs data
  const {
    data: bugsData,
    isLoading:bugLoading,
    isSuccess,
    isError:bugError,
    error
  }=useGetBugsQuery(undefined)
  const bugs=bugsData? Object.values(bugsData)[0] as Array<BugsData>: null

  // bugs data

  const openBugs = bugs?.filter((bug) => bug?.status === "Open");
  const inProgressBugs = bugs?.filter(
    (bug) => bug?.status === "In Progress"
  );
  const completeBugs = bugs?.filter(
    (bug) => bug?.status === "Complete"
  );

  return (
    <div className={currentMode === "Dark" ? "dark" : ""}>
      <div className="mt-6 mb-6">
        <div className=" my-12 mx-12 p-6 bg-white dark:bg-slate-600 rounded-md">
          <div className="flex flex-wrap lg:flex-nowrap justify-center ">
            <div className="flex m-3 flex-col md:flex-row flex-wrap justify-center gap-3">
              <div className="bg-gradient-to-r from-indigo-100 via-purple-50 to-pink-50 shadow-2xl h-44 dark:text-gray-200 dark:bg-[#484B52] w-72 md:w-56  p-1 pt-7 rounded-2xl">
                <button
                  type="button"
                  style={{ backgroundColor: currentColor }}
                  className="text-xl opacity-0.9 text-white hover:drop-shadow-xl rounded-full  p-4"
                  onClick={() => navigate("/tasks")}
                >
                  <FaTasks />
                </button>

                {taskLoading ? (
                  "Loading, Please wait! 😀"
                ) : taskError ? (
                  <p className=" text-red-500">An Error Occured. 😥</p>
                ) : !toDoTasks?.length ? (
                  <p className=" text-gray-900"> No Open Tasks 😊</p>
                ) : (
                  <p className=" text-gray-900">
                    {toDoTasks?.length} Task(s) to do{" "}
                  </p>
                )}
              </div>
              <div className="bg-gradient-to-r from-indigo-100 via-purple-50 to-pink-50 shadow-2xl h-44 dark:text-gray-200 dark:bg-[#484B52] w-72 md:w-56  p-1 pt-7 rounded-2xl ">
                <button
                  type="button"
                  style={{ backgroundColor: currentColor }}
                  className="text-xl opacity-0.9 text-white hover:drop-shadow-xl rounded-full  p-4"
                  onClick={() => navigate("/tasks")}
                >
                  <FaTasks />
                </button>

                {taskLoading ? (
                  "Loading, Please wait! 😀"
                ) : taskError ? (
                  <p className=" text-red-500">An Error Occured. 😥</p>
                ) : !inProgressTasks?.length ? (
                  <p className=" text-gray-900"> No Tasks In Progress 😊</p>
                ) : (
                  <p className=" text-gray-900">
                    {inProgressTasks?.length} Task(s) in progress
                  </p>
                )}
              </div>
              <div className="bg-gradient-to-r from-indigo-100 via-purple-50 to-pink-50 shadow-2xl h-44 dark:text-gray-200 dark:bg-[#484B52] w-72 md:w-56  p-1 pt-7 rounded-2xl ">
                <button
                  type="button"
                  style={{ backgroundColor: currentColor }}
                  className="text-xl opacity-0.9 text-white hover:drop-shadow-xl rounded-full  p-4"
                  onClick={() =>
                    navigate("/completed", { state: { tasks: completeTasks } })
                  }
                >
                  <FaTasks />
                </button>

                {taskLoading ? (
                  "Loading, Please wait! 😀"
                ) : taskError ? (
                  <p className=" text-red-500">An Error Occured. 😥</p>
                ) : !completeTasks?.length? (
                  <p className=" text-gray-900"> No Completed tasks 😊</p>
                ) : (
                  <p className=" text-gray-900">
                    {completeTasks?.length} Task(s)  Completed
                  </p>
                )}
              </div>

              <div className="dark:bg-[#484B52] w-72 md:w-56  p-1 pt-7 rounded-2xl bg-gradient-to-r from-indigo-100 via-purple-50 to-pink-50 shadow-2xl h-44 dark:text-gray-200">
                <button
                  type="button"
                  style={{ backgroundColor: currentColor }}
                  className="text-xl opacity-0.9 text-white hover:drop-shadow-xl rounded-full  p-4"
                  onClick={() => navigate("/bug-tracker")}
                >
                  <MdBugReport />
                </button>

                {bugLoading ? (
                  "Loading, Please wait! 😀"
                ) : bugError? (
                  <p className=" text-red-500">An Error Occured. 😥</p>
                ) : !openBugs?.length? (
                  <p className=" text-gray-900"> No Open Issues 😊</p>
                ) : (
                  <p className=" text-gray-900">
                    {openBugs?.length} Open bug(s){" "}
                  </p>
                )}
              </div>

              <div className="bg-gradient-to-r from-indigo-100 via-purple-50 to-pink-50 shadow-2xl h-44 dark:text-gray-200 dark:bg-[#484B52] w-72 md:w-56  p-1 pt-7 rounded-2xl ">
                <button
                  type="button"
                  style={{ backgroundColor: currentColor }}
                  className="text-xl opacity-0.9 text-white hover:drop-shadow-xl rounded-full  p-4"
                  onClick={() => navigate("/bug-tracker")}
                >
                  <MdBugReport />
                </button>

                {bugLoading ? (
                  "Loading, Please wait! 😀"
                ) : bugError? (
                  <p className=" text-red-500">An Error Occured. 😥</p>
                ) : !inProgressBugs?.length ? (
                  <p className=" text-gray-900"> No issues in progress😊</p>
                ) : (
                  <p className=" text-gray-900">
                    {inProgressBugs?.length} Bug(s) In Progresss{" "}
                  </p>
                )}
              </div>
              <div className="bg-gradient-to-r from-indigo-100 via-purple-50 to-pink-50 shadow-2xl h-44 dark:text-gray-200 dark:bg-[#484B52] w-72 md:w-56  p-1 pt-7 rounded-2xl ">
                <button
                  type="button"
                  style={{ backgroundColor: currentColor }}
                  className="text-xl opacity-0.9 text-white hover:drop-shadow-xl rounded-full  p-4"
                  onClick={() =>
                    navigate("/completed", { state: { bugs: completeBugs } })
                  }
                >
                  <MdBugReport />
                </button>

                {bugLoading ? (
                  "Loading, Please wait! 😀"
                ) : bugError? (
                  <p className=" text-red-500">An Error Occured. 😥</p>
                ) : !completeBugs?.length? (
                  <p className=" text-gray-900"> No bugs created....yet 😊</p>
                ) : (
                  <p className=" text-gray-900">
                    {completeBugs?.length} Bug(s) Solved{" "}
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className="flex gap-10 flex-wrap justify-center mt-10">
            <div className="bg-indigo-50 shadow-2xl dark:text-gray-100 dark:bg-[#484B52] p-6 rounded-2xl md:w-780   ">
              <div className="flex justify-between items-center gap-2">
                <p className="text-xl font-semibold text-gray-900  dark:text-gray-100">
                  Recent Tasks
                </p>
              </div>
              <div className="mt-10 w-72 md:w-400 text-sm text-left">
                {taskLoading ? (
                  "Loading, Please wait! 😀"
                ) : taskError ? (
                  <p className=" text-red-500">An Error Occured. 😥</p>
                ) : !tasks ? (
                  " No Tasks created....yet 😊"
                ) : (
                 tasks
                    ?.filter((task) => task?.status !== "Complete")
                    ?.map((task) => (
                      <div key={task._id} className="flex justify-between mt-4">
                        <div className="flex gap-4">
                          <p className="text-md font-semibold text-gray-900  dark:text-gray-100">
                            {task?.title}
                          </p>
                        </div>
                        <p
                          className={
                            task?.status === "To Do"
                              ? "text-blue-500"
                              : task?.status === "In Progress"
                              ? "text-amber-400"
                              : task?.status === "Done"
                              ? "text-green-500"
                              : "text-gray-900"
                          }
                        >
                          {task?.status}
                        </p>
                      </div>
                    ))
                )}
              </div>
              <div className="flex justify-between items-center mt-5 border-t-1 border-color">
                <div className="mt-3">
                  <Button
                    animationType=""
                    size="md"
                    bgColor={currentColor}
                    text="Add"
                    borderRadius="10px"
                    onClick={() => navigate("/tasks")}
                  />
                </div>
              </div>
            </div>
            <div className="bg-indigo-50 shadow-2xl dark:text-gray-200 dark:bg-[#484B52] p-6 rounded-2xl md:w-780   ">
              <div className="flex justify-between items-center gap-2">
                <p className="text-xl font-semibold text-gray-900  dark:text-gray-100">
                  Recent Bugs
                </p>
              </div>
              <div className="mt-10 w-72 md:w-400 text-sm text-left">
                {bugLoading ? (
                  "Loading, Please wait! 😀"
                ) : bugError? (
                  <p className="text-red-500">"An Error Occured. 😥"</p>
                ) : !bugs ? (
                  " No bugs found....yet 😊"
                ) : (
                  bugs
                    ?.filter((bug) => bug?.status !== "Complete")
                    ?.map((bug) => (
                      <div key={bug._id} className="flex justify-between mt-4">
                        <div className="flex gap-4">
                          <p className="text-md font-semibold text-gray-900  dark:text-gray-100">
                            {bug?.title}
                          </p>
                        </div>
                        <p
                          className={
                            bug?.status === "Open"
                              ? "text-blue-500"
                              : bug?.status === "Closed"
                              ? "text-green-500"
                              : "text-gray-900"
                          }
                        >
                          {bug?.status}
                        </p>
                      </div>
                    ))
                )}
              </div>
              <div className="flex justify-between items-center mt-5 border-t-1 border-color">
                <div className="mt-3">
                  <Button
                    animationType=""
                    size="md"
                    bgColor={currentColor}
                    text="Add"
                    borderRadius="10px"
                    onClick={() => navigate("/bug-tracker")}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

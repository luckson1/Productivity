import React, { useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { BsCurrencyDollar } from 'react-icons/bs';


import { FaTasks } from 'react-icons/fa';
import { useNavigate } from "react-router-dom";


import { Button } from '../components/Button';

import { useStateContext } from '../context/ContextProvider';
import { useDispatch, useSelector } from 'react-redux';
import { accountsStatsAction } from '../redux/accountsStatsSlices';
import { fetchTasksAction } from '../redux/taskSlices';
import { fetchAllShoppingsItem } from '../redux/shoppingItemSlices';
import currencyFormatter from '../utils/currencyFormatter';
import dateFormatter from '../utils/dateFormatter';



const Dashboard = () => {
    const { currentColor } = useStateContext();
    const navigate = useNavigate()
    // fetch data from db
    const dispatch = useDispatch()



    useEffect(() => {
        dispatch(accountsStatsAction())
    }, [dispatch])
    useEffect(() => {
        dispatch(fetchTasksAction())
    }, [dispatch])

    useEffect(() => {
        dispatch(fetchAllShoppingsItem())
    }, [dispatch])
    // get state from store
    const stateData = useSelector(state => state)

    //money stats
    const IncomeExpenditureState = stateData?.stats
    const { statsLoading, statsList, statsAppErr, statsServerErr } = IncomeExpenditureState
    const totalIncome = statsList?.incomeStats?.[0]?.totalIncome

    const totalExpenditure = statsList?.expenseStats?.[0]?.totalExpenses
    const maxExpense = statsList?.expenseStats?.[0]?.maxExpense
    const averageExpense = statsList?.expenseStats?.[0]?.averageExpense

    const data = [{
        type: "Incomes",
        total: totalIncome
    },
    {
        type: "Expenses",
        total: totalExpenditure,
        average: averageExpense,
        highest: maxExpense
    }]





    // tasks data
    const tasksState = stateData?.tasks
    const { tasksFetched, taskLoading, taskAppErr, taskServerErr } = tasksState
    const toDoTasks = tasksFetched?.tasks?.filter(task => task?.status === "To Do")
    const inProgressTasks = tasksFetched?.tasks?.filter(task => task?.status === "In Progress")
    const doneTasks = tasksFetched?.tasks?.filter(task => task?.status === "Done")


    //shopping data
    const shoppingItemsState = stateData?.shoppingItem
    const { shoppingItemsFetched, shoppingItemLoading, shoppingItemAppErr, shoppingItemServerErr } = shoppingItemsState
    const latestShoppingStats = shoppingItemsFetched?.shoppingStats?.filter(shoppingItem => shoppingItem?._id === "Added to Cart")?.[0]?.totalShoppingAmount

    return (
        <div className="mt-24">
            <div className="flex flex-wrap lg:flex-nowrap justify-center ">
                <div className="bg-gradient-to-r from-indigo-200 via-purple-100 to-pink-100 dark:text-gray-200 dark:bg-secondary-dark-bg h-44 rounded-xl w-full lg:w-80 p-8 pt-9 m-3 bg-no-repeat bg-cover bg-center">
                    <div className="flex justify-between items-center">
                        <div>
                            <p className="font-bold text-gray-900">Total Income</p>
                            <p className="text-l text-gray-900">{statsLoading ? "Loading, Please wait! 😀"
                                : statsAppErr || statsServerErr ? "An Error Occured. Please Referesh 😥"
                                    : statsList?.incomeStats === 0 ? "No Incomes Added....yet 😊"
                                        : currencyFormatter(totalIncome)}</p>
                        </div>
                        <button
                            type="button"
                            style={{ backgroundColor: currentColor }}
                            className="text-2xl opacity-0.9 text-white hover:drop-shadow-xl rounded-full  p-4"
                        >
                            <BsCurrencyDollar />
                        </button>
                    </div>
                    <div className="mt-6">
                        <Button
                            color="white"
                            bgColor={currentColor}
                            text="Download"
                            borderRadius="10px"
                        />
                    </div>
                </div>
                <div className="flex m-3 flex-wrap justify-center gap-1">
               
                <div className="bg-gradient-to-r from-indigo-200 via-purple-100 to-pink-100 dark:text-gray-200 dark:bg-secondary-dark-bg h-44 rounded-xl w-full lg:w-80 p-8 pt-9 m-3 bg-no-repeat bg-cover bg-center">
                        <button
                            type="button"
                            style={{ backgroundColor: currentColor }}
                            className="text-2xl opacity-0.9 text-white hover:drop-shadow-xl rounded-full  p-4"
                        >
                            <BsCurrencyDollar />
                        </button>
                        <p className=" text-gray-900" >{statsLoading ? "Loading, Please wait! 😀"
                            : statsAppErr || statsServerErr ? "An Error Occured. Please Referesh 😥"
                                : statsList?.expenseStats === 0 ? "No Expenses Added....yet 😊"
                                    : currencyFormatter(totalExpenditure)}</p>
                        <p className=" text-gray-900  mt-1">Total Expenditure</p>
                    </div>
               

                    <div className="bg-gradient-to-r from-indigo-200 via-purple-100 to-pink-100 h-44 dark:text-gray-200 dark:bg-secondary-dark-bg md:w-56  p-4 pt-9 rounded-2xl ">
                        <button
                            type="button"
                            style={{ backgroundColor: currentColor }}
                            className="text-2xl opacity-0.9 text-white hover:drop-shadow-xl rounded-full  p-4"
                        >
                            <BsCurrencyDollar />
                        </button>
                        <p className=" text-gray-900">{shoppingItemLoading ? "Loading, Please wait! 😀"
                            : shoppingItemAppErr || shoppingItemServerErr ? "An Error Occured. Please Referesh 😥"
                                : shoppingItemsFetched?.shoppingStats === 0 ? "No Shopping List created....yet 😊"
                                    : currencyFormatter(latestShoppingStats)}</p>
                        <p className=" text-gray-900  mt-1">Latest Shopping Amount</p>
                    </div>

                    <div className="bg-gradient-to-r from-indigo-200 via-purple-100 to-pink-100 h-44 dark:text-gray-200 dark:bg-secondary-dark-bg md:w-56  p-3 pt-9 rounded-2xl text-left">
                        <button
                            type="button"
                            style={{ backgroundColor: currentColor }}
                            className="text-xl opacity-0.9 text-white hover:drop-shadow-xl rounded-full  p-4"
                        >
                            <FaTasks />
                        </button>
                        {taskLoading ? "Loading, Please wait! 😀"
                            : taskAppErr || taskServerErr ? <p className=" text-gray-900">An Error Occured. Please Referesh 😥</p>
                                : tasksFetched?.tasks === 0 ? <p  className=" text-gray-900"> No Tasks created....yet 😊</p>
                                    : <p  className=" text-gray-900">{toDoTasks?.length} Tasks to do, {inProgressTasks?.length} in progress and {doneTasks?.length} completed</p>}
                        <p className=" text-gray-900  mt-1">Tasks</p>
                    </div>


                </div>
            </div>

            <div className="flex gap-10 flex-wrap justify-center mt-10">
                <div className="bg-gradient-to-r from-indigo-200 via-purple-100 to-pink-100 dark:text-gray-200 dark:bg-secondary-dark-bg m-1 p-1 rounded-2xl md:w-780  ">
                    <div className="flex justify-between">
                        <p className="font-semibold text-l ml-5   text-gray-900">Income and Expenses Updates</p>
                  
                    </div>
                    <div className="mt-5 flex gap-10 flex-wrap justify-center">
                        <div className=" border-r-1 border-color m-4 pr-1">
                        
                            <div className="mt-5 mx-0">
                                <ResponsiveContainer width="100%" height="100%" minHeight={280} minWidth={280}>
                                    <BarChart
                                        width={500}
                                        height={300}
                                        data={data}
                                        margin={{
                                            top: 5,
                                            right: 30,
                                            left: 20,
                                            bottom: 5,
                                        }}
                                    >
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="type" />
                                        <YAxis />
                                        <Tooltip />
                                        <Legend />
                                        <Bar dataKey="total" fill={currentColor}/>
                                        <Bar dataKey="average" fill="#79a8f2" />
                                        <Bar dataKey="highest" fill="#f0624d" />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                           
                            <div className="mt-5">
                                <Button
                                    color="white"
                                    bgColor={currentColor}
                                    text="Download Report"
                                    borderRadius="10px"
                                />
                            </div>
                        </div>
                       
                    </div>
     
                </div>
                <div className="bg-gradient-to-r from-indigo-200 via-purple-100 to-pink-100 dark:text-gray-200 dark:bg-secondary-dark-bg p-6 rounded-2xl md:w-780   ">
                    <div className="flex justify-between items-center gap-2">
                        <p className="text-xl font-semibold text-gray-900">Recent Tasks</p>

                    </div>
                    <div className="mt-10 w-72 md:w-400">
                        {taskLoading ? "Loading, Please wait! 😀"
                            : taskAppErr || taskServerErr ? "An Error Occured. Please Referesh 😥"
                                : tasksFetched?.tasks === 0 ? " No Tasks created....yet 😊"
                                    : tasksFetched?.tasks?.map((task) => (
                                        <div key={task._id} className="flex justify-between mt-4">
                                            <div className="flex gap-4">
                                                <p className="text-gray-900">{dateFormatter(task?.updatedAt)}</p>
                                                <div>
                                                    <p className="text-md font-semibold text-gray-900">{task?.title}</p>
                                                
                                                </div>
                                            </div>
                                            <p className='text-gray-900'>{task?.status}</p>
                                        </div>
                                    ))}
                    </div>
                    <div className="flex justify-between items-center mt-5 border-t-1 border-color">
                        <div className="mt-3">
                            <Button
                                color="white"
                                bgColor={currentColor}
                                text="Add"
                                borderRadius="10px"
                                onClick={() => navigate("/kanban")}
                            />
                        </div>


                    </div>
                </div>            

            </div>       


        </div>
    );
};


export default Dashboard;

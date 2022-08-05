import React from 'react';
import { AiOutlineDashboard, AiOutlineTeam } from 'react-icons/ai';
import { BsKanban, } from 'react-icons/bs';
import { MdBugReport } from 'react-icons/md';
import {FaRegMoneyBillAlt}from 'react-icons/fa';


export const themeColors = [
  {
    name: 'blue-theme',
    color: '#1A97F5',
  },
  {
    name: 'green-theme',
    color: '#03C9D7',
  },
  {
    name: 'purple-theme',
    color: '#7352FF',
  },
  {
    name: 'red-theme',
    color: '#FF5C8E',
  },
  {
    name: 'indigo-theme',
    color: '#1E4DB7',
  },
  {
    color: '#FB9678',
    name: 'orange-theme',
  },
];
export const links = [
  {
  
    links: [
      {
        name: 'dashboard',
        icon: <AiOutlineDashboard size="24px"/>,
      },
    ],
  },


  {

    links: [
      {
        name: 'bug-tracker',
        icon: <MdBugReport size="24px"/>,
      },
      {
        name: 'kanban',
        icon: <BsKanban size="20px"/>,
      },
      {
        name: 'expense-tracker',
        icon: < FaRegMoneyBillAlt size="24px"/>,
      },
      {
        name: 'team',
        icon: <AiOutlineTeam size="24px"/>,
      },
    
    ],
  },
  
];
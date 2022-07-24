import React from 'react';
import { AiOutlineDashboard } from 'react-icons/ai';
import { FiEdit,   FiShoppingCart } from 'react-icons/fi';
import { BsKanban, } from 'react-icons/bs';



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
        icon: <AiOutlineDashboard />,
      },
    ],
  },


  {

    links: [
      {
        name: 'shopping-list',
        icon: <FiShoppingCart />,
      },
      {
        name: 'kanban',
        icon: <BsKanban />,
      },
      {
        name: 'expense-tracker',
        icon: <FiEdit />,
      },
    
    ],
  },
  
];
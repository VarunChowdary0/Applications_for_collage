import React from 'react';

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Menu from './Components/Menu';
import Placement_Info from './Components/Placement_Info';
import UpdatePacements from './Components/UpdatePacements';
import Edit_Info from './Components/Edit_Info';
import Edit_Info_Raw from './Components/Edit_Info_Raw';

const router = createBrowserRouter([
  {
    path:"/",
    element:<><Menu currentPage='home'/></>
  },
  {
    path:"/placements",
    element:
      <>
        <Menu currentPage='PAT_I' />
        <Placement_Info/>
      </>
  },
  {
    path:"/updatePlacements",
    element:
    <>
      <Menu currentPage='UPD_PMTS'/>
      <UpdatePacements/>
    </>
  },{
    path:"/EditInfo/:rollNum/:company",
    element:
    <>
      <Menu currentPage='EDT_IFO' />
      <Edit_Info/>
    </>
  }
  ,{
    path:"/EditInfo",
    element:
    <>
      <Menu currentPage='EDT_IFO' />
      <Edit_Info_Raw/>
    </>
  }
]);

const App:React.FC = () => {
  return (
      <>
          <div className=' w-full h-screen bg-[#ffffff] '>
            <RouterProvider router={router} />
          </div>
      </>
  );
}

export default App;

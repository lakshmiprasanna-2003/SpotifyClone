import React from 'react'
import Navbar from './Navbar'
import { albumsData, songsData } from '../assets/assets'
import Albumitem from './Albumitem'
import SongItem from './Songitem'

const DisplayHome = () => {
  return (
    <>
    <Navbar/>
    <div className='my-5 font-bold text-2xl'>
        <h1 className='my-5 text-bold text-'>Featured Charts</h1>
        <div className='flex overflow-auto'>
            {albumsData.map((item,index)=>(<Albumitem key={index} name={item.name} desc={item.desc} id={item.id} image={item.image}/>))}
        </div>
    </div>
    
    <div className='my-5 font-bold text-2xl'>
        <h1 className='my-5 text-bold text-'>Today's Biggest Hits</h1>
        <div className='flex overflow-auto'>
            {songsData.map((item,index)=>(<SongItem key={index} name={item.name} desc={item.desc} id={item.id} image={item.image}/>))}
        </div>
    </div>
    </>
  )
}

export default DisplayHome
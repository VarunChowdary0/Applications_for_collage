import React from 'react'

interface CurrentProps{
    class : string;
}

const MiniWid:React.FC<CurrentProps> = (props) => {
    const str = props.class;
    const arry =  str.split("|");
  return (
    <>
        <hr className=' p-0 m-0' />
        <div className=' flex items-center gap-14'>
            <p className=' w-fit text-2xl'>Current Class</p>
            <p className=' tracking-widest text-end max-w-[250px] max-sm:text-md text-lg font-thin'>{arry[0]||"-"}</p>
        </div>
        <hr className=' p-0 m-0' />
        <div className=' flex items-center gap-14'>
            <p className=' w-fit text-2xl'>Class Number</p>
            <p className=' tracking-widest text-end max-w-[250px] max-sm:text-md text-lg font-thin'>{arry[1]||"-"}</p>
        </div>
        <hr className=' p-0 m-0' />
        <div className=' flex items-center gap-14'>
            <p className=' w-fit text-2xl'>Faculty</p>
            <p className=' tracking-widest text-end max-w-[250px] max-sm:text-md text-lg font-thin'>{arry[2]||"-"}</p>
        </div>
        <hr className=' p-0 m-0' />
    </>
  )
}

export default MiniWid
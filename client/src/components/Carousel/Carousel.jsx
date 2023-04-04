import React, { useEffect, useState } from 'react'
import '@/components/Carousel/carousel.css'

const Carousel = ({photos, profile, setProfile}) => {
  let timeOut ;

  useEffect(()=>{
    timeOut = setTimeout(()=>{
      setProfile((profile+1)%photos.length)
    },5000)
  },[profile])

  const handleImageHold = ()=>{
    clearTimeout(timeOut)
  }
  const handleImageMove = ()=>{
    
    timeOut = setTimeout(()=>{
      setProfile((profile+1)%photos.length)
    },1500)

  }

  return (
    <div className='product-carousel'>
      <div className="left-strip">
        {
            photos.map((photo, index)=>(
                <img src={photo} alt={index} className={'strip-image '+`bs-${index===profile}`} onClick={()=>{ clearTimeout(timeOut); setProfile(index) }}/>       
            ))
        }
      </div>
      
      <div className="gallery" onMouseEnter={handleImageHold} onMouseLeave={handleImageMove} >
        { 
        photos && photos.map((photo, index)=>{
          if(index===profile)
          return (
            <img src={photos[profile]} alt="profile" className={"profile-image "+`${index==profile}`}/>
          )         
          })
        }
      </div>
    </div>
  )
}

export default Carousel

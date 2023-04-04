import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Carousel from '@/components/Carousel/Carousel'
import "@/pages/Product/product.css"
import {AiFillHeart, AiFillStar} from "react-icons/ai"
import {BsFillBagCheckFill} from "react-icons/bs"
import { useLocation } from 'react-router-dom'

const sizeChart = {
    "m":"Medium (M)",
    "s":"Small (S)",
    "x": "Large (X)",
    "xl": "Extra Large (XL)"
}
const Product = () => {
    const [color, setColor] = useState(null)
    const [product, setProduct] = useState(null)
    const [profile, setProfile] = useState(null)
    const [size, setSize] = useState(null)
    const [itr, setItr] = useState(0) 
    const location = useLocation()
    const editPrice=(price)=>{
        let str = String(price)
        let arr = str.split("").reverse()
        let res = []
        let start = 0
        let size = 3
  
        while(start<arr.length)
        {   
            res.push(arr.slice(start,start+size).reverse().join(""))
            start+=size
            size=2
        }
        const final = res.reverse().join(",")
        return final
      }

    useEffect(()=>{
        const productId = location.pathname.split('/')[2] 
        async function getData()
        {
            const {data} = await axios.get(`${process.env.URL}/admin/getProduct/?productId=${productId}`)
            setProduct(data.product)
            setColor(data.product.colors[0].code)
        }
        getData()
    },[])

    useEffect(()=>{
        if(!color)return
        console.log(color)
        const res = product.profile.filter(({code})=> code===color)
       
        if(res)
        {
            setItr(0)
            setProfile(res[0].urls)
        }
        
    },[color])

console.log(profile)
  return (
    <>
        {
            product && 
        <div className='profile'>
        <div className="left-container">
       {
        profile && 
            <Carousel photos={profile} profile={itr} setProfile={setItr}></Carousel>
       } 
        </div>
        <div className="right-container">
            <div className="product-title">
              <h4 className='heading'>{product.brand}</h4>
              <h6 className='sub-heading'>{product.title}</h6>
                <hr />
            </div>
            <div className="product-price d-flex justify-content-start align-items-center">            
                <h2 className='heading'>Rs. {editPrice(product.price)}</h2>
                <span className='actualCost mx-3'><strike>MRP. Rs. {editPrice(product.price+Math.floor((product.price*product.discount)/100))}</strike> <h5 style={{color:"#ff905a"}}>( {product.discount} %OFF )</h5></span>
            </div>
            <div className="ratings d-flex">
                <span className='desc-stars my-1'> 
                <span className='desc-star'>{product.stars}<AiFillStar color='#14958f' /></span> <span className='mx-2 desc-rating'>{product.ratings} Ratings</span>
              </span>
            </div>
            <div className="color-container">
                <span className='color-head'>Get your style ! </span>
                <span className='colors'>
                {
                    product.colors.map(({code, name},index)=>(
                        <span key={index} className={'color-item mx-2 '+`color-${code===color}`} onClick={(e)=>{setColor(code); handleColorSelect()}} style={{backgroundColor:code}}></span>
                    )) 
                }
                </span>
            </div>
            <div className="size">
                <span className='size-head'>{size===null?"Select your fit":
                <span >{sizeChart[size.code]}</span> 
                }</span>
                <div className="size-container d-flex">
                {   
                        product.size.map(({code, chest, length}, index)=>(
                            <div className="size-item-wrapper">
                            <span className={'size-item d-flex mx-2 '+`size-${code===size?.code}`} style={{textTransform:"uppercase"}} onClick={()=>{setSize(product.size[index])}} >{code}</span>
                            <span className='size-item-desc'>
                                <div className='d-block'>General Measurement <span style={{textTransform:"uppercase"}}>({code})</span></div>
                                <span>
                                Chest {chest}" | Length {length}"
                                </span>
                            </span>
                            </div>  
                        ))
                }
                </div>
            </div>
            <div className="product-links">
                <button className='wishlist'>
                  <AiFillHeart className='wishlist-heart' ></AiFillHeart>
                  <span className="mx-2">
                  WishList
                  </span>
                </button>
                <button className='cart'>
                  <BsFillBagCheckFill className='cart-bag'/>
                  <span className="mx-2">
                  Add to Bag
                  </span>
                </button>
            </div>
            <div className="description w-100">
            <div class="accordion w-100" id="accordionExample">
                <div class="accordion-item">
                    <h2 class="accordion-header" id="headingOne">
                    <button class="accordion-button w-100 fs-6" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                       Description
                    </button>
                    </h2>
                    <div id="collapseOne" class="accordion-collapse collapse " aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                    <div class="accordion-body">
                    <table className='table'>
                        <tbody>
                            {
                                product.details.map(({property, value})=>(
                                    <tr>
                                        <th>{property}</th>
                                        <td>{value}</td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                    </div>
                    </div>
                    </div>
                </div>
            </div>
            
        </div>
        </div>
        }
    </>
  )
}

export default Product

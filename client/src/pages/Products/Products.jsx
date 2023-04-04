import React, { useEffect, useState } from 'react'
import '@/pages/Products/products.css'
import axios from 'axios'
import { AiFillStar } from 'react-icons/ai'
import { useNavigate } from 'react-router-dom'

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

const Products = () => {
    const navigate = useNavigate()
    const [info, setInfo] = useState(null)
    useEffect(()=>{
        async function getSearchProducts()
        {
            try {
                const {data} = await axios.get(`${process.env.URL}/admin/getAllproducts`)
                setInfo(data.products)
            } catch (error) {
                console.log(error)
            }
        }
        getSearchProducts()
    },[])
    console.log(info)
  return (
    <div className='products'>
        <div className="left-search">

        </div>
        <div className="right-products">
            <div className="product-container">
                {
                    info && info.map((item, key)=>(
                    <div className="product" onClick={()=>{navigate(`/product/${item._id}`)}}>
                        <div className="product-img">
                            <img src={item.profile[0].urls[0]} alt={item.title} />
                            <div className="stars-ratings">
                                <span style={{display:"flex", justifyContent:"center", alignItems:"center"}}>{item.stars} <AiFillStar color='#14958f'></AiFillStar> </span>|
                                <span>{item.ratings}</span>
                            </div>
                        </div>
                        <div className="product-desc">
                            <span className="wishlist"></span>
                            <span className="brand">{item.brand}</span>
                            <span className="title">{item.title}</span>
                            <span className="price">
                                Rs. {editPrice(item.price)} <strike>Rs. {editPrice(item.price+Math.floor((item.price*item.discount)/100))}</strike> <span>{item.discount} % discount</span>
                                </span>
                        </div>
                    </div>
                    ))
                }
            </div>
        </div>
    </div>
  )
}

export default Products

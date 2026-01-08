import React from 'react'
import {assets} from '../assets/assets'
import Title from '../components/Title'
import Newsletterbox from '../components/Newsletterbox'
const About = () => {
  return (
    <div>
      <div className='text-2xl text-center pt-8 border-t border-gray-200'>
        <Title text1={"ABOUT"} text2={"US"}/>
      </div>
      <div className="my-10 flex flex-col md:flex-row gap-16">
        <img src={assets.about_img} className='w-full md:max-w-[450px]' alt="" />
        <div className='flex flex-col justify-center gap-6 text-gray-600 md:w-2/4'>
        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eum maxime provident nemo modi, vitae laborum debitis nesciunt numquam officia explicabo voluptatum, tempora esse porro excepturi.</p>
        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Numquam eum rerum quas corrupti harum alias, quam tempora, officiis, aperiam repellendus praesentium minus nam exercitationem dolorem!</p>
        <b className='text-gray-600'>Our Mission</b>
        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Maxime, recusandae possimus itaque saepe ipsum corporis dignissimos rerum animi fuga vero cumque, inventore dolores. Sint.
        </p>
        </div>
      </div>
      <div className='text-xl py-4'>
        <Title text1={"WHY"} text2={"CHOOSE US"}/>
      </div>
      <div className='flex flex-col md:flex-row text-sm mb-20'>
        <div className='border border-gray-200 px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Quality Assurance</b>
          <p className='text-gray-600' >Lorem, ipsum dolor sit amet consectetur adipisicing elit. Itaque velit accusantium deleniti, ad pariatur atque voluptatum dolor asperiores accusamus tempore architecto, autem excepturi distinctio.</p>
        </div>
        <div className='border border-gray-200 px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Convience</b>
          <p className='text-gray-600' >Lorem, ipsum dolor sit amet consectetur adipisicing elit. Itaque velit accusantium deleniti, ad pariatur atque voluptatum dolor asperiores accusamus tempore architecto, autem excepturi distinctio.</p>
        </div>
        <div className='border border-gray-200 px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Exceptional Customer Service</b>
          <p className='text-gray-600' >Lorem, ipsum dolor sit amet consectetur adipisicing elit. Itaque velit accusantium deleniti,  ad pariatur atque voluptatum dolor asperiores accusamus tempore architecto, autem excepturi distinctio.</p>
        </div>
      </div>
      <Newsletterbox/>
    </div>
  )
}

export default About
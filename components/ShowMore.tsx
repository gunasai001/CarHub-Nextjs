"use client"

import { ShowMoreProps } from "@/types"
import CustomButton from "./CustomButton";

const ShowMore = ({setLimit,pageNumber, isNext}: ShowMoreProps) => {

  return (
      <div className="w-full flex-center gap-5 mt-10">
        {!isNext && (
            <CustomButton title='Show More' btnType="button" containerStyles='bg-primary-blue rounded-full text-white' handleClick={()=>{
              const newLimit = (pageNumber + 1) * 10
              setLimit(newLimit)
            }}/>
        )}
      </div>
  )
}

export default ShowMore
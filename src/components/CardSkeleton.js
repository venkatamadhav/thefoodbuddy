import React from 'react'
import Skeleton, {SkeletonTheme} from 'react-loading-skeleton'
import "react-loading-skeleton/dist/skeleton.css";
//Use CardSkeleton component in Homepage.js to display skeleton cards while data is being fetched from the API
const CardSkeleton = () => {
    return (
        <SkeletonTheme baseColor="#babfbb" highlightColor="#d9dedb">
        <div className="flex flex-wrap justify-center">
            {Array(20)
                .fill()
                .map((_, index) => (
                    <div className='p-3' key={index}>
                        <div className="bg-gray-200 p-4 rounded flex justify-center items-center flex-col  h-[440px] hover:scale-105 transition duration-300 z-10">
                            <div className='h-[260px] w-[260px] sm:h-[320px] sm:w-[320px] flex justify-center items-center'>
                                <Skeleton height={260} width={260} className='center'/>
                            </div>
                            <h4 className='w-[260px] sm:w-[320px] flex justify-center items-center'><Skeleton height={20} width={260}/></h4>
                            <div className="flex justify-center m-2">
                                <h3 className='mr-2 px-4 rounded'><Skeleton height={20} width={60}/></h3>
                                <h3 className='mr-2 px-4 rounded '><Skeleton height={20} width={60}/></h3>
                            </div>
                        </div>
                    </div>
                ))}
        </div>
        </SkeletonTheme>
    )
}
export default CardSkeleton
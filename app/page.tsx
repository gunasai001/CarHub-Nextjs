"use client";
import { CarCard, CustomFilter, Hero, SearchBar, ShowMore } from '@/components'
import { fuels, yearsOfProduction } from '@/constants';
import { fetchCars } from '@/utils';
import Image from 'next/image';
import { useEffect, useState } from 'react';

export default function Home() {
  const [allCars, setAllCars] = useState([])
  const [loading, setLoading] = useState(false)

  const [manufacturer, setManufacturer] = useState("")
  const [model, setModel] = useState("")
  const [fuel, setFuel] = useState("")
  const [limit, setLimit] = useState(10)
  const [year, setYear] = useState("2022")

  const getCars = async () => {
    setLoading(true)
    try{
      const result = await fetchCars({
      manufacturer: manufacturer || '',
      year: year || "2020",
      fuel: fuel || '',
      limit:  limit || 10,
      model:  model || '',
    });  
    setAllCars(result)
  }catch(err){
    console.log(err)
  }finally{
    setLoading(false)
  }
  }

  useEffect(()=>{
    getCars()
  },[manufacturer, model, year, fuel, limit])
  
  const isDataEmpty = !Array.isArray(allCars) || allCars.length<1 || !allCars;
  return (
    <main className='overflow-hidden'>
      <Hero/>
      <div className='mt-12 padding-x pdding-y max-width' id='discover'>
        <div className='home__text-container'>
          <h1 className='text-4xl font-extrabold'>Car Catalogue</h1>
          <p>Explore the Cars you might like</p>
        </div>
        <div className='home__filters'>
          <SearchBar setManufacturer = {setManufacturer} setModel={setModel}/>
          <div className='home__filter-container'>
            <CustomFilter setFilter={setFuel} options={fuels} title="fuel"/>
            <CustomFilter setFilter={setYear} title="year" options={yearsOfProduction}/>
          </div>
        </div>

    {allCars.length>0?(
      <section>
        <div className='home__cars-wrapper'>
          {allCars?.map((car, index)=><CarCard key={index} car={car}/>)}
        </div>

        {loading && (
          <div className='mt-16 w-full flex-center'>
            <Image src="/magni.svg" alt="loader" width={50} height={50} className="object-contain"/>
          </div>
        )}

        <ShowMore
           pageNumber={(limit)/10}
           isNext={(limit) > allCars.length}
           setLimit = {setLimit}
        />
      </section>
      ):(
        <div className='home__error-container'>
          <h2 className='text-black text-xl font-bold'>Oops, No results</h2>
        </div>
      )
    }

      </div>
    </main>
  )
}

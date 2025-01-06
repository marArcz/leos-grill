"use client";

// import { categories } from '@/app/lib/dummy-data';
import clsx from 'clsx';
import React, { useEffect, useState } from 'react'
import Categories from './components/Categories';
import { koulen } from '@/app/ui/fonts';
import ProductComponent from './components/ProductComponent';
import { fetchCategories, fetchProducts } from '@/app/lib/data';
import { ICategory, IProduct } from '@/app/lib/definitions';
import { Tables } from '@/app/lib/supabase';
import CategoriesPlaceholder from './components/CategoriesPlaceholder';
import { useGetCategories } from '@/app/lib/react-query/queriesAndMutations';
import Products from './components/Products';

const MenuPage = () => {
  const {data: categories, isPending:isCategoriesLoading, isError:isCategoriesError} = useGetCategories();
  const [activeCategory, setActiveCategory] = useState<Tables<'categories'> | null>(categories?.[0] ?? null);

  useEffect(() => {
    if (categories && categories.length > 0) {
      setActiveCategory(categories[0])
    }
  }, [categories])

  return (
    <>
      <section className="hero-section py-10 wrapper w-full bg-bottom bg-hero bg-cover">
        <div className="flex flex-col h-full w-full justify-center items-center gap-14">
          <h4 className={`btn py-4 px-5 uppercase font-medium lg:text-4xl md:text-3xl text-3xl text-yellow Koulen ${koulen.className}`}>Our Menu</h4>
          {isCategoriesLoading ? (
            <CategoriesPlaceholder/>
          ):(
            <Categories categories={categories ?? []} activeCategory={activeCategory} setActiveCategory={setActiveCategory} />
          )}
        </div>
      </section>
      <section className='wrapper pb-5 relative mt-5 pt-10'>
        {activeCategory && (
          <Products activeCategory={activeCategory} />
        )}
      </section>
    </>
  )
}

export default MenuPage
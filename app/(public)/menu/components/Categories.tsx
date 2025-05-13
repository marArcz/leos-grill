"use client";

import { fetchCategories } from '@/app/lib/data'
import { ICategory } from '@/app/lib/definitions'
import { Tables } from '@/app/lib/supabase';
import clsx from 'clsx';
import React from 'react'

type Props = {
    activeCategory: Tables<'categories'> | null;
    setActiveCategory: React.Dispatch<React.SetStateAction<Tables<'categories'> | null>>
    categories: Tables<'categories'>[]
}
const Categories = ({ activeCategory, setActiveCategory,categories }: Props) => {

    return (
        <ul className="flex lg:gap-20 gap-10 justify-center w-full overflow-x-auto">
            {categories.map((category, index) => (
                <li onClick={() => setActiveCategory(category)} key={index} className={clsx("text-center relative pb-3 cursor-pointer transition-all", {
                    'text-yellow after:content-normal': category == activeCategory
                })}>
                    <img src={activeCategory?.image??''} className={clsx("bg-gray-300 mx-auto rounded-full xl:size-32 md:size-20 size-14", {
                        " border-yellow border-2": category == activeCategory
                    })} alt="" />
                    <p className="mt-4 text-lg text-center">{category.category_name}</p>
                    {category == activeCategory && (
                        <div className='rounded h-[3px] bg-yellow w-full absolute bottom-0'></div>
                    )}
                </li>
            ))}
        </ul>
    )
}

export default Categories
import React from 'react'

const CategoriesPlaceholder = () => {
    return (
        <ul className="flex lg:gap-20 gap-10 justify-center w-full overflow-x-auto">
            <li className="text-center relative pb-3 cursor-pointer transition-all">
                <div className="bg-gray-300 mx-auto rounded-full xl:size-32 animate-pulse opacity-30 md:size-20 size-14"></div>
                <p className="mt-4 text-lg text-center h-4 bg-gray-300 opacity-30 w-full rounded animate-pulse"></p>
            </li>
        </ul>
    )
}

export default CategoriesPlaceholder
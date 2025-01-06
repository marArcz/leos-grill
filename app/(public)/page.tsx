"use client";

import Image from "next/image";
import Navbar from "../ui/Navbar";
import Link from "next/link";
import { jotiOne } from "../ui/fonts";
import { Facebook, Instagram, Map as MapIcon, Phone } from "@mui/icons-material";
import { categories, products } from "../lib/dummy-data";
import { fetchBestSellers } from "../lib/data";
import ProductComponent from "./components/ProductComponent";
import { useEffect } from "react";
import { createClient } from "@/utils/supabase/client";

export default async function Home() {
    const bestSellers = fetchBestSellers();
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser();

    return (
        <>
            <section className="hero-section h-[80vh] wrapper w-full bg-bottom bg-hero bg-cover">
                <div className="flex flex-col h-full w-full justify-center items-center gap-14">
                    <p className="text-gray-700 text-lg dark:text-gray-300">Barangay kililihan, San Miguel</p>
                    <Link href="/menu" className="btn py-4 px-5 font-medium text-lg bg-yellow rounded-full text-black">Explore Menu</Link>
                    <h1 className={`md:text-5xl lg:text-6xl text-5xl dark:text-gray-200 text-gray-900`} style={jotiOne.style}>Leo’s Grill</h1>
                    <p className="text-center md:text-2xl text-lg dark:text-gray-300 text-black w-full">
                        Lorem ipsum odor amet, consectetuer adipiscing elit. Maximus morbi quam posuere sodales leo lobortis cubilia. Sed metus posuere mollis montes congue suspendisse. Parturient mi curae vehicula fermentum ipsum ligula augue feugiat. Tincidunt eleifend nisi nisl tempor odio quis.
                    </p> 
                </div>
            </section>
            <section className="wrapper py-10">
                <div className="flex items-center gap-3 w-full">
                    <h3 className="text-2xl font-medium text-yellow">EXPLORE OUR MENU</h3>
                    <div className="flex-1 border-spacing-x-60 border-2 border-dashed h-[1px] border-gray-300"></div>
                </div>
                {/* menu categories */}
                <div className="mt-8 flex flex-wrap gap-20 md:justify-start justify-center">
                    {categories.map((category, index) => (
                        <Link href="/menu" key={index} className="text-center">
                            <img src="" className="bg-gray-300 mx-auto rounded-full size-32 " alt="" />
                            <p className="mt-4">{category.name}</p>
                        </Link>
                    ))}
                </div>
                {/* --end menu categories */}
                {/* best sellers */}
                <div className="mt-36">
                    <h3 className="font-medium text-center text-yellow  text-3xl">Our Best Sellers</h3>
                    <div className="grid xl:grid-cols-5 md:grid-cols-4 grid-cols-2 gap-10 mt-14">
                        {bestSellers.map((product, index) => (
                            <ProductComponent key={index} product={product} />
                        ))}
                    </div>
                </div>
            </section>
            <section className="mt-14 py-24 wrapper bg-gray-400/5 relative">
                <img src="/images/overlay-top.png" className="w-full absolute top-0 left-0 h-16" alt="" />
                <img src="/images/overlay-bottom.png" className="w-full absolute bottom-0 left-0 h-16" alt="" />
                <div className="flex md:flex-row flex-col gap-14 md:items-center">
                    <img src="/images/about-image.jpg" className=" aspect-square md:w-2/6 w-3/4 mx-auto rounded-full object-cover" alt="" />
                    <div>
                        <h3 className="text-start text-yellow text-4xl">About Us</h3>
                        <p className="text-xl mt-5">Lorem ipsum odor amet, consectetuer adipiscing elit. Maximus morbi quam posuere sodales leo lobortis cubilia.</p>
                    </div>
                </div>
            </section>
            <section className=" mt-20">
                <h3 className="text-center text-yellow text-4xl">Contact Us</h3>
                <div className="flex flex-wrap gap-10 items-center mt-14">
                    {/* <img src="" className="w-2/5 h-[400px] bg-gray-200" alt="" /> */}
                    <div className="md:w-2/5 w-full bg-gray-200">
                        <iframe className="w-full" height={450} src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d685.2234862052254!2d124.28024426308396!3d13.70576441550931!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x33a01da62f317169%3A0x215cc25c35c4bef1!2sSan%20Miguel%20River%20Park%20and%20Resort!5e0!3m2!1sen!2sph!4v1729336633268!5m2!1sen!2sph" allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
                    </div>
                    <div className="px-5 py-5">
                        <p className="text-2xl">Barangay Kili-kilihan</p>
                        <p className="text-2xl">San Miguel, Catanduanes, Philippines</p>

                        <div className="mt-10">
                            <p className="text-sm font-light">For Inquiries and concerns you can call us on</p>
                            <p className="text-2xl">+63912345678</p>
                        </div>
                    </div>
                </div>
            </section>
            <footer className="bg-gray-500/10 py-10 wrapper">
                <div className="grid lg:grid-cols-4 grid-cols-2 gap-5 items-center">
                    <div>
                        <img src="/images/logo.png" className=" object-cover" width={70} height={70} alt="" />
                        <p className="mt-3 text-gray-400">
                            Lorem ipsum odor amet, consectetuer adipiscing elit. Maximus morbi quam posuere sodales leo lobortis cubilia.
                        </p>
                    </div>
                    <div>
                        <h5 className="text-xl">Contact</h5>
                        <ul className="mt-5 flex flex-col gap-3">
                            <li>
                                <div className="flex gap-3">
                                    <MapIcon className="text-gray-400" />
                                    <p className="text-gray-400">Bgy. Kilikilihan, San Miguel, Catanduanes, Philippines</p>
                                </div>
                            </li>
                            <li>
                                <div className="flex gap-3">
                                    <Phone className="text-gray-400" />
                                    <p className="text-gray-400">0918-423-2726</p>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h5 className="text-xl">Links</h5>
                        <ul className="mt-5 flex flex-row flex-wrap gap-3 text-gray-400">
                            <li>
                                <Link href="#">Home</Link>
                            </li>
                            <li>
                                <Link href="#">About</Link>
                            </li>
                            <li>
                                <Link href="#">Menu</Link>
                            </li>
                            <li>
                                <Link href="#">Sign In</Link>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h5 className="text-xl">Social Media</h5>
                        <ul className="mt-5 flex flex-row gap-3 text-gray-400">
                            <li>
                                <a href="#"><Facebook /></a>
                            </li>
                            <li>
                                <a href="#"><Instagram /></a>
                            </li>
                        </ul>
                    </div>
                </div>
            </footer>
        </>
    );
}

import { footerLinks } from '../assets/assets';
import {NavLink} from "react-router-dom"
const Footer = () => {

    return (
        <div className="px-6 md:px-16 mt-15 lg:px-24 xl:px-32 bg-[#4fbf8b]/10">
            <div className="flex flex-col md:flex-row items-start justify-between gap-10 py-10 border-b border-gray-500/30 text-gray-500">
                <div>
                    <NavLink className="flex w-[165px] items-center gap-0 bg-primary-dull px-3 py-1.5 rounded-lg">
                                <span className="text-xl md:text-2xl font-bold text-white">E</span>
                                <span className="text-xl md:text-2xl font-bold text-white">-</span>
                                <span className="text-xl md:text-2xl font-bold text-white/90">commerce</span>
                    </NavLink>                    
                    <p className="max-w-[410px] mt-6">We deliver fresh groceries by thousands, we aim to make your shopping experience simple and affordable.</p>
                </div>
                <div className="flex flex-wrap justify-between w-full md:w-[45%] gap-5">
                    {footerLinks.map((section, index) => (
                        <div key={index}>
                            <h3 className="font-semibold text-base text-gray-900 md:mb-5 mb-2">{section.title}</h3>
                            <ul className="text-sm space-y-1">
                                {section.links.map((link, i) => (
                                    <li key={i}>
                                        <a href={link.url} className="hover:underline transition">{link.text}</a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
            <p className="py-4 text-center text-sm md:text-base text-gray-500/80">
                Copyright {new Date().getFullYear()} © <a href={"/"}>GreenCart</a> All Right Reserved.
            </p>
        </div>
    );
};

export default Footer
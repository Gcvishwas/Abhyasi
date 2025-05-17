
import React from 'react'
import { Link } from 'react-router-dom';
import Container from './container';
import { Facebook, Instagram, Linkedin, Twitter } from 'lucide-react';
import { cn } from '@/lib/utils';
import { MainRoutes } from '@/lib/helpers';

//React.ReactNode is a type that represents any node that can be rendered in React, including strings, numbers, elements, and fragments.
interface SocialLinkProps {
    href: string;
    icon: React.ReactNode;
    hoverColor: string;
}

//React.FC is a type that represents a functional component in React. It is a generic type that takes the props type as an argument.
//In this case, SocialLink is a functional component that takes SocialLinkProps as its props type.

const SocialLink: React.FC<SocialLinkProps> = ({ href, icon, hoverColor }) => {
    return (
        <a href={href}
            target="_blank"
            rel="noopener noreferrer"
            className={`hover:${hoverColor}`}
        >
            {icon}
        </a >
    );
};

interface FooterLinkProps {
    to: string;
    children: React.ReactNode;
    className?: string;
}
const FooterLink: React.FC<FooterLinkProps> = ({ to, children, className }) => {
    return (
        <li>
            <Link
                to={to}
                className={cn(" text-gray-300 hover:text-gray-100", className)}
            >
                {children}
            </Link>
        </li>
    );
};
const Footer = () => {
    return (
        <div className="w-full bg-black text-gray-300 hover:text-gray-100 py-8">
            <Container>
                <div className='grid grid-cols-1 md:grid-cols-4 gap-8'>

                    {/* First Column Links */}
                    <div>

                        <h3 className='font-bold text-lg mb-4'>Quick Links</h3>
                        <ul className='space-y-2'>
                            {MainRoutes.map((route) => (
                                <FooterLink key={route.href} to={route.href}>
                                    {route.label}
                                </FooterLink>
                            ))}
                        </ul>
                    </div>

                    {/* Second column : About Us */}
                    <div>

                        <h3 className='font-bold text-lg mb-4'>About Us</h3>
                        <p>
                            Empowering your career journey with personalized interview prep, coaching, and resume expertise to help you achieve your professional goals.
                        </p>
                    </div>

                    {/* Third Column : Services */}
                    <div>

                        <h3 className='font-bold text-lg mb-4'>Services</h3>
                        <ul className='space-y-2'>
                            <FooterLink to="/services/interview-prep" >Prepare Interview</FooterLink>
                            <FooterLink to="/services/career-coaching">Career Advice</FooterLink>
                            <FooterLink to="/services/resume-building">Build Resume</FooterLink>
                        </ul>
                    </div>

                    {/* Fourth Column : Address and Social Media */}
                    <div>

                        <h3 className='font-bold text-lg mb-4'>Contact Us</h3>
                        <p className='mb-4'>Address</p>
                        <div className='flex gap-4'>
                            <SocialLink
                                href="https://facebook.com"
                                icon={<Facebook size={24} />}
                                hoverColor="text-blue-500"
                            />
                            <SocialLink
                                href="https://twitter.com"
                                icon={<Twitter size={24} />}
                                hoverColor="text-blue-400"
                            />
                            <SocialLink
                                href="https://instagram.com"
                                icon={<Instagram size={24} />}
                                hoverColor="text-pink-500"
                            />
                            <SocialLink
                                href="https://linkedin.com"
                                icon={<Linkedin size={24} />}
                                hoverColor="text-blue-700"
                            />
                        </div>
                    </div>
                </div>
            </Container>

        </div>
    )
}

export default Footer

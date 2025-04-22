import React from 'react'
import Footer from '../components/Footer/Footer';
import AboutIntro from '../components/AboutIntro/AboutIntro';
import SecurityInfoSection from '../components/SecurityInfoSection/SecurityInfoSection';
import WhyChooseUs from '../components/vision/vision';
import AboutContact from '../components/AboutContact/AboutContact';

export default function AboutUs() {
  return (
    <div>
        <AboutIntro/>
        <SecurityInfoSection/>
        <WhyChooseUs/>
<AboutContact/>
        </div>
  )
}

import React from 'react'
import Footer from '../components/Footer/Footer';
import ServicesIntro from '../components/ServicesIntro/ServicesIntro';
import OurServices from '../components/Services/Services';
import FAQ from '../components/FAQ/FAQ';
import ServicePara from '../components/ServicePara/ServicePara';
import ServiceIntroPara from '../components/ServicePara/ServiceIntroPara';
import DetailedServices from '../components/DetailedServices/DetailedServices';

export default function Services() {
  return (
    <div>
      <ServicesIntro/>
      <ServiceIntroPara/>
      {/* <DefenseSection/> */}
      {/* <OurServices/> */}
      <DetailedServices/>
      <ServicePara/>
      <FAQ/>
      {/* <PricingPlans/> */}
        </div>
  )
}

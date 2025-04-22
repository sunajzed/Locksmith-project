import React from 'react'
import CareersIntro from '../components/CareersIntro/CareersIntro'
import CareersIntroPara from '../components/CareersIntroPara/CareersIntroPara'
import WhyLocksmithCareers from '../components/WhyLocksmithCareers/WhyLocksmithCareers'
import LocksmithSteps from '../components/LocksmithSteps/LocksmithSteps'
import LockRequirements from '../components/LockRequirements/LockRequirements'
import LocksmithNetwork from '../components/LocksmithNetwork/LocksmithNetwork'


export default function Careers() {
  return (
    <div><CareersIntro/>
    <CareersIntroPara/>
    <WhyLocksmithCareers/>
    <LocksmithSteps/>
    <LockRequirements/>
    <LocksmithNetwork/>
    </div>
  )
}

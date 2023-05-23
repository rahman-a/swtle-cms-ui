import { Tabs, TabList, TabPanels, TabPanel } from '@chakra-ui/react'
import ServiceCardTab from './Service-Card'
import { CheckCircleIcon } from '@chakra-ui/icons'

import { PlantIcon, RiseIcon, HandShakeIcon } from '@icons'
import { useTranslation } from 'next-i18next'
import TextImageSection from './Text-Image-Section'

interface IndividualServicesProps {}

export default function IndividualServices(props: IndividualServicesProps) {
  const { t } = useTranslation('services')
  return (
    <Tabs isFitted>
      <TabList gap={4} flexDirection={{ base: 'column', md: 'row' }}>
        <ServiceCardTab
          title={t('services.individual.service.1.title')}
          icon={<CheckCircleIcon boxSize={{ base: '2rem', lg: '4rem' }} />}
        />
        <ServiceCardTab
          title={t('services.individual.service.2.title')}
          icon={<PlantIcon boxSize={{ base: '2rem', lg: '4rem' }} />}
        />
        <ServiceCardTab
          title={t('services.individual.service.3.title')}
          icon={<RiseIcon boxSize={{ base: '2rem', lg: '4rem' }} />}
        />
        <ServiceCardTab
          title={t('services.individual.service.4.title')}
          icon={<HandShakeIcon boxSize={{ base: '2rem', lg: '4rem' }} />}
        />
      </TabList>
      <TabPanels>
        <TabPanel>
          <TextImageSection
            title={`${t('services.individual.service.1.title')}`}
            description={`${t('services.individual.service.1.content')}`}
            sectionImage={{
              image: '/images/service-card.png',
            }}
            styles={{
              paddingTop: '0.5rem',
            }}
          />
        </TabPanel>
        <TabPanel>
          <TextImageSection
            title={`${t('services.individual.service.2.title')}`}
            description={`${t('services.individual.service.2.content')}`}
            sectionImage={{
              image: '/images/service-card.png',
            }}
            styles={{
              paddingTop: '0.5rem',
            }}
          />
        </TabPanel>
        <TabPanel>
          <TextImageSection
            title={`${t('services.individual.service.3.title')}`}
            description={`${t('services.individual.service.3.content')}`}
            sectionImage={{
              image: '/images/service-card.png',
            }}
            styles={{
              paddingTop: '0.5rem',
            }}
          />
        </TabPanel>
        <TabPanel>
          <TextImageSection
            title={`${t('services.individual.service.4.title')}`}
            description={`${t('services.individual.service.4.content')}`}
            sectionImage={{
              image: '/images/service-card.png',
            }}
            styles={{
              paddingTop: '0.5rem',
            }}
          />
        </TabPanel>
      </TabPanels>
    </Tabs>
  )
}

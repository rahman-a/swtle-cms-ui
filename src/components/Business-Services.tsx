import { Tabs, TabList, TabPanels, TabPanel } from '@chakra-ui/react'
import ServiceCardTab from './Service-Card'
import TextImageSection from './Text-Image-Section'

export type ServiceProps = {
  id: number
  title: string
  icon: string
  content: {
    id: number
    title: string
    description: string
    sectionImage: string
  }
}

interface BusinessServicesProps {
  services: ServiceProps[]
}

export default function BusinessServices({ services }: BusinessServicesProps) {
  return (
    <Tabs isFitted>
      <TabList gap={4} flexDirection={{ base: 'column', md: 'row' }}>
        {services.length > 0 &&
          services.map((item: ServiceProps) => (
            <ServiceCardTab key={item.id} title={item.title} icon={item.icon} />
          ))}
      </TabList>
      <TabPanels>
        {services.length > 0 &&
          services.map((item: ServiceProps) => (
            <TabPanel key={item.id}>
              <TextImageSection
                title={item.content.title}
                description={item.content.description}
                sectionImage={{
                  image: item.content.sectionImage,
                }}
                styles={{
                  paddingTop: '0.5rem',
                }}
              />
            </TabPanel>
          ))}
      </TabPanels>
    </Tabs>
  )
}

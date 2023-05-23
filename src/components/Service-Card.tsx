import { forwardRef } from 'react'
import {
  Card,
  CardHeader,
  CardBody,
  Text,
  useTab,
  useMultiStyleConfig,
} from '@chakra-ui/react'

import { motion } from 'framer-motion'
import { zoomIn, fadeDown } from '@animation-variants'

interface IServiceCardProps {
  title: string
  icon: React.ReactNode
}
const ServiceCardTab = forwardRef<HTMLDivElement, IServiceCardProps>(
  ({ title, icon, ...rest }, ref) => {
    // 1. Reuse the `useTab` hook
    const tabProps = useTab({ title, icon, ...rest, ref })

    // 2. Hook into the Tabs `size`, `variant`, props
    const styles = useMultiStyleConfig('Tabs', tabProps)
    return (
      <Card
        display={{ base: 'flex' }}
        flexDirection={{ base: 'column' }}
        alignItems='center'
        size={{ base: 'sm', md: 'md', lg: 'lg' }}
        backgroundColor='white'
        boxShadow='md'
        borderRadius='lg'
        width={{ base: '100%', md: '25%' }}
        p={{ base: 4 }}
        gap={{ base: 4, lg: 8 }}
        outline='none'
        overflow='hidden'
        _hover={{
          cursor: 'pointer',
          backgroundColor: 'secondary',
          color: 'white',
        }}
        _selected={{
          backgroundColor: 'secondary',
          color: 'white',
        }}
        __css={styles.tab}
        {...tabProps}
      >
        {icon && (
          <CardHeader
            as={motion.div}
            initial='hide'
            whileInView='show'
            variants={zoomIn}
          >
            {icon}
          </CardHeader>
        )}
        <CardBody
          alignContent='center'
          as={motion.div}
          initial='hide'
          whileInView='show'
          variants={fadeDown}
        >
          <Text
            textAlign='center'
            fontSize={{ base: 'sm', md: 'md', lg: 'xl' }}
            fontWeight={{ base: 'normal', lg: 'bold' }}
          >
            {title}
          </Text>
        </CardBody>
      </Card>
    )
  }
)

ServiceCardTab.displayName = 'ServiceCardTab'

export default ServiceCardTab

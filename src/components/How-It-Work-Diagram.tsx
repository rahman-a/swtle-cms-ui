import { Box, Flex, useBreakpointValue } from '@chakra-ui/react'
import Image from 'next/image'

interface IHowItWorkDiagramProps {
  images: {
    base: string
    sm: string
    lg: string
  }
}

export default function HowItWorkDiagram({
  images,
  ...rest
}: IHowItWorkDiagramProps) {
  const imageSrc = useBreakpointValue({ ...images }, { fallback: 'lg' })
  return (
    <Box py={20} backgroundColor='surface' position='relative' {...rest}>
      <Flex
        position='relative'
        justify='center'
        align='center'
        height={{
          base: '22rem',
          sm: '25rem',
          xl: '35rem',
        }}
      >
        <Image src={`${imageSrc}`} alt='How it work diagram' fill />
      </Flex>
    </Box>
  )
}

// export default function HowItWorkDiagram(props: IHowItWorkDiagramProps) {
//   return (
//     <Box py={20} px={1} backgroundColor='surface' position='relative'>
//       <Flex
//         position='relative'
//         wrap='wrap'
//         justify='center'
//         align='center'
//         gap={{ base: 24 }}
//       >
//         {Array.from({ length: 7 }, (_, i) => (
//           <Step key={i} step={i + 1} />
//         ))}
//         <Box
//           position='absolute'
//           display={{ base: 'none', md: 'block' }}
//           left='0'
//           right='0'
//           width='100%'
//           height='100%'
//         >
//           <Box
//             position='absolute'
//             top='3.5rem'
//             left='10rem'
//             border='2px dotted'
//             borderColor='gray.500'
//             width='88%'
//             zIndex='1'
//           ></Box>
//           <Box
//             position='absolute'
//             top='3.5rem'
//             right='1rem'
//             border='2px dotted'
//             borderColor='gray.500'
//             borderRadius='0 3rem 3rem 0'
//             width='0'
//             height='15rem'
//             zIndex='1'
//           ></Box>
//           <Box
//             position='absolute'
//             bottom='249px'
//             right='21px'
//             border='2px dotted'
//             borderColor='gray.500'
//             width='74%'
//             zIndex='1'
//           ></Box>
//           <Box
//             position='absolute'
//             bottom='226px'
//             left={{ base: '1rem', md: '10rem', xl: '365px', '2xl': '370px' }}
//             border='2px dotted'
//             borderColor='gray.500'
//             width='0'
//             height='1.6rem'
//             zIndex='1'
//           ></Box>
//           <Box
//             position='absolute'
//             bottom='170px'
//             left='340px'
//             border='2px dotted'
//             borderColor='gray.500'
//             width='55%'
//             zIndex='1'
//           ></Box>
//         </Box>
//       </Flex>
//     </Box>
//   )
// }

// type IStepProps = {
//   step: number
// }
// function Step({ step }: IStepProps) {
//   return (
//     <VStack
//       spacing={4}
//       zIndex='111'
//       alignItems='center'
//       width={{ base: 72, md: '7.2rem', lg: 44, xl: 56, '2xl': 72 }}
//     >
//       <HexaGon step={step} />
//       <Text as='h3' fontSize='xl' textAlign='center'>
//         Online Debt Verification
//       </Text>
//       <Text as='p' fontSize='sm' textAlign='center' color='gray.400'>
//         The creditor must prove the debt maturity electronically on the website
//         by mentioning the amount of debt and the maturity date.
//       </Text>
//     </VStack>
//   )
// }

// type IHexaGon = {
//   step: number
// }

// function HexaGon({ step }: IHexaGon) {
//   return (
//     <Box className='hexagon'>
//       <VStack>
//         <Text as='p' fontSize={{ base: 'sm' }} letterSpacing={1}>
//           STEP
//         </Text>
//         <Text as='h4' fontSize={{ base: '2xl' }}>
//           {step < 10 ? `0${step}` : step}
//         </Text>
//       </VStack>
//     </Box>
//   )
// }

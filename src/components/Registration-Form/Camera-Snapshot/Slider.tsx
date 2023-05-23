import { forwardRef } from 'react'
import {
  Slider as ChakraSlider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  SliderProps,
  Box,
} from '@chakra-ui/react'
import { DotCircleIcon } from '@/src/icons'
interface ISliderProps {
  slider: SliderProps
}

const Slider = forwardRef<HTMLDivElement, ISliderProps>(
  ({ slider, ...rest }, ref) => {
    return (
      <ChakraSlider {...slider}>
        <SliderTrack bg='gray.400'>
          <SliderFilledTrack bg='secondary' />
        </SliderTrack>
        <SliderThumb>
          <Box color='secondary' as={DotCircleIcon} />
        </SliderThumb>
      </ChakraSlider>
    )
  }
)

Slider.displayName = 'Slider'

export default Slider

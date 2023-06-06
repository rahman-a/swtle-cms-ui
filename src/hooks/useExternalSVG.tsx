import * as React from 'react'
import 'external-svg-loader'

export interface IUseExternalSVGProps {
  src: string
}

export default function useExternalSVG({ src }: IUseExternalSVGProps) {
  return (
    <svg
      data-src={src}
      width='75px'
      height='75px'
      fill='currentColor'
      xmlns='http://www.w3.org/2000/svg'
    />
  )
}

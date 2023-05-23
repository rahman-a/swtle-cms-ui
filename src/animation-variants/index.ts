import { Variants } from 'framer-motion'
export const fadeUp: Variants = {
  hide: {
    opacity: 0,
    y: 50,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1,
    },
  },
}

export const fadeDown: Variants = {
  hide: {
    opacity: 0,
    y: -50,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1,
    },
  },
}

export const fadeRight: Variants = {
  hide: {
    opacity: 0,
    x: -50,
  },
  show: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 1,
    },
  },
}

export const fadeLeft: Variants = {
  hide: {
    opacity: 0,
    x: 50,
  },
  show: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 1,
    },
  },
}

export const fadeDownRight: Variants = {
  hide: {
    opacity: 0,
    x: -50,
    y: -50,
  },
  show: {
    opacity: 1,
    x: 0,
    y: 0,
    transition: {
      duration: 1,
    },
  },
}

export const fadeDownLeft: Variants = {
  hide: {
    opacity: 0,
    x: 50,
    y: -50,
  },
  show: {
    opacity: 1,
    x: 0,
    y: 0,
    transition: {
      duration: 1,
    },
  },
}

export const zoomIn: Variants = {
  hide: {
    opacity: 0,
    scale: 0,
  },
  show: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 1,
    },
  },
}

export const zoomOut: Variants = {
  hide: {
    opacity: 0,
    scale: 1.1,
  },
  show: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 1,
    },
  },
}

export const slideUp: Variants = {
  hide: {
    opacity: 0,
    y: 50,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1,
    },
  },
}
export const flipDown: Variants = {
  hide: {
    opacity: 0,
    rotateX: 90,
  },
  show: {
    opacity: 1,
    rotateX: 0,
    transition: {
      duration: 1,
    },
  },
}

import type { SvgIconProps } from '@mui/material'
import { SvgIcon } from '@mui/material'
import type { FC } from 'react'

const BaseIcon: FC<SvgIconProps> = ({ d, ...props }) => {
  return (
    <SvgIcon {...props}>
      <path d={d}/>
    </SvgIcon>
  )
}

const Check = 'M9 16.17 4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z'
const ChevronRight = 'M10 6 8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z'
const CircularArrows = 'M 12 2 C 10.615 1.998 9.214625 2.2867656 7.890625 2.8847656 L 8.9003906 4.6328125 C 9.9043906 4.2098125 10.957 3.998 12 4 C 15.080783 4 17.738521 5.7633175 19.074219 8.3222656 L 17.125 9 L 21.25 11 L 22.875 7 L 20.998047 7.6523438 C 19.377701 4.3110398 15.95585 2 12 2 z M 6.5097656 4.4882812 L 2.2324219 5.0820312 L 3.734375 6.3808594 C 1.6515335 9.4550558 1.3615962 13.574578 3.3398438 17 C 4.0308437 18.201 4.9801562 19.268234 6.1601562 20.115234 L 7.1699219 18.367188 C 6.3019219 17.710187 5.5922656 16.904 5.0722656 16 C 3.5320014 13.332354 3.729203 10.148679 5.2773438 7.7128906 L 6.8398438 9.0625 L 6.5097656 4.4882812 z M 19.929688 13 C 19.794687 14.08 19.450734 15.098 18.927734 16 C 17.386985 18.668487 14.531361 20.090637 11.646484 19.966797 L 12.035156 17.9375 L 8.2402344 20.511719 L 10.892578 23.917969 L 11.265625 21.966797 C 14.968963 22.233766 18.681899 20.426323 20.660156 17 C 21.355156 15.801 21.805219 14.445 21.949219 13 L 19.929688 13 z'
const Close = 'M19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z'
const ContentCopy = 'M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z'
const Edit = 'M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34a.9959.9959 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z'
const ExpandMore = 'M16.59 8.59 12 13.17 7.41 8.59 6 10l6 6 6-6z'

export const CheckIcon: FC<SvgIconProps> = (props) => {
  return <BaseIcon d={Check} {...props} />
}

export const ChevronRightIcon: FC<SvgIconProps> = (props) => {
  return <BaseIcon d={ChevronRight} {...props} />
}

export const CircularArrowsIcon: FC<SvgIconProps> = (props) => {
  return <BaseIcon d={CircularArrows} {...props} />
}

export const CloseIcon: FC<SvgIconProps> = (props) => {
  return <BaseIcon d={Close} {...props} />
}

export const ContentCopyIcon: FC<SvgIconProps> = (props) => {
  return <BaseIcon d={ContentCopy} {...props} />
}

export const EditIcon: FC<SvgIconProps> = (props) => {
  return <BaseIcon d={Edit} {...props} />
}

export const ExpandMoreIcon: FC<SvgIconProps> = (props) => {
  return <BaseIcon d={ExpandMore} {...props} />
}

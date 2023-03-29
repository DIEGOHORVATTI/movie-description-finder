import { PATH_DOCS } from '../../routes/paths'
import Iconify from '@Components/Iconify'

const ICON_SIZE = {
  width: 22,
  height: 22
}

const menuConfig = [
  {
    title: 'Home',
    icon: <Iconify icon={'eva:home-fill'} {...ICON_SIZE} />,
    path: '/'
  },
  {
    title: 'Documentation',
    icon: <Iconify icon={'eva:book-open-fill'} {...ICON_SIZE} />,
    path: PATH_DOCS
  }
]

export default menuConfig

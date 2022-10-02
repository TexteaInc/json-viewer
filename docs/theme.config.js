import { useRouter } from 'next/router'

export default {
  titleSuffix: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { route } = useRouter()
    if (route === '/') return ''
    return ' – Json Viewer'
  },
  logo: '@textea/json-viewer',
  project: {
    link: 'https://github.com/TexteaInc/json-viewer'
  },
  navigation: {
    prev: true,
    next: true
  },
  editLink: {
    text: 'Edit this page on GitHub'
  },
  footer: {
    text: `MIT ${new Date().getFullYear()} © Textea, Inc.`
  }
}

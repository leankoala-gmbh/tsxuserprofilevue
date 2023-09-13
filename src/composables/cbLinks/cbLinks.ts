export function useCbLinks () {
  const cleverBridgeLinks = {
    terms: {
      url: 'https://store.plesk.com/1404/?scope=optandc',
      text: t('terms')
    },
    contact: {
      url: 'https://store.plesk.com/1404/?scope=opcuseco',
      text: t('contact')
    },
    revocation: {
      url: 'https://store.plesk.com/1404/?scope=opcancelation',
      text: t('revocation')
    },
    security: {
      url: 'https://store.plesk.com/1404/?scope=opsecurity',
      text: t('security')
    },
    legal: {
      url: 'https://store.plesk.com/1404/?scope=opimprint',
      text: t('legal')
    },
    privacy: {
      url: 'https://store.plesk.com/1404/?scope=opprivacy',
      text: t('privacy')
    }
  }

  const getLinks = () => {
    return cleverBridgeLinks
  }
  return {
    getLinks
  }
}

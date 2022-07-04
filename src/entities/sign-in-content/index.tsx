import Typography from '@razrabs-ui/typography'
import { ReactNode } from 'react'
import { ModalContent } from 'shared/ui'

export const SignInContent: ReactNode = (
  <ModalContent>
    <Typography uppercase size='xl'>
      Мы логиним через <br /> гитхаб
    </Typography>
    <Typography lineHeight={28} size='lg'>
      После логина появится возможность комментировать материалы. А дальше мы
      придумаем, какие возможности появятся у залогированного читателя
    </Typography>
  </ModalContent>
)
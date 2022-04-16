import type { GetServerSideProps, NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import {
  CurrentFrontPage,
  CurrentFrontPageQuery,
  FrontPage,
} from 'features/front-page'
import { client } from 'shared/api'

export const METADATA_MOCK = {
  title: 'Разрабы',
  description: 'Медиа для разработчиков',
  previewUrl: '/public/images/logo/avatar.png',
}

type Props = {
  frontPage: CurrentFrontPage['currentFrontPage']
}

const HomePage: NextPage<Props> = ({ frontPage }) => {
  const router = useRouter()
  const currentPage = router.route

  return (
    <>
      <Head>
        <title>Разрабы</title>
        <meta content='Lorem ipsum' name='description' />

        {/* Twitter */}
        <meta content='summary' name='twitter:card' />
        <meta content={METADATA_MOCK.title} name='twitter:title' />
        <meta
          content={METADATA_MOCK.description}
          property='twitter:description'
        />
        <meta content={METADATA_MOCK.previewUrl} property='twitter:image' />
        <meta content={currentPage} property='twitter:url' />

        {/* Open Graph */}
        <meta content={currentPage} property='og:url' />
        <meta content='Разрабы' property='og:site_name' />
        <meta content={METADATA_MOCK.previewUrl} property='og:image' />
        <meta content={METADATA_MOCK.title} property='og:title' />
        <meta content='400' property='og:image:width' />
        <meta content={METADATA_MOCK.description} property='og:description' />

        <link href='/public/favicon.ico' rel='icon' />
      </Head>

      <FrontPage frontPage={frontPage} />
    </>
  )
}

export const getServerSideProps: GetServerSideProps<Props> = async () => {
  const {
    data: { currentFrontPage },
  } = await client.query<CurrentFrontPage>({
    query: CurrentFrontPageQuery,
    fetchPolicy: 'no-cache',
  })

  // Необходимо отсортировать, чтобы на мобильных устройствах расставлять контент в +- правильном порядке
  const sortedContent = [...currentFrontPage.content]

  sortedContent
    .sort((a, b) => a.position.x - b.position.x)
    .sort((a, b) => a.position.y - b.position.y)

  const frontPage = Object.assign({}, currentFrontPage, {
    content: sortedContent,
  })

  return {
    props: { frontPage },
  }
}

export default HomePage

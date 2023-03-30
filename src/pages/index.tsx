import { Box, Typography, Container } from '@mui/material'
import { MotionContainer, varBounce } from '@Components/animate'
import { styled } from '@mui/material/styles'
import { m } from 'framer-motion'
import Page from '@Components/Page'
import Layout from '../layouts'

const RootStyle = styled('div')(({ theme }) => ({
  display: 'flex',
  height: '100%',
  alignItems: 'center',
  paddingTop: theme.spacing(15),
  paddingBottom: theme.spacing(10)
}))

PageHome.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>
}

export default function PageHome() {
  return (
    <Page title="Home" sx={{ height: 1 }}>
      <RootStyle>
        <Container component={MotionContainer}>
          <Box sx={{ maxWidth: 480, margin: 'auto', textAlign: 'center' }}>
            <m.div variants={varBounce().in}>
              <Typography variant="h3" paragraph>
                Bem vindo a home
              </Typography>
            </m.div>
          </Box>
        </Container>
      </RootStyle>
    </Page>
  )
}

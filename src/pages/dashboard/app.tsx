import { Container, Grid } from '@mui/material'
import useSettings from '@Hooks/useSettings'
import Layout from '@Layouts/index'
import Page from '@Components/Page'
GeneralApp.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>
}

export default function GeneralApp() {
  const { themeStretch } = useSettings()

  return (
    <Page title="General: App">
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Grid container spacing={3}>
              <h1>hello world</h1>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Page>
  )
}

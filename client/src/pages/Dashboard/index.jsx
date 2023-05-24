import SimpleNavbar from '../../components/Utils/Navbar'
import Donut from '../../components/Dashboard/Charts/donut'
import RadialBar from '../../components/Dashboard/Charts/radialBar'
import AreaChart from '../../components/Dashboard/Charts/area'

import { MonitorTable } from '../../components/Dashboard/UsersTable'
import UserProfile from '../../components/Dashboard/UserProfile'
import TasksList from '../../components/Dashboard/Tasks'

import {
  Div,
  DashboardContainer,
  Container,
  Informations,
  Statistics,
  Performance,
  Monitor,
  Indicators,
  Indicator,
  Spacing,
  Title,
} from './style'

const Dashboard = () => {
  return (
    <DashboardContainer>
      <SimpleNavbar />
      <Container>
        <Div>
          <Informations>
            <UserProfile />
            <Spacing />
            <TasksList />
          </Informations>

          <Statistics>
            <Performance>
              <Title>
                <h1>Performance</h1>
              </Title>
              <AreaChart />
            </Performance>

            <Indicators>
              <Indicator>
                <Title>
                  <h1>Sessões</h1>
                </Title>
                <RadialBar />
              </Indicator>
              <Spacing />
              <Indicator>
                <Title>
                  <h1>Interações no fórum</h1>
                </Title>
                <Donut />
              </Indicator>
            </Indicators>

            <Monitor>
              <Title>
                <h1>Monitor SQL</h1>
              </Title>
              <MonitorTable />
            </Monitor>
          </Statistics>
        </Div>
      </Container>
    </DashboardContainer>
  )
}

export default Dashboard

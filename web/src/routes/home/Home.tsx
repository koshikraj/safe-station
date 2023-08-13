import { Link, useNavigate } from 'react-router-dom';
import logo from '../../assets/icons/cover.svg'
import './Home.css';
import { Container, Image, Paper, Group, Button} from "@mantine/core";
import { useStyles } from "./home.screen.styles";
import { RoutePath } from '../../navigation';

function Home() {

  const { classes } = useStyles();
  const navigate = useNavigate()

  return (

    <Container>
    <Container className={classes.voucherScreenContainer}>
      <Container sx={{ padding: 0, marginTop: "150px", display: "flex", alignItems: "center",  justifyContent: "center"}}>
      <Paper shadow="xl" withBorder radius="md" p="xl" style={{
                    marginTop: 30, 
                    width: 700
                  }}>
      <div style={{ padding: 0,  display: "flex",  justifyContent: "center"}}>
       <Image style={{
                    marginTop: 70
                  }} src={logo} width={400}/>
          </div>
        <div style={{ padding: 0,  display: "flex",  justifyContent: "center"}}>
        <p className={classes.p}>Secure plugin marketplace to extend the Safe account functionalities using plugin attestations</p> 
      </div>
      <div style={{ padding: 0,  display: "flex",  justifyContent: "center"}}>
      <Button
                onClick={() => { navigate(RoutePath.plugins) }}
                size="lg"
                radius="md"
                color={ "#20283D" }
                variant={ "filled"  }
                style={{
                  backgroundColor: "#20283D"
                }}
              >
                Get Started
              </Button>
      </div>
      
       </Paper>
      </Container>
      <div className={classes.actionsContainer}>

      </div>

    </Container>
  </Container>

  );
}

export default Home;

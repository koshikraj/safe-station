import { Box, Center, Container, Group, Loader, Modal, Text, Image, Paper, Stack, Button, TextInput, Divider, Alert, Skeleton } from "@mantine/core";
import { useStyles } from "./plugin-details.screen.styles";
import usePluginStore from "../../store/plugin/plugin.store";
import { IconAlertCircle, IconAt, IconCheck, IconCopy, IconPlugConnected, IconCheckbox, IconWallet } from "@tabler/icons";
import { BackButton, ProgressStatus, Title } from "../../components";
import { useCallback, useEffect, useState } from "react";
import { disablePlugin, enablePlugin, loadAttestation } from "../../logic/plugins";
import { EAS, Offchain, SchemaEncoder, SchemaRegistry } from "@ethereum-attestation-service/eas-sdk";
import { ethers } from "ethers";



export const PluginDetailsScreen = () => {
  const { classes } = useStyles();

  const [attested, setAttested] = useState(false);
  const [creating, setCreating] = useState(false);
  const [attestation, setAttestation ]: any = useState();

  console.log(attestation)

 
  const { pluginDetails } = usePluginStore(
    (state: any) => state
  );



  useEffect(() => {

    ;(async () => {

      const attestionId = await loadAttestation(pluginDetails.address)
      try {

        const EASContractAddress = "0x4200000000000000000000000000000000000021"; // Sepolia v0.26

        // Initialize the sdk with the address of the EAS Schema contract address
        const eas = new EAS(EASContractAddress);
        
        //  type SignerOrProvider = ethers.Signer | ethers.Provider;
        const provider =  new ethers.BrowserProvider(window.ethereum)
        console.log(provider)
        eas.connect(provider)

        setAttested(await eas.isAttestationValid(attestionId))

        const attestation = await eas.getAttestation(attestionId);
        setAttestation(attestation);
    
      }
      catch(e)
      {
        console.log(e)
      }
      
  })()   
  }, [])

  const handleToggle = useCallback(async () => {

    if (pluginDetails?.enabled === undefined) return
    try {
        if (pluginDetails.enabled)
            await disablePlugin(pluginDetails.address)
        else 
            await enablePlugin(pluginDetails.address, pluginDetails.metadata.requiresRootAccess)
    } catch (e) {
        console.warn(e)
    }
}, [pluginDetails])

  return (
    <Paper withBorder className={classes.settingsContainer}>
    <Container className={classes.formContainer}>
    {/* <Container className={classes.box}> */}
    <Modal
      centered
      opened={creating}
      onClose={() => !creating}
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
      withCloseButton={false}
      // overlayOpacity={0.5}
      size={320}
    >
      <Box sx={{ padding: "20px" }}>
        <Group>
          <Container
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: "20px",
            }}
          >
            <Loader />
            
            <Text mt={"lg"} align='center'> Installing
            <Box sx={{ paddingTop: "20px" }}><Center><Image src={''} width={50}/></Center> </Box>
            </Text>
            
          </Container>
        </Group>
      </Box>
    </Modal>
    {/* <Paper className={classes.formContainer} withBorder> */}
      {/* <BackButton label="Back to Previous" onClick={backButtonHandler} /> */}
      <Group mb={30}>
        <Title>Plugin Details</Title>
      </Group>

      <Paper shadow="xl" withBorder radius="md" p="xl" style={{
                    marginTop: 30
                  }}>
        <Stack>

        <Text size="md" weight={600}>
        {pluginDetails.metadata.name}
        </Text>{" "}

          


        <Text size="sm" weight={600}>
              ⚙️ Version: {pluginDetails.metadata.version}
        </Text>{" "}
       <Group >
         


            <Button
                // loading={registering}
                onClick={() => { handleToggle() }}
                leftIcon={<IconPlugConnected />} 
                color={ pluginDetails.enabled ? "red" : "dark" }
                variant={ pluginDetails.enabled ? "outline" : "filled" }
                style={{
                  background:
                  pluginDetails.enabled ? "": "#81af6f" ,
                }}
              >
               { pluginDetails.enabled ? "Disable Plugin" : "Enable Plugin" }
              </Button>


              </Group>

              </Stack>


          </Paper>

          <Paper shadow="xl" withBorder radius="md" p="xl" style={{
                    marginTop: 30
                  }} >

          <Stack>
          <Group sx={{ justifyContent: "space-between" }}>
            <Text size="md" weight={600}>
              Audit details 🛡️
            </Text>{" "}

          </Group> 

        {!attestation ?
        <>
          <Group
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
        <Skeleton height={80} mt={6} radius="lg"  width="100%" />
        </Group>
        <Group
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Skeleton height={20} mt={6}  radius="xl"  width="100%" />
        </Group>  
        </>
        :
        <>
          { attested && <> 
          
          <Alert icon={<IconCheck size="10rem" />}  title="Verified plugin 🛡️" color="green" >
             The plugin has been audited and attested.
          </Alert> 

          <Text size="sm" weight={600}>
              ⚙️ Attester: {attestation.attester}
        </Text>{" "}
          </>
          }

          <Group >  

          {  ! attested && <Button
          // className={classes.button}
          variant="default"
          leftIcon={<IconCheckbox />} 
          onClick={() => {}}
        >
          Add Attestation
        </Button>
        }
        </Group >
        </>
        }


          </Stack>
          </Paper>


  
   



  </Container>
  </Paper>
  );
};

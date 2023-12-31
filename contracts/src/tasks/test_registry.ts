import "hardhat-deploy";
import "@nomicfoundation/hardhat-ethers";
import { task } from "hardhat/config";
import { getPlugin, getRegistry, getRelayPlugin } from "../utils/contracts";
import { IntegrationType } from "../utils/constants";
import { loadPluginMetadata } from "../utils/metadata";

task("register-plugin", "Registers the sample Plugin in the Safe{Core} test register")
    .setAction(async (_, hre) => {
        const registry = await getRegistry(hre)
        const plugin = await getRelayPlugin(hre)
        await registry.addIntegration(await plugin.getAddress(), IntegrationType.Plugin)
        console.log("Registered Plugin registry")
    });


task("attest-plugin", "Attest the sample Plugin in the Safe{Core} test plugin attestation")
    .setAction(async (_, hre) => {
        const registry = await getRegistry(hre)
        const plugin = await getRelayPlugin(hre)
        await registry.attestIntegration(await plugin.getAddress(), "0x4200000000000000000000000000000000000021", "0xe7599adc88f7f1055acdb284a1672cddab4b10c85ba12e9eaa50e735330ac6e0")
        console.log("Registered Plugin registry")
    });

task("list-plugins", "List available Plugins in the Safe{Core} test register")
    .setAction(async (_, hre) => {
        const registry = await getRegistry(hre)
        const events = await registry.queryFilter(registry.filters.IntegrationAdded )
        for (const event of events) {
            try {
            const plugin = await getPlugin(hre, event.args.integration)
            const metadata = await loadPluginMetadata(hre, plugin)
            console.log(event.args.integration, metadata) 
            }
            catch(e) {
                console.log(e)
                // error
            }
        }
    });

export { }
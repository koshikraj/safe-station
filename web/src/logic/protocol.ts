import { Interface, ethers, Signer } from "ethers"
import protocolDeployments from "@safe-global/safe-core-protocol"
import { getProvider } from "./web3"
import { PROTOCOL_CHAIN_ID } from "./constants";

const Metadata_PROVIDER_ABI = [
    "function retrieveMetadata(bytes32 metadataHash) external view returns (bytes metadata)"
]

const PLUGIN_ABI = [
    "function metadataHash() public view returns (bytes32 metadataHash)",
    "function metadataProvider() external view returns (uint256 providerType, bytes location)"
]

export const getManager = async() => {
    const provider = await getProvider()
    const registryInfo = protocolDeployments[PROTOCOL_CHAIN_ID][0].contracts.SafeProtocolManagerAttestation;
    return new ethers.Contract(
        registryInfo.address,
        registryInfo.abi,
        provider
    )
}

export const getRegistry = async(signer?: Signer) => {

    const provider = await getProvider()
    const registryInfo = protocolDeployments[PROTOCOL_CHAIN_ID][0].contracts.SafeProtocolRegistryAttestation;

    return new ethers.Contract(
        registryInfo.address,
        registryInfo.abi,
        signer ? signer : provider
    )
}

export const getPlugin = async(pluginAddress: string) => {
    const provider = await getProvider()
    console.log(new Interface(PLUGIN_ABI))
    return new ethers.Contract(
        pluginAddress,
        PLUGIN_ABI,
        provider
    )
}

export const getMetadataProvider = async(providerAddress: string) => {
    const provider = await getProvider()
    return new ethers.Contract(
        providerAddress,
        Metadata_PROVIDER_ABI,
        provider
    )
}
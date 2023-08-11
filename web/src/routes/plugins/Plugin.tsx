import { FunctionComponent, useCallback, useEffect, useState } from "react";
import WarningIcon from '@mui/icons-material/Warning';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import * as blockies from 'blockies-ts';
import "./Plugins.css";
import { PluginMetadata } from "../../logic/metadata";
import { PluginDetails, disablePlugin, enablePlugin, loadPluginDetails } from "../../logic/plugins";
import { openSafeApp } from "../../logic/safeapp";
import { Button, Card, Stack, Tooltip } from '@mui/material';
import { GenericCard } from "../../components";
import { useNavigate } from "react-router-dom";
import usePluginStore from "../../store/plugin/plugin.store";
import { RoutePath } from "../../navigation";
import { Group, Skeleton } from "@mantine/core";

type PluginMetaProps = {
    metadata: PluginMetadata;
  };

const PluginMeta: FunctionComponent<PluginMetaProps> = ({ metadata }) => {
    return (
        <>
            {metadata.name} - {metadata.version}
        </>
    );
};

type PluginProps = {
  address: string;
};

export const Plugin: FunctionComponent<PluginProps> = ({ address }) => {
    const [details, setDetails] = useState<PluginDetails|undefined>(undefined);
    const blocky = blockies.create({ seed: address }).toDataURL();
    const navigate = useNavigate();

    const { setPluginDetails } = usePluginStore(
        (state: any) => state
      );
    useEffect(() => {
        const fetchData = async() => {
            try {
                setDetails(await loadPluginDetails(address))
            } catch(e) {
                console.warn(e)
            }
        }
        fetchData();
    }, [address])

    const handleClick = (details: any) => {

        setPluginDetails({ ...details, address: address});
        navigate(RoutePath.pluginDetails); 

    }

    return (
        // <Card className="Plugin">
        //     <Tooltip title={address}><img className="AddressIcon" src={blocky} /></Tooltip>
        //     <div className="Plugin-title">{!details ? "Loading Metadata" : <PluginMeta metadata={details.metadata} />}</div>
        //     {details?.metadata?.requiresRootAccess == true && <WarningIcon color="warning" />}
        //     {details?.enabled != undefined && <Button className="Plugin-toggle" onClick={handleToggle}>{details?.enabled ? "Disable" : "Enable"}</Button>}
        //     {(details?.metadata?.appUrl?.length ?? 0) > 0 && <OpenInNewIcon className="Plugin-link" onClick={() => openSafeApp(details?.metadata?.appUrl!!)} />}
        // </Card>

            <GenericCard
            title={details?.metadata.name}
            image={details?.metadata.iconUrl}
            enabled={details?.enabled}
            loading={ details == undefined }
            onClick={ () => handleClick(details) }
            />
            



    );
};

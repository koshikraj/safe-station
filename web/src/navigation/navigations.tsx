import { Routes, Route } from "react-router";
// import { RequireAuth, NotFound } from "../components";
import PluginList from '../routes/plugins/PluginList';
import { PluginDetailsScreen } from '../routes/plugins/plugin-details.screen';
// import { GlobalStyle } from "../utils";
import { RoutePath } from "./route-path";

export const Navigation = () => {
  return (
    <Routes>
      <Route path={RoutePath.login} element={<PluginList />} />
      <Route path={RoutePath.plugins} element={<PluginList />} />
      <Route path={RoutePath.account} element={<PluginList />} />
      <Route path={RoutePath.pluginDetails} element={<PluginDetailsScreen />} />

    </Routes>
  );
};

// export const LandingPageNavigation = () => {
//   return (
//     <>
//       <GlobalStyle />
//       <Routes>
//         <Route path={RoutePath.home} element={<LandingScreen />} />
//         <Route path={RoutePath.teams} element={<TeamsScreen />} />
//       </Routes>
//     </>
//   );
// };

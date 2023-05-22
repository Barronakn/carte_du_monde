import { QueryClient, QueryClientProvider } from "react-query";
import MapboxMap from "../components/MapboxMap";

const Map = () => {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <MapboxMap />
    </QueryClientProvider>
  );
};

export default Map;

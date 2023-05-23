import { QueryClient, QueryClientProvider } from "react-query";
import MapboxMap from "../components/MapboxMap";

const Map = () => {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <div>
        <h1 className="text-center text-4xl bg-gray-800 text-white ">
          Carte du monde
        </h1>
        <div className="map">
          <MapboxMap />
        </div>
      </div>
    </QueryClientProvider>
  );
};

export default Map;

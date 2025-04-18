import mapsData from "@/data/maps.json";

export async function generateStaticParams() {
  return mapsData.map((map) => ({
    slug: map.name,
  }));
}

const MapPage = ({ params }) => {
  const { slug } = params;
  const map = mapsData.find((m) => m.name === slug);

  if (!map) {
    return <div className="text-center text-red-500">Map not found</div>;
  }

  return (
    <div className="flex flex-col items-center p-6">
      <h1 className="text-4xl font-bold mb-4 text-white">{map.displayName}</h1>
      <img src={map.image} alt={map.displayName} className="max-w-xl rounded-lg shadow-lg mb-4" />
      <p className="text-2xl max-w-2xl text-center text-white">{map.description}</p>
    </div>
  );
};

export default MapPage;

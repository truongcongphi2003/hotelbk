import { Chip } from '@material-tailwind/react';

export function LocationTag({ locations = [], setSelectedLocation, selectedLocation }) {
  const handleChipClick = (location) => {
    setSelectedLocation(location);
  };
  return (
    <div className="flex gap-2 mb-3">
      {locations.map((loc, index) => (
        <Chip
          key={index}
          variant={selectedLocation.code === loc.code ? 'filled' : 'ghost'}
          color="indigo"
          value={loc.name}
          className="rounded-full cursor-pointer"
          onClick={() => handleChipClick(loc)}
        />
      ))}
    </div>
  );
}

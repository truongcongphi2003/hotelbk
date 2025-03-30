import { useState, useEffect, useRef } from 'react';
import { Input, List, ListItem, Card, Typography, Spinner, Chip } from '@material-tailwind/react';
import { MapPinIcon } from '@heroicons/react/24/outline';
import useDebounce from '@/hooks/useDebounce';
import useOnFetch from '@/hooks/useOnFetch';
import { request } from '@/request';
import { motion } from 'framer-motion';

export default function SearchLocation({ setLocation }) {
  const entity = 'address';
  const [locations, setLocations] = useState([]);
  const [valToSearch, setValToSearch] = useState('');
  const [searching, setSearching] = useState(false);
  const [debouncedValue, setDebouncedValue] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [lastSearchResults, setLastSearchResults] = useState([]);
  const lastSelection = useRef(false);
  const [locationCurrent, setLocationCurrent] = useState(null);
  const dropdownRef = useRef(null);
  const asyncSearch = async (options) => {
    return await request.search({ entity, options });
  };

  const [, cancel] = useDebounce(() => setDebouncedValue(valToSearch), 500, [valToSearch]);
  const { onFetch, result, isSuccess, isLoading } = useOnFetch();

  useEffect(() => {
    if (!debouncedValue || lastSelection.current) {
      lastSelection.current = false;
      return;
    }
    onFetch(asyncSearch({ keyword: debouncedValue }));
    return () => cancel();
  }, [debouncedValue]);

  useEffect(() => {
    if (isSuccess && result.length > 0) {
      setLocations(result);
      setIsOpen(true);
    } else {
      setSearching(false);
    }
  }, [isSuccess, result]);

  const onSearch = (searchText) => {
    setValToSearch(searchText);
    setSearching(true);
    setIsOpen(true);
  };

  const onSelectLocation = (location) => {
    setLocationCurrent(location);
    lastSelection.current = true;
    const storedLocations = JSON.parse(localStorage.getItem('recentLocations')) || [];

    const updatedLocations = [
      location,
      ...storedLocations.filter((loc) => loc.code !== location.code),
    ];

    if (updatedLocations.length > 5) {
      updatedLocations.pop();
    }

    localStorage.setItem('recentLocations', JSON.stringify(updatedLocations));

    setLastSearchResults(updatedLocations);
  };

  useEffect(() => {
    const storedLocations = JSON.parse(localStorage.getItem('recentLocations')) || [];
    setLastSearchResults(storedLocations);
    if (storedLocations.length > 0) {
      lastSelection.current = true;
      setValToSearch(storedLocations[0].name);
      setLocationCurrent(storedLocations[0]);
    } else {
      setValToSearch('');
    }
  }, []);

  useEffect(() => {
    if (locationCurrent) {
      lastSelection.current = true;
      setValToSearch(locationCurrent.name);
      setLocation(locationCurrent);
      setIsOpen(false);
    }
  }, [locationCurrent]);

  const handleFocus = () => {
    setIsOpen(true);
    setSearching(false);
    lastSelection.current = true;
  };

  const popularDestinations = [
    {
      type: 'Provincial city',
      code: '01',
      name: 'Hà Nội',
      province: 'Hà Nội',
      district: null,
      ward: null,
      hotelCount: 1230,
    },
    {
      type: 'District',
      code: '672',
      name: 'Đà Lạt',
      province: 'Lâm Đồng',
      district: 'Đà Lạt',
      ward: null,
      hotelCount: 670,
    },
    {
      type: 'Province',
      code: '40',
      name: 'Nghệ An',
      province: 'Nghệ an',
      district: null,
      ward: null,
      latitude: null,
      longitude: null,
      hotelCount: 1,
    },
  ];

  const locationTypeMap = {
    Municipality: 'Thành phố trực thuộc TW',
    Province: 'Tỉnh',
    Municipal: 'Thành phố thuộc tỉnh',
    'Provincial city': 'Thành phố thuộc tỉnh',
    'Urban district': 'Quận',
    'District-level town': 'Thị xã',
    District: 'Huyện',
    Ward: 'Phường',
    'Commune-level town': 'Thị trấn',
    Commune: 'Xã',
  };
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
        // if (!valToSearch.trim() && locationCurrent) {
        //   setValToSearch(locationCurrent.name);
        // }
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  const ItemSelect = ({ location, index }) => {
    return (
      <ListItem
        key={location.code || index}
        onClick={() => onSelectLocation(location)}
        className="hover:bg-gray-100 cursor-pointer flex justify-between items-center py-1"
      >
        <div>
          <strong>{location.name}</strong>
          <p className="text-gray-500 text-sm">
            {location.ward || ''} {location.district || ''} {location.province || ''}
          </p>
        </div>
        {location.type && (
          <div className="flex items-center flex-col gap-1">
            <Chip
              variant="outlined"
              value={locationTypeMap[location.type] || location.type}
              size="sm"
              className="rounded-full h-6"
            />{' '}
            {location.hotelCount && (
              <span className="text-gray-500 text-xs">{location.hotelCount} khách sạn</span>
            )}
          </div>
        )}
      </ListItem>
    );
  };

  return (
    <div className="relative w-full">
      <Input
        placeholder="Nhập địa điểm hoặc tên khách sạn"
        className="border-t-blue-gray-200 focus:border-t-gray-900 text-gray-800 font-semibold"
        labelProps={{
          className: 'before:content-none after:content-none',
        }}
        value={valToSearch}
        onChange={(e) => onSearch(e.target.value)}
        onFocus={handleFocus}
      />

      {isOpen && (
        <motion.div
          ref={dropdownRef}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          className="absolute left-0 w-full bg-white shadow-lg rounded-md mt-1 z-10 max-h-96 overflow-y-auto"
        >
          <Card className="w-full">
            <List className="w-full p-2">
              {isLoading ? (
                <>
                  <Spinner className="mx-auto" />
                  <Typography variant="small" color="gray" className="text-center mb-52">
                    Đang tìm kiếm...
                  </Typography>
                </>
              ) : (
                <>
                  <ListItem
                    key={0}
                    onClick={() => onSelectLocation({ name: 'Gần tôi' })}
                    className="hover:bg-gray-100 cursor-pointer"
                  >
                    <div className="flex items-center gap-2">
                      <MapPinIcon className="h-5 w-5 text-blue-600" />
                      <span className="text-blue-600 font-medium">Gần tôi</span>
                    </div>
                  </ListItem>

                  {lastSearchResults.length > 0 && !searching && (
                    <>
                      <Typography
                        variant="small"
                        color="gray"
                        className="px-3 py-2 text-sm font-semibold"
                      >
                        Kết quả tìm kiếm gần đây
                      </Typography>
                      {lastSearchResults.map((loc, index) => (
                        <ItemSelect key={loc.code || index} location={loc} />
                      ))}
                    </>
                  )}

                  {!searching && (
                    <>
                      <Typography
                        variant="small"
                        color="gray"
                        className="px-3 py-2 text-sm font-semibold"
                      >
                        Điểm đến nổi bật
                      </Typography>
                      {popularDestinations.map((loc, index) => (
                        <ItemSelect key={loc.code || index} location={loc} />
                      ))}
                    </>
                  )}

                  {searching && locations.length > 0 && (
                    <>
                      <Typography
                        variant="small"
                        color="gray"
                        className="px-3 py-2 text-sm font-semibold"
                      >
                        Kết quả tìm kiếm
                      </Typography>

                      {locations.map((loc) => (
                        <ItemSelect key={loc.code || index} location={loc} />
                      ))}
                    </>
                  )}
                </>
              )}
            </List>
          </Card>
        </motion.div>
      )}
    </div>
  );
}

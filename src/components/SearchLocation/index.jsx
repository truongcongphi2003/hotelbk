import { useState, useEffect } from 'react';
import AsyncSelect from 'react-select/async';
import { request } from '@/request';
import { Typography, Chip } from '@material-tailwind/react';
import { da, de } from 'date-fns/locale';

export default function SearchLocation({ setLocation, config = null }) {
  const [lastSearchResults, setLastSearchResults] = useState([]);
  const [defaultLocation, setDefaultLocation] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState(null);

  const entity = 'address';

  const onSelectLocation = (location) => {
    setSelectedLocation(location);

    const updatedLocations = [
      location,
      ...lastSearchResults.filter((loc) => loc.code !== location.code),
    ];

    if (updatedLocations.length > 5) {
      updatedLocations.pop();
    }

    localStorage.setItem('recentLocations', JSON.stringify(updatedLocations));
    setLastSearchResults(updatedLocations);
  };

  const loadOptions = async (inputValue) => {
    const res = await request.search({ entity, options: { keyword: inputValue } });

    return res.result.map((loc) => ({
      value: loc.code,
      label: loc.name,
      ward: loc.ward || '',
      district: loc.district || '',
      province: loc.province || '',
      hotelCount: loc.hotelCount || '',
      type: loc.type || '',
      fullNameEn: loc.fullNameEn || '',
      data: loc,
    }));
  };

  useEffect(() => {
    const storedLocations = JSON.parse(localStorage.getItem('recentLocations')) || [];
    setLastSearchResults(storedLocations);
    if (config) {
      const locDefault = {
        value: config.id,
        label: config.name,
        data: config,
      };
      setDefaultLocation(locDefault);
      setSelectedLocation({
        type: 'Hotel',
        code: config.id,
      });
      return;
    }

    if (storedLocations.length > 0) {
      setDefaultLocation({
        value: storedLocations[0].code,
        label: storedLocations[0].name,
        ward: storedLocations[0].ward,
        district: storedLocations[0].district,
        province: storedLocations[0].province,
        hotelCount: storedLocations[0].hotelCount,
        type: storedLocations[0].type,
        fullNameEn: storedLocations[0].fullNameEn,
        data: storedLocations[0],
      });
      setSelectedLocation(storedLocations[0]);
    } else {
      const locDefault = {
        value: 0,
        label: '...',
        data: null,
      };
      setDefaultLocation(locDefault);
      setSelectedLocation(locDefault.data);
    }
  }, []);
  useEffect(() => {
    setLocation(selectedLocation);
    console.log(selectedLocation);
  }, [selectedLocation]);

  const defaultOptions = lastSearchResults.map((loc) => ({
    value: loc.code,
    label: loc.name,
    ward: loc.ward || '',
    district: loc.district || '',
    province: loc.province || '',
    hotelCount: loc.hotelCount || '',
    type: loc.type || '',
    fullNameEn: loc.fullNameEn || '',
    data: loc,
  }));

  const customOption = (props) => {
    const { data, innerRef, innerProps } = props;
    return (
      <>
        <div
          ref={innerRef}
          {...innerProps}
          className="flex justify-between items-center py-2 px-3 cursor-pointer hover:bg-gray-100"
        >
          <div>
            <Typography variant="paragraph" className="text-gray-800 font-semibold">
              {data.label}
            </Typography>
            <Typography variant="small" className="text-gray-800 font-medium">
              {[data.ward, data.district, data.province].filter(Boolean).join(', ')}
            </Typography>
          </div>

          {data.type && (
            <div className="flex items-center flex-col gap-1">
              {data.type && data.type !== 'External' && (
                <Chip
                  variant="outlined"
                  value={locationTypeMap[data.fullNameEn] || data.fullNameEn}
                  size="sm"
                  color="blue"
                  className="rounded-full h-6 "
                />
              )}
              {data.hotelCount && (
                <span className="text-xs text-gray-700">{data.hotelCount} khách sạn</span>
              )}
            </div>
          )}
        </div>
        <hr />
      </>
    );
  };

  const locationTypeMap = {
    Municipality: 'Vùng',
    Province: 'Vùng',
    Municipal: 'Thành phố',
    'Provincial city': 'Thành phố',
    'Urban district': 'Quận',
    'District-level town': 'Thị xã',
    District: 'Huyện',
    Ward: 'Phường',
    'Commune-level town': 'Thị trấn',
    Commune: 'Xã',
    Hotel: 'Khách sạn',
  };

  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      borderColor: state.isFocused ? 'black' : provided.borderColor,
      boxShadow: state.isFocused ? 'none' : provided.boxShadow,
      '&:hover': {
        borderColor: state.isFocused ? 'black' : provided['&:hover'].borderColor,
      },
    }),
  };
  return (
    <>
      {defaultLocation && (
        <AsyncSelect
          className="w-full text-gray-800 text-sm font-semibold z-[999]"
          placeholder="Nhập địa điểm hoặc tên khách sạn"
          loadOptions={loadOptions}
          defaultOptions={defaultOptions}
          defaultValue={defaultLocation}
          onChange={(selected) => onSelectLocation(selected.data)}
          components={{ Option: customOption }}
          styles={customStyles}
        />
      )}
    </>
  );
}

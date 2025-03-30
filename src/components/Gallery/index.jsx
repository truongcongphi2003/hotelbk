import { Gallery as GalleryHotel, Item } from 'react-photoswipe-gallery';
import 'photoswipe/style.css';
import { erp } from '@/redux/erp/actions';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { selectGetItem } from '@/redux/erp/selectors';
import { ImagePlacehoderSkeleton } from './ImagePlacehoderSkeleton';

function Gallery({ config }) {
  const dispatch = useDispatch();
  const id = config.id;
  const entity = 'hotel/images/';
  const { result, isLoading } = useSelector(selectGetItem);
  useEffect(() => {
    dispatch(erp.get({ entity, id }));
  }, [id]);

  const maxVisibleImages = 7;

  return (
    <GalleryHotel>
      {!isLoading ? (
        <div className="grid grid-rows-2 grid-flow-col gap-3 h-96 w-full rounded-lg overflow-hidden">
          {result?.slice(0, maxVisibleImages).map((item, index) => (
            <div
              key={index}
              className={`relative h-full ${index === 0 ? 'row-span-2 col-span-2' : ''}`}
            >
              <Item original={item.imageUrl} thumbnail={item.imageUrl} width="1024" height="768">
                {({ ref, open }) => (
                  <>
                    <img
                      className="h-full w-full object-cover object-center cursor-pointer"
                      ref={ref}
                      onClick={open}
                      src={item.imageUrl}
                      alt={`Gallery item ${index + 1}`}
                    />
                    {index === maxVisibleImages - 1 && data.length > maxVisibleImages && (
                      <div
                        onClick={open}
                        className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center text-white font-bold text-lg cursor-pointer"
                      >
                        Xem thêm
                      </div>
                    )}
                  </>
                )}
              </Item>
            </div>
          ))}
        </div>
      ) : (
        <ImagePlacehoderSkeleton />
      )}
    </GalleryHotel>
  );
}

export default Gallery;

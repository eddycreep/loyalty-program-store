import { isEmpty } from 'lodash';
import { useRef, useState } from "react";

//hooks
import { useQuery } from "@/hooks/useQuery";

//images
import bchev from '../../../assets/icons/chevup.svg';

// Types
interface Store {
  uid: string;
  company_name: string;
  isChecked?: boolean;
}

interface StoresProps {
  handleAssignedStores: (store: Store) => void;
}

interface State {
  store: string;
  storeUID: string[];
}

export const Stores: React.FC<StoresProps> = ({ handleAssignedStores }) => {
  const [state, setState] = useState<State>({
    store: '',
    storeUID: []
  });

  const [activeContainer, setActiveContainer] = useState<number | null>(null);
  const containerRef = useRef<Array<HTMLDivElement | null>>([]);

  const { data, loading } = useQuery<Store[]>(`${process.env.REACT_APP_ENDPOINT}/api/v1/client/active`);

  if (loading) {
    return (
        <div className="p-[1.35rem] bg-black-skeleton animate-pulse animate-ping w-full rounded"></div>
    );
}

  const toggleContainer = (index: number) => {
    setActiveContainer(activeContainer === index ? null : index);
  };

  const toggleDropDown = (index: number) => toggleContainer(index);

  const handleInput = (store: Store) => {
    setState({ ...state, store: store.company_name });
    handleAssignedStores(store);
  };

  return (
    <div className="flex flex-col justify-start gap-4 z-10 relative w-full">
      <span
        className="bg-white p-3 border shadow rounded text-sm font-medium text-gray-500 w-full text-center cursor-pointer flex items-center justify-between"
        onClick={() => toggleDropDown(0)}
      >
        <span className="flex items-center justify-start gap-2">
          <span className="text-left">Select Stores</span>
        </span>
        <img
          src={bchev}
          alt="Up"
          loading="lazy"
          className={`w-5 ${activeContainer === 0 ? 'rotate-180' : ''} lg:ease-in-out duration-300`}
        />
      </span>
      <div
        className={`absolute bg-white shadow rounded top-14 w-full h-[200px] overflow-y-scroll ${
          activeContainer === 0 ? '' : 'hidden'
        } fade-in__left flex flex-col justify-start`}
        ref={(ref) => {
          containerRef.current[0] = ref;
        }}
      >
        {isEmpty(data) ? (
          <p className="w-full hover:bg-grey p-2 lg:p-4 cursor-pointer last:rounded-b first:rounded-t flex items-center justify-start leading-none text-sm font-medium text-gray-500 gap-2">
            No stores available
          </p>
        ) : (
          data?.map((store) => (
            <div
              className="flex items-center justify-between px-2 py-3 hover:bg-grey lg:ease-in-out duration-300 cursor-pointer"
              key={store.uid}
            >
              <label
                htmlFor="sms-check"
                className="text-gray-500 font-medium text-[16px] flex items-center justify-start gap-2 w-full"
              >
                <p className="text-sm w-full text-gray-500 font-medium">{store.company_name}</p>
                <input
                  type="checkbox"
                  className="accent-green w-6 h-6 border border-green rounded"
                  onChange={() => handleInput(store)}
                  defaultChecked={store.isChecked}
                  id={store.uid}
                />
              </label>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

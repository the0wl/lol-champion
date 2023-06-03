import { useContext } from 'react';
import { AppContext } from '../common/AppProvider';

const TheLoadingModal = () => {
  const { globalState: {openModal, modalContent} } = useContext(AppContext);

  return (
    <div className={`flex justify-center items-center fixed top-0 left-0 backdrop-blur-sm w-[100vw] h-[100vh] z-[999999] transition-opacity duration-200 ${openModal ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
      <div className='rounded p-4 bg-primary text-white border border-secondary shadow-lg'>{modalContent}</div>
    </div>
  );
};

export default TheLoadingModal;

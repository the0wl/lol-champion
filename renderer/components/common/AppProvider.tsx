import { Dispatch, ReactNode, SetStateAction, createContext, useState } from 'react';
interface IProps {
  children: ReactNode;
}

interface IModal {
  openModal: boolean;
  modalContent: ReactNode;
}

interface IAppContext {
  globalState: IModal,
  setGlobalState: Dispatch<SetStateAction<IModal>> 
}

const defaults : {modal: IModal} = {
  modal: {
    openModal: false,
    modalContent: 'Aguarde...'
  }
};

export const AppContext = createContext<IAppContext>(null);

export const AppProvider = ({...props}: IProps) => {
  const [globalState, setGlobalState] = useState({...defaults.modal});  

  return (
    <AppContext.Provider value={{globalState, setGlobalState}}>
      {props.children}
    </AppContext.Provider>
  );
};

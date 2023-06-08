import { createContext, useContext, useState } from "react";

type MsgContextProviderProps = {
    children: React.ReactNode;
};

type MsgContext = {
    allMessages: message[] | undefined;
    setAllMessages: React.Dispatch<React.SetStateAction<message[] | undefined>>;
    selectedMessages: message[];
    setSelectedMessages: React.Dispatch<React.SetStateAction<message[]>>;
    showFullMessage: boolean;
    setShowFullMessage: React.Dispatch<React.SetStateAction<boolean>>;
    clickedMessage: message | undefined;
    setClickedMessage: React.Dispatch<
        React.SetStateAction<message | undefined>
    >;
};

const MessageContext = createContext<MsgContext>({} as MsgContext);

export const useMessages = () => useContext(MessageContext);

function MsgContextProvider({ children }: MsgContextProviderProps) {
    const [allMessages, setAllMessages] = useState<message[]>();
    const [selectedMessages, setSelectedMessages] = useState<message[]>([]);

    // full message modal
    const [showFullMessage, setShowFullMessage] = useState(false);
    const [clickedMessage, setClickedMessage] = useState<message>();

    const ctxValue = {
        allMessages,
        setAllMessages,
        selectedMessages,
        setSelectedMessages,
        showFullMessage,
        setShowFullMessage,
        clickedMessage,
        setClickedMessage,
    };
    return (
        <MessageContext.Provider value={ctxValue}>
            {children}
        </MessageContext.Provider>
    );
}
export default MsgContextProvider;

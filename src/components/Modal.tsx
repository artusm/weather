import FeatherIcon from 'feather-icons-react';

interface ModalProps {
    children: React.ReactNode;
    onClick: () => void;
}

export const Modal = ({ children, onClick }: ModalProps) => {
    return (
        <div className="absolute inset-0 z-50 flex flex-col items-center justify-center">
            <div className="w-full max-w-3xl p-8">
                <div className="bg-gray-200 p-8 text-gray-900">
                    <div className="flex justify-end">
                        <button onClick={() => onClick()} role="button">
                            <FeatherIcon icon="x" />
                        </button>
                    </div>
                    {children}
                </div>
            </div>
        </div>
    );
};
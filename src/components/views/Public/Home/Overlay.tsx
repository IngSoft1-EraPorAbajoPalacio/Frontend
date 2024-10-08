import '../../../../styles/Home/Overlay.css';

interface OverlayProps {
    children: React.ReactNode;
    isOpen: boolean;
    onClose: () => void;
}

function Overlay({ children, isOpen, onClose }: OverlayProps) {
    return (
        <div>
            {isOpen ? (
                <div className='overlay'>
                    <div className='overlay-background' onClick={onClose}>
                        <div className='overlay-container' onClick={(e) => e.stopPropagation()}>
                            {children}
                        </div>
                    </div>
                </div>
                ): null}
        </div>
    );
}

export default Overlay;
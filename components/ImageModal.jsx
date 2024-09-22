import { useEffect } from 'react';
import { HandleGeneratePrediction } from './ImageModalFunctions';
import { prompt } from './PromptCard';

const ImageModal = ({ show, onClose, prompt }) =>
{
    useEffect(() =>
    {
        const handleEsc = (event) =>
        {
            if (event.keyCode === 27)
            {
                onClose();
            }
        };
        window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, [onClose]);

    if (!show)
    {
        console.log('Modal not shown');
        return null;
    }
    else
    {
        var imageSrc = HandleGeneratePrediction(prompt);
    }

    return (
        <div className='fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center' onClick={onClose}>
            <div className='w-[600px]' onClick={(e) => e.stopPropagation()}>
                <div className='prompt_card'>
                    <Image
                        src={imageSrc}
                        alt='image'
                        layout='responsive'
                        width={768}
                        height={768}
                    />
                </div>
            </div>
        </div>
    );
};

export default ImageModal;

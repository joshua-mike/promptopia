import { useState, useEffect } from 'react';
import { HandleGeneratePrediction } from './ImageModalFunctions';
import Image from 'next/image';
import { set } from 'mongoose';

const ImageModal = ({ show, onClose, prompt }) =>
{
    console.log('ImageModal component rendered');
    const [prediction, setPrediction] = useState();

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
        console.log('Generating replicate prediction for prompt:', prompt);
        setPrediction(HandleGeneratePrediction(prompt).prediction);
    }

    return (
        <div className='fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center z-50' onClick={onClose}>
            <div className='w-[600px]' >
                <div className='prompt_card'>
                    <Image
                        src={prediction.output[prediction.output.length - 1]}
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

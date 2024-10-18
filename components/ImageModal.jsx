import React, { useState, useEffect } from 'react';
import { HandleGeneratePrediction } from './ImageModalFunctions';
import Image from 'next/image';

const ImageModal = React.memo(({ show, onClose, prompt }) =>
{
    const [prediction, setPrediction] = useState(null);

    useEffect(() =>
    {
        const handleEsc = (event) =>
        {
            if (event.key === 'Escape')
            {
                onClose();
            }
        };
        window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, [onClose]);

    useEffect(() =>
    {
        if (show && prompt)
        {
            console.log('Generating replicate prediction for prompt:', prompt);
            HandleGeneratePrediction(prompt).then(result =>
            {
                setPrediction(result);
            }).catch(error =>
            {
                console.error('Error generating prediction:', error);
            });
        }
    }, [show, prompt]);

    if (!show)
    {
        return null;
    }

    return (
        <div className='fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center z-50' onClick={onClose}>
            <div className='w-[1024px]' onClick={e => e.stopPropagation()}>
                <div className='prompt_card'>
                    {prediction && prediction.status === "succeeded" ? (
                        <Image
                            src={prediction.output[0]}
                            alt='generated image'
                            layout='responsive'
                            width={1024}
                            height={968}
                        />
                    ) : prediction && prediction.status === "failed" ? (
                        <p>{prediction.detail}</p>
                    ) : (
                        <p>Generating image...</p>
                    )}
                </div>
            </div>
        </div>
    );
});

ImageModal.displayName = 'ImageModal';

export default ImageModal;

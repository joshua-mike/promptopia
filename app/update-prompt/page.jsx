'use client';
import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Form from '@components/form';

const EditPrompt = () =>
{
    const router = useRouter();
    const searchParams = useSearchParams();
    const promptId = searchParams.get('id');
    const [submitting, setSubmitting] = useState(false);
    const [post, setPost] = useState({
        prompt: "",
        tag: "",
    });

    useEffect(() =>
    {
        const getPromptDetails = async () =>
        {
            const response = await fetch(`/api/prompt/${promptId}`);
            const data = await response.json();
            setPost({
                prompt: data.prompt,
                tag: data.tag,
            });
        }
        if (promptId) getPromptDetails();

    }, [promptId]);

    const updatePrompt = async (e) =>
    {
        e.preventDefault();
        setSubmitting(true);
        if (!promptId) return alert("Prompt ID not found.");

        try
        {
            const response = await fetch(`/api/prompt/${promptId}`, {
                method: "PATCH",
                body: JSON.stringify({
                    prompt: post.prompt,
                    tag: post.tag
                })
            });

            if (response.ok)
            {
                router.push('/');
            }

            // setPost({
            //     prompt: '',
            //     tag: '',
            // });
            // setSubmitting(false);
        }
        catch (error)
        {
            console.log(error);
        }
        finally
        {
            setSubmitting(false);
            console.log("Prompt edit executed.");
        }
    }
    return (
        <Form
            type='Edit'
            post={post}
            setPost={setPost}
            submitting={submitting}
            setSubmitting={setSubmitting}
            handleSubmit={updatePrompt}
        />
    );
};

export default EditPrompt;
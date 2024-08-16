'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Form from '@components/form';

const EditPrompt = () =>
{
    const router = useRouter();
    const [submitting, setSubmitting] = useState(false);
    const [post, setPost] = useState({
        prompt: "",
        tag: "",
    });
    const searchParams = useSearchParams();
    const promptId = searchParams.get('id');

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

    const editedPrompt = async (e) =>
    {
        //e.PreventDefault();
        setSubmitting(true);

        try
        {
            console.log("Executing createPrompt...");
            const response = await fetch("/api/prompt/new", {
                method: "POST",
                body: JSON.stringify({
                    prompt: post.prompt,
                    userId: session?.user.id,
                    tag: post.tag
                }),
            });

            if (response.ok)
            {
                router.push('/');
            }
            console.log(response.stringify());

            setPost({
                prompt: '',
                tag: '',
            });
            setSubmitting(false);
        }
        catch (error)
        {
            console.log(error);
        }
        finally
        {
            setSubmitting(false);
            console.log("createPrompt executed.");
        }
    }
    return (
        <Form
            type='Edit'
            post={post}
            setPost={setPost}
            submitting={submitting}
            setSubmitting={setSubmitting}
            handleSubmit={editedPrompt}
        />
    );
};

export default EditPrompt;
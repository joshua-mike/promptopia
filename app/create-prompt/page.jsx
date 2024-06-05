'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Form from '@components/form';

const CreatePrompt = () =>
{
    const router = useRouter();
    const { data: session } = useSession();
    const [submitting, setSubmitting] = useState(false);
    const [post, setPost] = useState({
        prompt: "",
        tag: "",
    });
    const createPrompt = async (e) =>
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
            type='Create'
            post={post}
            setPost={setPost}
            submitting={submitting}
            setSubmitting={setSubmitting}
            handleSubmit={createPrompt}
        />
    );
};

export default CreatePrompt;
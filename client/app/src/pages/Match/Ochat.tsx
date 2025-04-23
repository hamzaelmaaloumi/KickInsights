import { useEffect, useRef, useState } from 'react';
import { generateContent } from '../../HttpService/geminiService';
import { useForm } from 'react-hook-form';
import { IoMdSend } from "react-icons/io";
import ReactMarkdown from 'react-markdown';
import chat from '../../assets/chat.png'
// Add these imports for enhanced markdown support
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import 'katex/dist/katex.min.css';
import { FaComments } from "react-icons/fa"; // Add this import for chat icon
import { IoClose } from "react-icons/io5"; // Add this import for close icon

interface myForm {
    prompt: string
}

interface myresponse {
    responses : string[]
}

interface myp{
    data: object,
    generalContext: string,
    extraContext?: string
}

const Ochat = (props: myp) => {
    const [loading, setLoading] = useState(false)
    const [AIResponse, setAIResponse] = useState('')
    const [AIError, setAIError] = useState('')
    const [response, setResponse] = useState<myresponse>({
        responses: []
    })
    const chatContainerRef = useRef<HTMLDivElement>(null)
    const [chatTab, setChatTab] = useState(false)

    const { register, handleSubmit, formState: { errors }, reset, setFocus } = useForm<myForm>()

//_______________________________________________________________________________________________________________________________
//-----------------------------------------------------FOR MARKDOWN---------------------------------------------------------------
    const components = {
        // Add syntax highlighting for code blocks
        code({ node, inline, className, children, ...props }: any) {
            const match = /language-(\w+)/.exec(className || '');
            return !inline && match ? (
                <SyntaxHighlighter
                    style={vscDarkPlus}
                    language={match[1]}
                    PreTag="div"
                    {...props}
                >
                    {String(children).replace(/\n$/, '')}
                </SyntaxHighlighter>
            ) : (
                <code className={className} {...props}>
                    {children}
                </code>
            );
        },
        // Style for blockquotes
        blockquote: (props: any) => (
            <blockquote className="border-l-4 border-blue-500 pl-4 my-4 italic bg-gray-800 bg-opacity-50 p-2 rounded" {...props} />
        ),
        // Style for links
        a: (props: any) => (
            <a className="text-blue-400 hover:text-blue-300 underline" {...props} target="_blank" rel="noopener noreferrer" />
        ),
        // Style for lists
        ul: (props: any) => (
            <ul className="list-disc list-inside my-4 space-y-2" {...props} />
        ),
        ol: (props: any) => (
            <ol className="list-decimal list-inside my-4 space-y-2" {...props} />
        ),
    };
//_______________________________________________________________________________________________________________________________
//-----------------------------------------------------FOR MARKDOWN---------------------------------------------------------------



    const onSubmit = async (data: myForm) => {
        try {
            setLoading(true)
            setAIError('')
            const contextData = JSON.stringify(props.data);

            const input = {
                prompt: `${data.prompt.trim()}
                        \nContext: Here is some relevant information that might help with your response. Please refer to the details such as matches, players, etc., without explicitly mentioning the word 'data': ${contextData}
                        \nPlease provide a concise, accurate, and helpful response based on the provided data. ${props.extraContext ? `${props.extraContext}`: ''}`,
            };
            
            if (!input.prompt) {
                throw new Error('Please enter a prompt');
            }

            const AIResponse = await generateContent(input)
            setAIResponse(AIResponse)
            setResponse({responses: [...response.responses, AIResponse]}) 
        } catch (error: any) {
            console.log(error.message)
            setAIError("there has been a problem, please try again later.")
        } finally {
            setLoading(false)
            reset()
        }
    }

    useEffect(() => {
        if (errors.prompt?.type === "required") {
            setFocus("prompt")
        }
    }, [errors.prompt])


    useEffect(()=> {
        if(chatContainerRef.current){
            chatContainerRef.current.scrollTo({
                top: chatContainerRef.current.scrollHeight,
                behavior: 'smooth'
            });
        }
    }, [response.responses])
    
    return (
        <div className="absolute">
            <div 
                className={`fixed flex items-center justify-center top-80 transition-all duration-300 ease-in-out z-10 ${chatTab ? 'left-[400px]': 'left-11'}`}
            >
                <button 
                    className={`rounded-full p-3 shadow-lg flex items-center justify-center bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white transition-all duration-300 transform hover:scale-110 group relative`} 
                    onClick={()=>{setChatTab(!chatTab)}}
                >
                    {chatTab ? 
                        <IoClose className="w-6 h-6 animate-pulse" /> : 
                        <FaComments className="w-6 h-6 animate-pulse" />
                    }
                    <span className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 font-manrope rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                        {chatTab ? 'Close Chat' : 'Open Chat'}
                    </span>
                </button>
            </div>
            {<div ref={chatContainerRef} className={`fixed ${chatTab ? 'opacity-100 left-0' : 'opacity-0 -left-96'} duration-300 ease-in-out bg-[#111111] overflow-y-scroll pb-36 left-0 inset-y-0 h-full w-96 text-white px-4 pt-24 rounded-lg font-semibold font-manrope`}>
        
                <form className='fixed bottom-4 w-80' onSubmit={handleSubmit(onSubmit)}>
                    <div className="flex items-center">
                        <input
                            {...register('prompt', { required: true })}
                            placeholder={`Ask Gemini about ${props.generalContext}`}
                            className={`focus:none w-full rounded-lg border-[3px] mr-2 border-blue-600 bg-[#141024] font-normal text-white`}
                        />
                        <div className='bg-[#111111] w-fit h-fit rounded-md'>
                        <button 
                            className='px-4 py-3 rounded-md hover:bg-opacity-30 bg-blue-600 bg-opacity-15 border-[2px] border-blue-600' 
                            type='submit' 
                            disabled={loading}
                        >
                            {loading ? (
                                <svg className={`flex w-4 h-4 text-gray-300 animate-spin`} viewBox="0 0 64 64" fill="none"
                                    xmlns="http://www.w3.org/2000/svg" width="24" height="24">
                                    <path
                                        d="M32 3C35.8083 3 39.5794 3.75011 43.0978 5.20749C46.6163 6.66488 49.8132 8.80101 52.5061 11.4939C55.199 14.1868 57.3351 17.3837 58.7925 20.9022C60.2499 24.4206 61 28.1917 61 32C61 35.8083 60.2499 39.5794 58.7925 43.0978C57.3351 46.6163 55.199 49.8132 52.5061 52.5061C49.8132 55.199 46.6163 57.3351 43.0978 58.7925C39.5794 60.2499 35.8083 61 32 61C28.1917 61 24.4206 60.2499 20.9022 58.7925C17.3837 57.3351 14.1868 55.199 11.4939 52.5061C8.801 49.8132 6.66487 46.6163 5.20749 43.0978C3.7501 39.5794 3 35.8083 3 32C3 28.1917 3.75011 24.4206 5.2075 20.9022C6.66489 17.3837 8.80101 14.1868 11.4939 11.4939C14.1868 8.80099 17.3838 6.66487 20.9022 5.20749C24.4206 3.7501 28.1917 3 32 3L32 3Z"
                                        stroke="currentColor" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round">
                                    </path>
                                    <path
                                        d="M32 3C36.5778 3 41.0906 4.08374 45.1692 6.16256C49.2477 8.24138 52.7762 11.2562 55.466 14.9605C58.1558 18.6647 59.9304 22.9531 60.6448 27.4748C61.3591 31.9965 60.9928 36.6232 59.5759 40.9762"
                                        stroke="currentColor" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" className="text-gray-900">
                                    </path>
                                </svg>
                            ) : <IoMdSend />}
                        </button>
                        </div>
                    </div>
                </form>



                {AIError && (
                    <p className='font-normal text-red-600 w-fit bg-red-600 bg-opacity-15 border-[2px] border-red-600 p-2 my-2 rounded-md'>
                        {AIError}
                    </p>
                )}

                {response.responses.length !== 0 || AIError ?  response.responses.map((r)=> {
                    return (
                        <div className='font-normal mb-2 text-gray-100 w-fit bg-teal-600 bg-opacity-15 border-[2px] border-teal-600 p-4 my-2 rounded-md'>
                        <ReactMarkdown
                            components={components}
                            remarkPlugins={[remarkGfm, remarkMath]}
                            rehypePlugins={[rehypeKatex]}
                        >
                            {r}
                        </ReactMarkdown>
                    </div>
                    )
                }) 
                : 
                <div className="relative top-48 flex flex-col items-center">
                    <h1 className="text-white font-manrope text-4xl font-bold">
                        <div className="flex justify-between gap-3"><div className="">Meet </div><div className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-indigo-600">Kick-Bot,</div> </div> 
                        <div className=""> for {props.generalContext}</div> 
                        <span 
                            className="absolute bottom-[-33px] right-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-indigo-400 text-[20px] block mt-2 font-Allura"
                        >
                            Powered by Gemini
                        </span>
                    </h1>
                </div>}
            </div>}
        </div>
    );
};

export default Ochat;
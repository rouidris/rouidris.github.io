import React from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { PopularPosts } from '../components/PopularPosts'
import { PostItem } from '../components/PostItem'
import { getAllPosts} from '../redux/features/post/postSlice'
import MainPost from '../components/MainPost'
import Disqus from "../components/Disqus";
export const MainPage = () => {
    const dispatch = useDispatch()
    const { posts, popularPosts } = useSelector((state) => state.post)
    const {user} = useSelector((state) => state.auth)

    useEffect(() => {
        dispatch(getAllPosts())
    }, [dispatch])

    if (!posts.length) {
        return (
            <MainPost/>
        )
    }

    return (
        <div>


                <MainPost/>
            <p className='flex justify-center mx-auto text-white font-bold text-4xl opacity-80 m-10 w-auto text-center'>
                Примеры работ с реальными клиентами:
            </p>

                <div className='grid grid-cols-2 mx-auto gap-10 p-1 max-w-[1300px] rounded-2xl'  style={{backgroundColor: "black "}}>

                    {posts?.map((post, idx) => (
                        <PostItem key={idx} post={post} />
                    ))}
                </div>
                <div className='bg-cyan-800 p-5 w-2/3 mx-auto mt-16 rounded-2xl'>
                    <Disqus/>
                </div>
                {/*<div className='basis-1/5'>*/}
                {/*    <div className='text-xs uppercase text-white'>*/}
                {/*        Популярное:*/}
                {/*    </div>*/}

                {/*    {popularPosts?.map((post, idx) => (*/}
                {/*        <PopularPosts key={idx} post={post} />*/}
                {/*    ))}*/}
                {/*</div>*/}

        </div>
    )
}

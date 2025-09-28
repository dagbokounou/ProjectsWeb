import { slugyfy } from "../helpers/stringHelpers";
import { video } from "../models/video";
import { db } from "./database";

export const addVideo = async (video: video) => {

    try {
        video.slug = slugyfy(video.title)
        await db.addData('videos', video)
        return {
            isSuccess: true,
            message: 'video add successfuly!'

        }
    } catch (error) {
        console.log({ error })
        return {
            isSuccess: false,
            error
        }
    }

}




export const updateVideo = async (video: video) => {

    try {
        await db.updateData('videos', video)
        return {
            isSuccess: true,
            message: 'video updated successfuly!'

        }
    } catch (error) {
        console.log({ error })
        return {
            isSuccess: false,
            error
        }
    }

}


export const getVideo = async (_id: number) => {

    try {
        const video = await db.getData('videos', _id)
        return {
            isSuccess: true,
            result: video,


        }
    } catch (error) {
        console.log({ error })
        return {
            isSuccess: false,
            error
        }
    }

}


export const getAllVideo = async () => {

    try {
        const videos = await db.getAllData('videos')
        return {
            isSuccess: true,
            results: videos,


        }
    } catch (error) {
        console.log({ error })
        return {
            isSuccess: false,
            error
        }
    }

}
export const getVideoByPage = async (page = 1, pageSize = 10) => {

    try {
        return await db.getDataWithPagination('videos', page, pageSize)

    } catch (error) {
        console.log({ error })
        return {
            isSuccess: false,
            error
        }
    }

}

export const findVideo = async (keyword: string, field = 'title', page = 1, pageSize = 10) => {

    try {
        return await db.searchByTag('videos', field, keyword, page, pageSize)

    } catch (error) {
        console.log({ error })
        return {
            isSuccess: false,
            error
        }
    }

}


export const deleteVideo = async (_id: number) => {

    try {
        await db.deleteData('videos', _id)
        return {
            isSuccess: true,

            message: 'video deleted successfuly!'

        }
    } catch (error) {
        console.log({ error })
        return {
            isSuccess: false,
            error
        }
    }

}
export const searchVideoBySlug = async (slug: string) => {

    try {
        const videos = await db.search('videos', 'slug', slug)
        return {
            isSuccess: true,

            result: videos[0],

        }
    } catch (error) {
        console.log({ error })
        return {
            isSuccess: false,
            error
        }
    }

}

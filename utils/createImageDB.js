/*
***********************************************************
# Sjoshi Rigi_Backend
***********************************************************
*/
const {insertImages, getAllImages} = require('../data/Image')
const logger = require('../helpers/logger')('createImageDB')

exports.imageDB = async () =>{
    logger.debug(`>>>> imageDB`)
    try{
        let imagesCollection = await getAllImages();
        const data = [
            {
                name:"One",
                url: "One.jpg"
            },
            {
                name:"Two",
                url: "Two.jpg"
            },
            {
                name:"Three",
                url: "Three.jpg"
            },
            {
                name:"Four",
                url: "Four.jpg"
            },
            {
                name:"Five",
                url: "Five.jpg"
            },
            {
                name:"Six",
                url: "Six.jpg"
            },
            {
                name:"Seven",
                url: "Seven.jpg"
            },
        
        ]
        if(imagesCollection.length == 0) {
            let insertToImageDB  = await insertImages(data)
        }
    }
    catch(err){
        logger.warn(`imageDB - Error: ${err}`)
    }
    finally{
        logger.debug(`<<<< imageDB`)
    }

}

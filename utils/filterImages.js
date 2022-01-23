
/*
***********************************************************
# Sjoshi Rigi_Backend
***********************************************************
*/

const logger = require('../helpers/logger')('filterImages')

// When images are fetched, do not respond with Swiped images
exports.removeByAttr = async(arr, attr, value)=>{
    logger.debug(`>>>> removeByAttr`)
    try{
        let i;
        for await(let v of value){
            i = arr.length;
            while(i--){
               if(arr[i] && arr[i][attr].toString() == v.toString() ){ 
                   arr.splice(i,1);
               }
            }
        }
        return arr;
    }catch(err){
        logger.warn(`removeByAttr - Error: ${err}`)
    }
    finally{
        logger.debug(`<<<< removeByAttr`)
    }

  }
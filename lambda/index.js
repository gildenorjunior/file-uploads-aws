import { responseBuilder } from './response.mjs';
import { postExecute } from './post.mjs';

const routeUploadFile = '/file-upload-system';

export const handler = async (event) => {
    console.log('Received event:', JSON.stringify(event, null, 2));

    let response;
    let reqBody = event.body;

    switch(true) {
        case event.requestContext.http.method === 'POST' && event.rawPath === routeUploadFile:
            response = await postExecute(reqBody);
            break;
        default:
            response = responseBuilder(404, reqBody);
    }
    return response;
};
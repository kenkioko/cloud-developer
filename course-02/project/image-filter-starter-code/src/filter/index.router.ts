import { Router, Request, Response } from 'express';
import { filterImageFromURL, deleteLocalFiles } from './filterImage';

const router: Router = Router();

// Filter Image Endpoint
// Diplays a filtered image from a public url
router.get( "/filteredimage", async (req: Request, res: Response) => {
// image_url query string
let { image_url } = req.query;
if ( !image_url ) {
    return res.status(400)
            .send(`image_url is required`);
}

try {
    // filter the image
    const filteredpath = await filterImageFromURL(image_url as string);    
    
    // send the filtered image file
    res.status(200).sendFile(filteredpath);

    // clean up files
    await deleteLocalFiles(Array(filteredpath));
} catch (error) {
    return res.status(500)
            .send(error);
}

} );

export const IndexRouter: Router = router;
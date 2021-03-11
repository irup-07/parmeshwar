const express = require("express");
const videoController = require("./../controllers/videoController");

const router = new express.Router();
// router.param('id', productController.checkId);




router
  .route("/")
  .get(videoController.getAllVideo)
  .post( videoController.uploadProductPhoto, videoController.resizeProductImage, videoController.addNewVideo);

router
  .route("/:id")
  .get(videoController.getSingleVideo)
  .patch(videoController.updateVideo)
  .delete(
    
    videoController.deleteVideo
  );

module.exports = router;
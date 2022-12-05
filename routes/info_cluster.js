const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer");
const postsController = require("../controllers/posts");
//info controller
const infoClusterController = require("../controllers/info_cluster");
const { ensureAuth, ensureGuest } = require("../middleware/auth");


//all these are created under /info so we need the prefix in that form
router.get("/:id", ensureAuth, postsController.getPost);

router.post("/create_infocluster", upload.single("file"), infoClusterController.createInfoCluster);


router.post("/create_infocluster_item/:info_cluster_id", upload.single("file"), infoClusterController.createInfoClusterItem);


//TODO: Pick up here!
router.get('/view_info_cluster/:id', ensureAuth, infoClusterController.getInfoClusterView); // may only need this if/when i want to allow user to navigate to this view directly from a place other than when they create a info cluster

router.put("/likePost/:id", postsController.likePost);

router.delete("/deletePost/:id", postsController.deletePost); //:id lets us plug in the object id to target our post

module.exports = router;

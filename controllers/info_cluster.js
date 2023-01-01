const cloudinary = require("../middleware/cloudinary");
const Info_cluster = require("../models/Info_cluster");
const User = require("../models/User");
const objectId = require("mongodb").ObjectID //need this because info_cluster_items collection doesnt use a model







module.exports = {

    createInfoClusterItem: async (req, res) => {
        //This is where we will send the new addtions to the info cluster to the database  in the "info_cluster_item" collection

        //*Cloudinary stuff

        const result = await cloudinary.uploader.upload(req.file.path)

        const fileAssociation = req.body.fileAssociation
        if (fileAssociation) {
            const a = fileAssociation.split(':')
            req.body[a[0]] = [result.secure_url, result.public_id, 'img']
        }


        //put the addtions to the target API in the "info_cluster_items" collection here
        global.db.collection("info_cluster_items").insertOne({ ...req.body, cluster_id: req.params.info_cluster_id }) //req.params.info_cluster_id is how we isolate the 


        //res.redirect to view info cluster
        res.redirect(`/info/view_info_cluster/${req.params.info_cluster_id}`) //send them back to the view info cluster page to see the changes they made, 
    },

    getInfoClusterView: async (req, res) => {
        //*This is where we render the view of the single info cluster that was just created
        //*This form is the one that dynamically generates the ejs form based on the user entered Schema

        //can use findOne instead of find here bc find returns an array of objects, (in this case the arr of objects just had one thing anyways)
        const infoClusterDBObject = await Info_cluster.findOne({ _id: req.params.id })


        //*Here we are writing the code to ultimately render a view that shows all the items in a specific info_cluster

        let infoClusterItems = await db.collection("info_cluster_items").find({ cluster_id: req.params.id }).toArray()
        //loop through the items, then loop through the keys in each item

        //from each item you take the array which will be the value of that key,
        //take last element in each array this will tell us how to display the data

        //* then send them back to the view info cluster page were we will then render the previous form along with
        //* all the info_cluster_items that have the targeted cluster id.

        let currentUser = req.user


        res.render("view_info_cluster.ejs", { infoClusterObjectReturn: infoClusterDBObject, user: currentUser, clusterArr: infoClusterItems }); //just brings us to the page to create a cluster
    },
    getInfoClusterAPI: async (req, res) => {

        const infoClusterDBObject = await Info_cluster.findOne({ _id: req.params.id })

        let infoClusterItems = await db.collection("info_cluster_items").find({ cluster_id: req.params.id }).toArray()

        //*render the API in the browers
        res.send({ infoCluster: infoClusterDBObject, infoClusterItems: infoClusterItems })
    },
    getInfoClusterCreate: (req, res) => {
        res.render("create_infocluster.ejs"); //just brings us to the page to create a cluster
    },
    getAllInfoClustersView: async (req, res) => {
        let clusters = await Info_cluster.find()

        res.render("all_info_clusters.ejs", { allClusters: clusters }); //brings us to the page to see all created info clusters
    },
    createInfoCluster: async (req, res) => {
        //when on the page to create cluster that form on that page lands here when submitted

        const newInfoCluster = { Title: req.body.title, Schema: [] } //we will loop through the field_name, and field_type arrays and push their values into the Schema arr


        for (let i = 0; i < req.body.field_name.length; i++) { //field_name and field_type are parallel arrays so we only need to loop over one if we want to push values from both into our Schema arr
            if (!req.body.field_name[i]) break; //stop looping upon empty element or else Mongo get angry >:(

            newInfoCluster.Schema.push({
                Field_Name: req.body.field_name[i], //*remember we are working with arrays of field names and field types bc thats the default behavior for dom nodes that share the same name attribute
                Field_Type: req.body.field_type[i]
            })
        }


        try {
            const infoClusterDBObject = await Info_cluster.create(newInfoCluster); //the object we just created above
            console.log("infoClusterDBObject________:", infoClusterDBObject)

            console.log("Info Cluster has been added!");

            res.redirect(`/info/view_info_cluster/${infoClusterDBObject._id}`)

            //this brings us to a page to see a single info cluster we just made


        } catch (err) {
            console.log(err);
        }

    },
    likeComment: async (req, res) => {
        try {
            await Info_cluster.findOneAndUpdate(
                { _id: req.params.id },
                {
                    $inc: { likes: 1 },
                }
            );
            console.log("Likes +1");
            res.redirect(`/post/${req.params.id}`);
        } catch (err) {
            console.log(err);
        }
    },
    updateInfoCluster: async (req, res) => {
        try {
            await Info_cluster.findOneAndUpdate(
                { _id: req.params.id },
                {
                    $set: {
                        // update the public access here
                        public: req.body.newPublicAccessStatus
                    }
                }
            );
            console.log("UPDATED API PUBLIC STATUS PARAM");
            res.redirect(`back`);
        } catch (err) {
            console.log(err);
        }
    },
    deleteComment: async (req, res) => {
        try {
            // Find post by id
            // let infoCluster = await Info_cluster.findById({ _id: req.params.id });
            // // Delete image from cloudinary
            // await cloudinary.uploader.destroy(infoCluster.cloudinaryId);
            // Delete post from db
            await Info_cluster.remove({ _id: req.params.id });
            console.log("Deleted Comment");
            res.redirect("/profile");
        } catch (err) {
            res.redirect("/profile");
        }
    },
    deleteClusterItem: async (req, res) => {
        try {
            // Find post by id
            //let post = await Post.findById({ _id: req.params.id });
            //let item = await db.collection("info_cluster_items").findById({ _id: req.params.id }); //? do we need this for anything?
            // Delete image from cloudinary
            //await cloudinary.uploader.destroy(post.cloudinaryId);
            // Delete post from db
            //await Post.remove({ _id: req.params.id });
            console.log("This is req.params.id in the delete route!", req.params.id);

            //global.db.collection("info_cluster_items").insertOne({ ...req.body, cluster_id: req.params.info_cluster_id }) //req.params.info_cluster_id is how we isolate the 

            // await global.db.collection("info_cluster_items").deleteOne({ _id: objectId(req.params.id) }, (err, result) => {
            //     console.log("Debug inside");

            //     if (err) return res.send(500, err)
            //     console.log('Message deleted!')
            // }) //!


            await global.db.collection("info_cluster_items").deleteOne({ _id: objectId(req.params.id) })


            //db.collection('orders').remove({ complete: true }, )

            console.log("Deleted Cluster item");
            res.redirect('back');
        } catch (err) {
            res.redirect('back');
        }
    },

    // deleteClusterItem: async (req, res) => {
    //     console.log(req.params.id);

    //     global.db.collection("info_cluster_items").deleteOne({ _id: objectId(req.params.id) })
    // },

};

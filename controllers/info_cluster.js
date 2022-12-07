const cloudinary = require("../middleware/cloudinary");
//const Info_cluster = require("../models/Info_cluster"); //need to import comments model here
const Info_cluster = require("../models/Info_cluster");
const User = require("../models/User");
const objectId = require("mongodb").ObjectID //! need this because info_cluster_items collection doesnt use a model



//Test entry
// Info_cluster.create({
//     Title: "Cats of New York",
//     Schema: [
//         {
//             Field_Name: "Cat Name",
//             Field_Type: "String"
//         },
//         {
//             Field_Name: "Breed",
//             Field_Type: "String"
//         }
//     ]
// });


//TODO: the form to add the data will do a POST , the controller that recives the post will do db.colletion("info_cluster_item").insertOne(req.body)
//TODO:

module.exports = {

    createInfoClusterItem: async (req, res) => {
        //TODO: This is where we will send the new addtions to the info cluster to the database  in the "info_cluster_item" collection
        console.log("THIS IS REQ.BODY AND REQ.PARAMS IN THE CREATE INFO CLUSTER ITEM ROUTE", req.body, req.params);
        console.log("This is global.db in info cluster controller", global.db);


        //*Cloudinary stuff


        const result = await cloudinary.uploader.upload(req.file.path)

        const fileAssociation = req.body.fileAssociation
        if (fileAssociation) {
            const a = fileAssociation.split(':')
            req.body[a[0]] = [result.secure_url, result.public_id, 'img']
        }

        console.log("??????????????????????????????????????", req.body);


        //put the addtions to the target API in the "info_cluster_items" collection here
        global.db.collection("info_cluster_items").insertOne({ ...req.body, cluster_id: req.params.info_cluster_id }) //req.params.info_cluster_id is how we isolate the 
        // res.send("TODO"); was just used for testing, we actually want to send them to the view_info_cluster page via the below redirect



        //res.redirect to view info cluster
        res.redirect(`/info/view_info_cluster/${req.params.info_cluster_id}`) //send them back to the view info cluster page to see the changes they made, 
    },

    getInfoClusterView: async (req, res) => {
        //*This is where we render the view of the single info cluster that was just created
        //*This form is the one that dynamically generates the ejs form based on the user entered Schema

        //can use findOne instead of find here bc find returns an array of objects, (in this case the arr of objects just had one thing anyways)
        const infoClusterDBObject = await Info_cluster.findOne({ _id: req.params.id })

        console.log("This is req.params.id", req.params.id);
        console.log("This is infoClusterDBObject._id", infoClusterDBObject._id);


        //*Here we are writing the code to ultimately render a view that shows all the items in a specific info_cluster
        //TODO:
        //get info cluster model, that gives id
        //? using this? const Info_cluster = require("../models/Info_cluster"); Info_cluster.findOne(infoClusterDBObject._id)
        //db.collection("info_cluster_items").find( filter for info cluster id).toArray()
        //? here the filter will be for info_cluster_items that have  a cluster id of infoClusterDBObject._id
        let infoClusterItems = await db.collection("info_cluster_items").find({ cluster_id: req.params.id }).toArray() //? why does this work with req.params.id but not with infoClusterDBObject._id when they are the same
        //loop through the items, then loop through the keys in each item
        console.log("This is info Cluster Items in the getInfoView route", infoClusterItems);

        //from each item you take the array which will be the value of that key,
        //take last element in each array this will tell us how to display the data

        //* then send them back to the view info cluster page were we will then render the previous form along with
        //* all the info_cluster_items that have the targeted cluster id.
        //TODO: do the ejs for that extra rendering.


        //_______unpacking infocluster items__________________________________

        // for (let i = 0; i < infoClusterItems.length; i++) {

        // }


        //____________________________________________________________________


        //const userReturn = await User.find({ _id: req.params.id }) //TODO: need to make sure im finding the user password correctly
        console.log("This is req.user in getInfoClusterView", req.user);

        console.log("This is infoClusterDBOject in the getInfoClusterView route ", infoClusterDBObject);
        let currentUser = req.user
        console.log("This is the current user", currentUser);
        console.log(req.user._id);
        console.log(req.user.userName);
        console.log(req.user.email);

        res.render("view_info_cluster.ejs", { infoClusterObjectReturn: infoClusterDBObject, user: currentUser, clusterArr: infoClusterItems }); //just brings us to the page to create a cluster
    },
    getInfoClusterAPI: async (req, res) => {
        //*This is where we render the view of the single info cluster that was just created
        //*This form is the one that dynamically generates the ejs form based on the user entered Schema

        //can use findOne instead of find here bc find returns an array of objects, (in this case the arr of objects just had one thing anyways)
        const infoClusterDBObject = await Info_cluster.findOne({ _id: req.params.id })

        console.log("This is req.params.id", req.params.id);
        console.log("This is infoClusterDBObject._id", infoClusterDBObject._id);


        //*Here we are writing the code to ultimately render a view that shows all the items in a specific info_cluster
        //TODO:
        //get info cluster model, that gives id
        //? using this? const Info_cluster = require("../models/Info_cluster"); Info_cluster.findOne(infoClusterDBObject._id)
        //db.collection("info_cluster_items").find( filter for info cluster id).toArray()
        //? here the filter will be for info_cluster_items that have  a cluster id of infoClusterDBObject._id
        let infoClusterItems = await db.collection("info_cluster_items").find({ cluster_id: req.params.id }).toArray() //? why does this work with req.params.id but not with infoClusterDBObject._id when they are the same
        //loop through the items, then loop through the keys in each item
        console.log("This is info Cluster Items in the getInfoView route", infoClusterItems);

        //from each item you take the array which will be the value of that key,
        //take last element in each array this will tell us how to display the data

        //* then send them back to the view info cluster page were we will then render the previous form along with
        //* all the info_cluster_items that have the targeted cluster id.
        //TODO: do the ejs for that extra rendering.


        //_______unpacking infocluster items__________________________________

        // for (let i = 0; i < infoClusterItems.length; i++) {

        // }


        //____________________________________________________________________


        //const userReturn = await User.find({ _id: req.params.id }) //TODO: need to make sure im finding the user password correctly
        console.log("This is req.user in getInfoClusterView", req.user);

        console.log("This is infoClusterDBOject in the getInfoClusterView route ", infoClusterDBObject);
        let currentUser = req.user
        console.log("This is the current user", currentUser);
        console.log(req.user._id);
        console.log(req.user.userName);
        console.log(req.user.email);

        //*render the API in the browers
        res.send({ infoCluster: infoClusterDBObject, infoClusterItems: infoClusterItems })
        // res.render("view_info_cluster.ejs", { infoClusterObjectReturn: infoClusterDBObject, user: currentUser, clusterArr: infoClusterItems }); //just brings us to the page to create a cluster
    },
    getInfoClusterCreate: (req, res) => {
        res.render("create_infocluster.ejs"); //just brings us to the page to create a cluster
    },
    getAllInfoClustersView: async (req, res) => {
        let clusters = await Info_cluster.find()
        let clusterArr
        console.log("THIS IS clusters IN THE getAllInfoClusterView route", clusters);

        res.render("all_info_clusters.ejs", { allClusters: clusters }); //brings us to the page to see all created info clusters
    },
    // createComment: async (req, res) => {
    //     console.log('working')
    //     try {
    //         Info_cluster.create({
    //             text: req.body.text,
    //             likes: 0,
    //             user: req.user.id,
    //             commentFor: req.params.id

    //         });
    //         console.log("Post has been added!");
    //         res.redirect(`/post/${req.params.id}`); //this brings us right back to the same page we are on
    //     } catch (err) {
    //         console.log(err);
    //     }
    // },
    createInfoCluster: async (req, res) => {
        //when on the page to create cluster that form on that page lands here when submitted
        console.log('working')
        console.log("req.params.id", req.params.id);
        console.log("req.params._id", req.params._id);

        // console.log("This is req.body in create info cluster", req.body);
        const newInfoCluster = { Title: req.body.title, Schema: [] } //we will loop through the field_name, and field_type arrays and push their values into the Schema arr

        //Example of field_name and field_type being arrays we need to loop though
        /* 
        
        This is req.body in create info cluster [Object: null prototype] {
          title: 'Test info cluster',
          field_name: [ 'Count', 'Location', '', '', '' ],
          field_type: [ 'number', 'location', '', '', '' ],
          providing: ''
        }
        
        */


        for (let i = 0; i < req.body.field_name.length; i++) { //field_name and field_type are parallel arrays so we only need to loop over one if we want to push values from both into our Schema arr
            if (!req.body.field_name[i]) break; //stop looping upon empty element or else Mongo get angry >:(

            newInfoCluster.Schema.push({
                Field_Name: req.body.field_name[i], //*remember we are working with arrays of field names and field types bc thats the default behavior for dom nodes that share the same name attribute
                Field_Type: req.body.field_type[i]
            })
        }
        // console.log("This is newInfoCluster:", newInfoCluster);

        try {
            const infoClusterDBObject = await Info_cluster.create(newInfoCluster); //the object we just created above
            console.log("infoClusterDBObject________:", infoClusterDBObject)

            //TODO: make the view_info_cluster.ejs file and start building the form out
            console.log("Info Cluster has been added!");
            let infoClusterSchemaArr = infoClusterDBObject.Schema
            //console.log("infoClusterSchemaArr:!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!", infoClusterSchemaArr)
            // console.log("This is req.user in create info cluster", req.user)
            // console.log("This is req.user as an array in create info cluster", Object.entries(req.user._doc))
            //console.log("THIS IS REQ.PARAMS.ID:", req.params.id);


            let userArr = Object.entries(req.user._doc)
            console.log("THIS IS THE ID OF THE INFO CLUSTER", infoClusterDBObject._id);


            //! render vs redirect, render says get and show this FILE , redirect sends you to the route as end point


            //! on the line below i was trying to go to a file that literally included the objectid, when i was actully trying to render that pages specific info_cluster view 
            //res.render(`/info/view_info_cluster/${infoClusterDBObject._id}`, { infoClusterObjectReturn: infoClusterSchemaArr, user: userArr }); //? Do i need user: req.user here since i ask users for a username upon registering?
            res.redirect(`/info/view_info_cluster/${infoClusterDBObject._id}`)
            //! cannot use res.redirect(`/info/view_info_cluster/${infoClusterDBObject._id}`, ...) this was a problem earlier bc i didnt have a route for it to follow completely finished
            //this brings us to a page to see a single info cluster

            //when we get to this page its when we generate the form corrisponding to the users input
            //We can then allow the user to make changes to the cluster if they want

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

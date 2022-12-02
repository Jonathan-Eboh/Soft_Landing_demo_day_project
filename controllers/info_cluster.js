const cloudinary = require("../middleware/cloudinary");
//const Info_cluster = require("../models/Info_cluster"); //need to import comments model here
const Info_cluster = require("../models/Info_cluster");
const User = require("../models/User");

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



module.exports = {

    getInfoClusterView: async (req, res) => {

        const infoClusterDBObject = await Info_cluster.find({ _id: req.params.id })
        //const userReturn = await User.find({ _id: req.params.id }) //TODO: need to make sure im finding the user password correctly
        console.log("This is req.user in getInfoClusterView", req.user);

        console.log("This is infoClusterDBOject in the getInfoClusterView route ", infoClusterDBObject);
        let currentUser = req.user
        console.log("This is the current user", currentUser);
        console.log(req.user._id);
        console.log(req.user.userName);
        console.log(req.user.email);

        res.render("view_info_cluster.ejs", { infoClusterObjectReturn: infoClusterDBObject, user: currentUser }); //just brings us to the page to create a cluster
    },
    getInfoClusterCreate: (req, res) => {
        res.render("create_infocluster.ejs"); //just brings us to the page to create a cluster
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
                Field_Name: req.body.field_name[i], //remember we are working with arrays of field names and field types
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
};

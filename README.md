# Soft Landing



![Soft_Landing_index](https://user-images.githubusercontent.com/23227549/210624357-7b5a0eff-31c0-4323-9eab-ebd36fb07981.png)


About the application:
Soft landing:

Soft landing is An API crowdsourcing and data democratization tool.
Soft landing aims to address many of the current issues around the quality and reliability of APIs within the current tech space.

As things are now, many developers spend hours looking through mostly unreliable APIs. 
Many of which require anywhere from a moderate to extensive list of checkboxes and dropdowns to be filled out before allowing access. 
Many times it is difficult to tell if an API actually meets ones needs until after this time consuming process. 
That said, It is my genuine belief that the current hassle with finding a reliable API and ones ability to navigate such a hurdle do not directly correlate with the skills needed to be a competent developer. 

This tool aims to address these issues by:
-Expediting the search process by offering a central, easy to use, hub for API creation. 
-Raising the bar of reliability for APIs. APIs will regularly be screened for being online and accessible to the user base.
-Creating a ubiquitous and adaptable standard for the structure of returned data 
-Giving users an intuitive tool as well as guides and templates for robust schema construction.
-Give everyday people an avenue to make money from their data via the bounty system. In turn, creating a community of data enthusiast and raising data literacy 
-Allow for creation and hosting of public and private APIs to ensure user autonomy



<b>You can watch a walk though of the app here!</b>
<div><p><a href="https://soapbox.wistia.com/videos/iGk63g1lKu" target="_self"><img style="width:400px;height:225px" width="400" height="225" src="https://embedwistia-a.akamaihd.net/deliveries/c30b516f886f3178fb095abc6db9fb21.jpg?image_crop_resized=800x450"/></a></p><p><a href="https://soapbox.wistia.com/videos/iGk63g1lKu">Soapbox - Soft Landing</a></p></div>




![Soft_Landing_Profile](https://user-images.githubusercontent.com/23227549/210624432-e0651f4a-c7ab-4616-af4f-d9b58b2d561c.png)

![Soft_Landing_Create_Info_Cluster](https://user-images.githubusercontent.com/23227549/210624446-c627f38f-8b10-4eaa-886f-1ad6e2a8bd2e.png)


![Soft_Landing_All_Apis](https://user-images.githubusercontent.com/23227549/210624486-c76c6f69-ee9b-4006-b648-52e67370a8e5.png)


![Soft_Landing_Turtle_Api](https://user-images.githubusercontent.com/23227549/210624495-a6ef09cb-8ac1-48c8-845a-c8921d2880a4.png)

![Soft_Landing_Turtle_Api_Raw](https://user-images.githubusercontent.com/23227549/210624507-7cb838c7-08f3-441e-ae0d-f027ef7a494a.png)


Tech used:

Front end: HTML, CSS, JavaScript, Tailwind CSS, EJS

MiddleWare: Passport for authentication, cloundinary for image hosting

Back end: Node js, mongo db

Optimizations:

This was a pleasant and rare instance where the pipe line from idea to fully built out piece of software was able to flow with relatively few hitches. That said, half way through development the API I was leveraging started to return bad data for some of its entries. This lead to me utilizing a conditional clause within my EJS to preclude bad data from being rendered to the front end.

C.R.U.D

for this one the paradigm takes the structure of

Create:
 
1)Allows the user to create and specify the details of the database which holds the information for their API.
2)Allows the user to add individual data points/entries into the data base previously created.


Read: 
1) The user can navigate to a view that displays a link to all existing APIs.
2) Once viewing a single API the user can see a list of all entries in that specific API. 

Update: 
The user can change the status of the APIs public access to public or private

Delete: 
The user has the option to delete a given entry in an API.

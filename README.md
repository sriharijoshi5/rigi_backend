# rigi_backend
Over the weekend!

Right, designed and developed from scratch (someone else would have done it bettter may be ;) 

Yes, .env could "not" have been in repo..

The repository is for backend of a tinder-like application. 

Tech Stack: NodeJS (express), MongoDB

It's node, just:
npm i
npm start --> Good to go! (make changes on to your env)

API Testing (you've postman collection in the repo, still, some instructions here) - Please try following step numbers for ease of testing:

POST: Step 1: Send OTP Heroku ("mobileNo" in the body)
Response: 4 digit OTP (PLEASE USE THIS OTP ONLY FOR VERIFICATION IN NEXT STEP)

POST: Step 2: Verify OTP Heroku ("mobileNo", and "otp" in the body)
Response: accessToken (This is all we need for authentication: Select Auth type as Bearer Token and paste the accessToken you just received for ALL FOLLOWING APIs - ignore if you want 403 response :P )

POST: Step 3: Register User Heroku ("name" in the body)
Response: Registeration status

GET: Step 4.0: Get Image Heroku ("dont forget the Auth for any APIs, thats all we need for this")
Response: Name and URL of the image

POST: Step 4.1: Image Action Heroku ("action" in the body)
Response: Select/Reject status

Step 5: You can play around with 4.0 and 4.1!

Finally,
GET: STEP 6: History Heroku ("Auth is all you need")
Response: List of images you swiped left/right with the action time!

Refresh Token is in the env but I've avoided implementing it for ease of testing. 
Your access token never expires :D

Please drop your comments/suggestions.

Thank you for your time :) 
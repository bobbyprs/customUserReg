# CustomUserRegistration
A custom user registration form that can only be accecd by admin .when the user get registered an autogenerated password will be sent to email .
As a super admin user I want to add a new tenant so that the new tenant can access and manage their portal. 

 

Given I am logged in as super user

 - When I click on add tenant button 

 - Then the screen with following input should be presented

-  Name of the brand/shop 

 - Supervisor / Owner name

 - email id: 

 - Mobile number (Supervisor / Owner name)

 - Auto generated password

 - Category

 

Given all the tenant details are provided

When user user click on create button

Then e-mail should be sent to the e-mail id provided on step 1 with the instruction and details to login.

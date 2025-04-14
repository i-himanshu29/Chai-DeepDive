# Authentication

## Controllers

- 1.registerUser,
- 2.verifyUser,
- 3.loginUser,
- 4.logoutUser,
- 5.userProfile,
- 6.resetPassword,
- 7.forgetPassword,

## All routes are tested in postman

- router.post("/register", registerUser);
- router.get("/verify/:token",verifyUser);
- router.post("/login",loginUser);
- router.get("/logout",isLoggedIn,logoutUser);
- router.get("/profile",isLoggedIn,userProfile);
- router.post("/forgot-password", forgetPassword);
- router.post("/reset-password/:token", resetPassword);

- For running backend - npm run start
- We have a postman collection for it named Authentication

- Note For Me: DB is used from email 979 and mailtrap used email sde

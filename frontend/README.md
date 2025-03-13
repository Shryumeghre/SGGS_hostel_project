# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)



Login credential for student: {
    "email": "john.doe@example.com",
    "password": "securePassword123"
}


{
    "message": "User registered successfully",
    "Rector": {
        "name": "Satish",
        "email": "satish@gmail.com",
        "mobile": "9875747286",
        "address": "Nanded",
        "idProof": "idProofs/1737916720135-eyeu_single_20180528_18213257",
        "password": "Satish@123",
        "role": "rector",
        "_id": "67968132adc338bff06640e9",
        "createdAt": "2025-01-26T18:38:42.774Z",
        "updatedAt": "2025-01-26T18:38:42.774Z",
        "__v": 0
    }
}

http://localhost:5001/api/login/login
http://localhost:5001/auth/signup  ----> register as warden/rector/guard
http://localhost:5001/api/auth/register  ----> register as students
http://localhost:5001/api/submit ---> leave form
http://localhost:5001/api/approveByRector/6797c7a2dd4f1a1ba1c53bde --> Approved by rector
 http://localhost:5001/api/approveByHOD/6797c60a937ed387c91be61a --> Approved by hod

patch http://localhost:5001/api/reject/67a10fe08a251c2e1d0cd81f/Rector-Warden --> RejectForm
https://coolors.co/palettes/popular/gradient


For login as a student: 
email: purumeghare09@gmail.com
password: saru

{
    "email": "anuja@gmail.com",
    "password": "Anuja@123"
}

POST---> http://localhost:5001/api/attendance/mark
{
  "Authorization": "Bearer YOUR_JWT_TOKEN",
  "Content-Type": "application/json"
}


http://localhost:5001/api/attendance/student/67c5f2955b517837a4e00a2f
{
  "Authorization": "Bearer YOUR_JWT_TOKEN",
  "Content-Type": "application/json"
}

http://localhost:5001/api/attendance/mark-absent
# Car Selling Service Application - Next | Express

> This project implements a simple car selling service application using Next.js for the frontend and Node.js with Express.js for the backend. Users can log in, submit their vehicle information, and upload pictures of their cars.

## Features

- User authentication with JWT token.
- Form submission for car details including model, price, phone number, city, and pictures.
- Error handling and input validation on both frontend and backend.
- Responsive design for mobile devices.
- Integration with MongoDB for data storage.

## Technologies Used

- **Frontend**: Next.js, React, Tailwind CSS
- **Backend**: Node.js, Express.js, MongoDB
- **Authentication**: JWT (JSON Web Tokens)
- **File Upload**: Multer
- **HTTP Client**: Axios

## Installation

1. Clone the repository and install the dependencies:

```bash
git clone https://github.com/itxSaaad/mern-dev-test-code.git
```

2. Install the dependencies for both the frontend and backend:

```bash
cd mern-dev-test-code
npm install
```

3. Create a `.env` file in the `root` directory and add the following environment variables:

```bash
NODE_ENV = "development"
PORT = 5000
MONGO_URI = <your_mongo_uri>
SALT=<your_salt>
JWT_SECRET=<your_jwt_secret>
```

4. Create a `.env` file in the `client` directory and add the following environment variables:

```bash
NEXT_PUBLIC_API_URL=<your_backend_api_url>
```

5. Run the development server from the root directory:

```bash
npm run dev
```

# API Endpoints

- POST /api/users/login: User login endpoint.
- POST /api/users/add-car: Add car information endpoint.

## License

This project is open source and available under the [MIT License](LICENSE).

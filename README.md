# Jobs Tracker API

A RESTful API for tracking job applications built with Node.js, Express, and MongoDB.

## Features

- User authentication with JWT
- CRUD operations for jobs
- Security features (helmet, cors, rate limiting, XSS protection)
- Input validation and sanitization
- Error handling middleware
- MongoDB database integration

## Prerequisites

- Node.js
- MongoDB
- npm

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd jobs-tracker-api
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory with the following variables:
```
PORT=3000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
JWT_LIFETIME=your_jwt_lifetime
```

## Usage

Start the server:
```bash
npm start
```

The API will be available at `http://localhost:3000`

## API Endpoints

### Authentication
- `POST /api/v1/auth/register` - Register a new user
- `POST /api/v1/auth/login` - Login user

### Jobs
All jobs routes require authentication

- `GET /api/v1/jobs` - Get all jobs
- `POST /api/v1/jobs` - Create a new job
- `GET /api/v1/jobs/:id` - Get a specific job
- `PATCH /api/v1/jobs/:id` - Update a job
- `DELETE /api/v1/jobs/:id` - Delete a job

## Security Features

- Helmet for secure HTTP headers
- CORS protection
- XSS protection
- Rate limiting
- Input sanitization

## Error Handling

The API includes custom error handling for:
- Authentication errors
- Bad requests
- Not found errors
- Validation errors
- Duplicate entries

## Models

### User
- name (String)
- email (String, unique)
- password (String, hashed)

### Job
- company (String)
- position (String)
- status (String: 'interview', 'declined', 'pending')
- createdBy (ObjectId - reference to User)
- timestamps (createdAt, updatedAt)

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request

## License

This project is licensed under the ISC License
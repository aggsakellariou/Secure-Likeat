# Likeat - Restaurant Evaluation Platform

Likeat is a web application designed to allow users to manage, evaluate, and review restaurants. Built with a Java Spring Boot backend and a React (Vite) frontend, the platform ensures a smooth and secure user experience.

Restaurant owners can manage their listings, customers can leave reviews, and admins oversee operations. A fair ranking algorithm ensures unbiased restaurant ratings.

## Features

- Authentication & Authorization: Secure login using Spring Security & JWT.
- Restaurant Management: Owners can register, edit, and delete their restaurants.
- User Roles: Supports customers, restaurant owners, and admins.
- Restaurant Reviews: Customers can leave reviews and rate restaurants.
- Fair Ranking Algorithm: Ensures unbiased and fair restaurant ratings.
- Secure API Endpoints: Protected with role-based access control (RBAC).
- Modern UI: React (Vite) ensures a fast and responsive user experience.

## Requirements

### Backend (Spring Boot)
- Java 11 or higher
- Maven 3.6.0+
- Spring Boot (with Spring Security & JWT)
- MySQL

### Frontend (React + Vite)
- Node.js 14.x or higher
- npm 6.x or higher
- React Router for navigation

## Installation

### Backend Setup

1. Clone this repository:

    ```sh
    git clone https://github.com/aggsakellariou/Secure-Likeat.git
    ```

2. Navigate to the backend directory:

    ```sh
    cd Likeat/backend-likeat
    ```

3. Configure your database and JWT settings in `application.yml`:

    ```yaml
    spring:
      datasource:
        url: jdbc:mysql://localhost:3306/likeat
        username: your-username
        password: your-password
    application:
      security:
        jwt:
          secret: your-secret-key
          expiration: 86400000  # 1 day in milliseconds
    ```

4. Build the project using Maven:

    ```sh
    mvn clean install
    ```

5. Run the backend:

    ```sh
    mvn spring-boot:run
    ```

### Frontend Setup

1. Navigate to the frontend directory:

    ```sh
    cd Likeat/frontend-likeat
    ```

2. Install dependencies:

    ```sh
    npm install
    ```

3. Start the development server:

    ```sh
    npm run dev
    ```

## Authentication & Usage

1. Access the backend API at [`http://localhost:8443`](http://localhost:8443).
2. Access the frontend at [`http://localhost:5173`](http://localhost:5173).
3. Register or log in to receive a JWT token.
4. Include the JWT token in the `Authorization` header for protected API requests:

    ```http
    Authorization: Bearer your-jwt-token
    ```

5. User Roles:
   - Customers: Browse restaurants, leave reviews.
   - Restaurant Owners: Manage restaurant listings.
   - Admins: Manage users and approve restaurants.

## Tech Stack

- Backend: Java, Spring Boot, Spring Security, JWT, Hibernate, MySQL
- Frontend: React, Vite, Axios, Bootstrap CSS
- Deployment: Docker, Render

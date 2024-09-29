
# PatelBros

## Description
**PatelBros** is a full-featured e-commerce web application built with **Angular** and **SCSS**. The platform allows users to browse products, manage their shopping cart, and securely checkout. The application integrates with backend services for user authentication, product management, and order processing. It is optimized for both desktop and mobile users, offering a seamless shopping experience.

## Technologies
The following technologies and libraries are used in the development of **PatelBros**:

- **Angular (v17.3.0)**: A framework for building dynamic and responsive web applications.
- **TypeScript**: The primary programming language for building robust and scalable features.
- **SCSS (Sassy CSS)**: For structuring and styling the app with modularity and flexibility.
- **RxJS**: For handling asynchronous data streams in the application.
- **Angular Router**: For managing client-side routing and navigation between pages.
- **Express (v4.18.2)**: A minimal and flexible Node.js web application framework used for server-side rendering and handling API requests.
- **Bootstrap (v5.3.3)**: For responsive and mobile-first design.
- **Font Awesome**: For including a wide range of icons in the UI.
- **ngx-print**: For providing a printing service for generating printable order summaries or invoices.
- **ng-openapi-gen**: A tool to generate Angular services based on an OpenAPI specification.

## Key Features
- **Product Catalog**: Browse products with filtering, sorting, and category-based navigation.
- **Shopping Cart**: Add items to the cart, adjust quantities, and proceed to checkout.
- **Order Management**: View order history, track orders, and manage addresses.
- **User Authentication**: Secure login, registration, and profile management for users.
- **Payment Integration**: Payment processing with success and failure handling.
- **Admin Dashboard**: Admin interface for managing products, categories, and brands.

## Running the Application
To run the application locally, follow these steps:

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   ```
2. **Install dependencies**:
   ```bash
   npm install
   ```
3. **Run the application**:
   ```bash
   npm start
   ```
   This will start the development server at `http://localhost:4200/`.

4. **SSR (Server-Side Rendering)**:
   To run the app with server-side rendering:
   ```bash
   npm run serve:ssr:patelbros
   ```

## Project Structure

```plaintext
src/
│
├── app/
│   ├── admin/
│   │   ├── pages/
│   │   ├── admin-routing.module.ts
│   │   ├── admin.module.ts
│   ├── client/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── client-routing.module.ts
│   ├── services/
│   ├── models/
│   ├── app.component.ts
│   ├── app.routes.ts
│
├── assets/
│   ├── css/
│   ├── images/
│
├── environments/
├── main.ts
├── index.html
├── docker-compose.yml
```

### Key Folders
- **admin**: Contains all admin-related pages, such as managing brands, categories, products, and orders.
- **client**: Contains all client-facing components and pages, such as browsing products, cart, and checkout.
- **services**: Includes services that handle API interactions, token management, and session storage.
- **models**: Defines TypeScript interfaces and models for handling data within the app.
- **assets**: Contains static assets like CSS, images, and JavaScript files.

## Testing
Unit tests can be run using **Karma**. The testing framework is already integrated into the project.

1. To run the unit tests:
   ```bash
   npm test
   ```

2. To run end-to-end tests (optional, if configured):
   ```bash
   ng e2e
   ```

## Deployment
1. **Production Build**:
   To build the project for production, run the following command:
   ```bash
   npm run build
   ```
   The build artifacts will be stored in the `dist/` directory.

2. **Docker Deployment**:
   The project includes a `docker-compose.yml` file to facilitate containerized deployment:
   ```bash
   docker-compose up --build
   ```

## Contact
For any questions or support, please contact:

- **Email**: [your-email@example.com]
- **GitHub**: [your-github-profile-link]

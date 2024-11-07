# JobGregate

[JobGregate](https://jobgregate.in) is a powerful job aggregator platform that compiles job listings from multiple top sources, such as LinkedIn, Glassdoor, and others, simplifying the job search process. Users can search for jobs, apply filters, and view details in a single place.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Authentication and Authorization](#authentication-and-authorization)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## Features

- **Aggregated Job Listings**: Compile job data from leading platforms, allowing a unified job search.
- **Advanced Search Filters**: Users can filter jobs by:
  - Date posted
  - Employment type (Full-time, Part-time, Contract)
  - Company type
  - Remote work preferences
  - Job requirements (customizable)
- **Detailed Job View**: View in-depth job details, including requirements, company info, and application links.
- **Profile Management**: Users can register, log in, and manage their profiles, including:
  - Setting job search preferences
- **Secure Authentication**: Authentication via NextAuth with session-based management.
- **Responsive Design**: Mobile and desktop-friendly layout using TailwindCSS.

## Tech Stack

- **Frontend**:
  - [Next.js](https://nextjs.org/)
  - [TailwindCSS](https://tailwindcss.com/)
  - [TypeScript](https://www.typescriptlang.org/)
- **Database**:
  - [MongoDB](https://www.mongodb.com/)
- **Authentication**:
  - [NextAuth](https://next-auth.js.org/)
- **Libraries**:
  - [MaterialUI](https://mui.com/material-ui/)

## Installation

To set up the project locally, follow these steps:

1. **Clone the repository**:

   git clone https://github.com/ansen01-svg/JobGregate.git

2. Navigate into the project directory:
   cd JobGregate

3. Install dependencies:
   npm install

4. Set up environment variables:
   Create a .env.local file and add the required environment variables for your MongoDB database, NextAuth, and any job API keys.

5. Run the development server:
   npm run dev

## Authentication and Authorization:

JobGregate uses NextAuth for secure authentication, leveraging JWT for session-based management. Users can register and log in to access profile features, manage preferences, and save job listings. Middleware ensures that only authenticated users access certain routes.

## Usage:

1. Register/Login: Users can create an account or log in to access personalized features.

2. Search Jobs: Use the search bar to enter keywords, and apply filters to narrow down job results.

3. View Job Details: Click on a job listing to view its details, including company info, role description, and application link.

4. Add preference to curate the job roles you are looking for.

## Contributing:

1. Fork the repository.

2. Create a branch for your feature:

   git checkout -b feature/YourFeatureName

3. Commit your changes:

   git commit -m 'Add new feature'

4. Push to your branch:

   git push origin feature/YourFeatureName

5. Create a Pull Request.

## License:

This project is licensed under the MIT License. See the LICENSE file for details.

## Contact:

For questions or feedback, feel free to reach out:

Email: ansenbeyc73@gmail.com
LinkedIn: Ansen Bey
GitHub: ansen01-svg

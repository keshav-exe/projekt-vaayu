# Project Vaayu - Journal WebApp v2.1 (GPT-3.5 Optimized)

![Project Vaayu Logo](link_to_logo_image)

## Overview

Project Vaayu started as a simple login and registration logic code and has since evolved into a comprehensive journal web application. Created and being maintained by Keshav Bagaade, this solo personal project, currently under development, is designed to provide users with a platform to capture their thoughts, reflections, and experiences in a secure and organized manner. Built using HTML, SASS, PHP, and JavaScript, Project Vaayu strives to offer a user-friendly interface, smooth transitions, and robust functionality, making journaling a delightful experience.

## Features

- **User Authentication**: Secure user accounts with password protection.
- **Date-based Entries**: Entries are organized based on the date of creation.
- **Search Functionality**: Quickly find specific entries using the search feature.
- **Clean, Modern, and Minimalist Design**: Enjoy a delightful journaling experience with a sleek user interface.
- **Font**: Utilizes the elegant **Poppins** font for a refined typographic experience.
- **Icons**: Icons are sourced from **FontAwesome** to enhance visual appeal.
- **Smooth Transitions and Animations**: Enhances the user experience with fluid transitions and subtle animations.
- **JavaScript**: Utilizes JavaScript for dynamic and interactive elements.
- **Code Optimization**: Further optimized using GPT-3.5 for improved efficiency.

## Upcoming Features

- **Responsive Design**: Access your journal from various devices with ease.
- **Edit or Delete Entries**: Modify or remove your journal entries as needed.

## Getting Started

### Prerequisites

- PHP (version 8.2.0)
- MySQL database
- Web server (Apache)

### Installation

1. Clone the repository to your local machine:

   ```bash
   git clone https://github.com/yourusername/project-vaayu.git
   ```

2. Configure the database settings:

   - Open `database.php` and update the database connection parameters:

     ```php
     define('DB_HOST', 'your_database_host');
     define('DB_USER', 'your_database_user');
     define('DB_PASSWORD', 'your_database_password');
     define('DB_NAME', 'your_database_name');
     ```

3. Import the database schema:

   - Execute the SQL script provided in `database.sql` to create the necessary tables. The database requires two tables:
     - `users`: Contains user details, including username and password.
     - `posts`: Stores journal entries, including the date, content, and any additional metadata.

4. Start your web server.

5. Open the web app in your browser:

   ```bash
   http://localhost/project-vaayu
   ```

## Usage

1. Create a new account or log in if you already have one.
2. Navigate to the "Create Post" section to start writing your journal entry.
3. Use the search bar to find specific entries.
4. Log out when finished.

## Contributing

As Project Vaayu is a solo personal project and has evolved from a simple login and registration logic code, contributions are not open at this time. However, suggestions and feedback are always welcome.

## License

This project is licensed as a **Personal Project**. You are free to view, use, and modify the code for personal purposes. Copying or reproducing the code, in part or whole, for distribution or commercial purposes is strictly prohibited without giving proper credit.

## Acknowledgments

- Special thanks to [Bro Code](https://www.youtube.com/c/BroCode) on YouTube for their valuable PHP tutorial.

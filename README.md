# URL Shortener

A simple, fast, and efficient URL shortening service built with Node.js, Express.js, and PostgreSQL. This application provides a clean interface to convert long URLs into manageable, short links and redirects users to the original URL when they access the short link.

## Features

- **Shorten URLs**: Convert any long URL into a unique, short link using shortid.
- **Idempotent Submissions**: If a URL has already been shortened, the existing short link is returned instead of creating a new one.
- **URL Redirection**: Accessing a short link automatically redirects to the original URL.
- **Robust Database**: Uses PostgreSQL with node-postgres (pg) for reliable and scalable data storage.
- **RESTful API**: A clear and simple API for creating short links.
- **User-Friendly Frontend**: A responsive and intuitive EJS-templated web interface for users to shorten their URLs.

## Tech Stack

- Backend: Node.js, Express.js
- Database: PostgreSQL
- Template Engine: EJS
- URL Generation: shortid
- Database Client: node-postgres (pg)

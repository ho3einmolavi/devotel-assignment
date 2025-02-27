# **Job Syncer Project - README**

## **Overview**

The **Job Syncer** project is a **NestJS-based** application designed to **fetch** and **sync job offers** from multiple external job providers into a **PostgreSQL database**. This project automates the process of synchronizing job listings by running a **cron job** that periodically fetches job data, transforms it to a unified format using the **Adapter Design Pattern**, and stores it in the database.

The project uses **Prisma ORM** for efficient database interactions and ensures data consistency by avoiding duplicate entries. It is built with a **modular architecture** in NestJS, enabling easy scalability and maintainability. Additionally, the project provides comprehensive **Swagger API documentation**, accessible at:
```
http://<your-domain>/docs
```
This allows for easy exploration and testing of all available endpoints with detailed request and response schemas.

---

## **Key Features**
- **Automated Job Syncing:** Fetches and syncs job offers from multiple external sources at a scheduled interval using **cron jobs**.
- **Flexible Integration:** Utilizes the **Adapter Design Pattern** to support integration with multiple job providers while maintaining a consistent internal data structure.
- **Optimized Database Operations:** Efficiently stores job data in a **PostgreSQL database** using **Prisma ORM**, ensuring high performance and data integrity.
- **Modular Architecture:** Built using **NestJS**, following best practices for scalability, maintainability, and testability.
- **Comprehensive Testing:** Includes unit and end-to-end testing using **Jest** to ensure code reliability and prevent regressions.

---

## **Tech Stack**
This project is built using the following technologies:

| Technology    | Description                                         |
| ------------- | --------------------------------------------------- |
| **NestJS**    | A progressive Node.js framework for building efficient, reliable, and scalable server-side applications. |
| **Prisma**    | A next-generation ORM that provides type-safe database access and migrations. |
| **PostgreSQL**| A powerful, open-source relational database system. |
| **Jest**      | A testing framework for writing unit and end-to-end tests, ensuring application reliability. |
| **Axios**     | A promise-based HTTP client for making API requests to external job providers. |
| **@nestjs/schedule** | A scheduling module used to run the cron job that synchronizes job data periodically. |

---

## **How Cron Works**

### **Purpose of Cron in this Project**
The **cron job** is responsible for periodically **fetching job offers** from external job providers and **syncing them** with the local database. It ensures the database stays up-to-date with the latest job listings without manual intervention.

### **Implementation Details**
- Implemented using **`@nestjs/schedule`**, a NestJS module that provides cron-like functionality.
- The cron job is scheduled using a **CRON_CONFIG** variable, which is defined in the `.env` file.
- The cron job triggers the `syncJobOffers` method in the `CronsHandlerWorker` service, which:
  1. Iterates through all job providers.
  2. Fetches job data using `axios`.
  3. Transforms the data using the **Adapter Design Pattern**.
  4. Stores the job offers in the database using Prisma, with **`skipDuplicates: true`** to prevent duplication.

### **Example Configuration**

```env
CRON_CONFIG=*/5 * * * * *
```

This configuration makes the cron job run every **5 seconds**.

### **Cron Execution Flow**

1. **`@Cron(process.env.CRON_CONFIG)`** in `CronsHandlerWorker` starts the cron job.
2. `syncJobOffers()` method is called.
3. `syncJobOffers()` iterates over the registered job providers and fetches job data.
4. The fetched data is transformed into a unified format using the **Adapter Design Pattern**.
5. The transformed data is stored in **PostgreSQL** using **Prisma ORM**.

---

## **Why Use the Adapter Design Pattern**

### **Purpose of Adapter Pattern**
The **Adapter Design Pattern** is used to:
- **Decouple the internal logic** from external job provider APIs.
- **Maintain a consistent internal data structure**, even if different providers return data in various formats.
- **Easily integrate new job providers** without modifying the core syncing logic.

### **How It Works in This Project**
- Each job provider has its own **Adapter Class** (e.g., `ProviderAAdapter`, `ProviderBAdapter`) that implements a **common interface** (`JobDataAdapter`).
- The adapter class:
  - **Transforms the data** into a unified format compatible with the internal database schema.
- The main sync logic does not need to know the specifics of each provider’s API, as the adapter handles that complexity.

### **Benefits**
- **Open-Closed Principle:** Easily add new providers by creating new adapters without modifying existing code.
- **Maintainability:** Changes to a provider’s API require changes only in its adapter.
- **Consistency:** Internal logic works with a unified data structure regardless of the source.

---

## **Database Schema**

The project uses **Prisma ORM** to manage a **PostgreSQL** database. The schema is defined in the `prisma/schema.prisma` file.

### **Schema Overview**

| Column               | Type          | Description                                      |
| -------------------- | ------------- | ------------------------------------------------ |
| `id`                 | `Int`         | Primary key, auto-incremented.                    |
| `externalId`         | `String`      | Identifier from the external job provider.        |
| `title`              | `String`      | Job title.                                       |
| `employmentType`     | `String`      | Type of employment (e.g., full-time, part-time).  |
| `city`               | `String`      | City where the job is located.                    |
| `state`              | `String`      | State or region of the job location.              |
| `isRemote`           | `Boolean`     | Indicates if the job is remote.                   |
| `minSalary`          | `Int`         | Minimum salary offered.                          |
| `maxSalary`          | `Int`         | Maximum salary offered.                          |
| `currency`           | `String`      | Currency for salary (e.g., USD, EUR).             |
| `companyName`        | `String`      | Name of the company offering the job.             |
| `website`            | `String`      | Company's website URL.                           |
| `industry`           | `String`      | Industry category (e.g., IT, Finance).            |
| `source`             | `String`      | Source of the job listing (e.g., provider name).  |
| `experienceRequired` | `Int`         | Years of experience required.                     |
| `technologies`       | `String[]`    | List of required technologies (e.g., JavaScript, React). |
| `datePosted`         | `DateTime`    | Date when the job was posted.                     |
| `createdAt`          | `DateTime`    | Record creation timestamp (auto-generated).       |
| `updatedAt`          | `DateTime`    | Record last update timestamp (auto-generated).    |

### **Prisma Model Definition**

```prisma
model JobOffer {
  id                  Int      @id @default(autoincrement())
  externalId          String   
  title               String
  employmentType      String?
  city                String?
  state               String?
  isRemote            Boolean? @default(false)
  minSalary           Int?
  maxSalary           Int?
  currency            String
  companyName         String
  website             String?
  industry            String?
  source              String
  experienceRequired  Int?
  technologies        String[]
  datePosted          DateTime
  createdAt           DateTime @default(now())
  updatedAt           DateTime @updatedAt

  @@unique([source, externalId])
}
```

### **Key Constraints and Indexes**
- **`@@unique([source, externalId])`** ensures that no duplicate job entries exist for the same `externalId` from the same `source`.
- **`createdAt`** and **`updatedAt`** are automatically managed timestamps.
- This design allows multiple providers to post jobs with the same `externalId`, as long as the `source` is different.

---

## **Testing**

### **Testing Stack**
- **Jest** is used for both **unit tests** and **end-to-end (E2E) tests**.
- **Supertest** is used for making HTTP requests in E2E tests.

### **Test Coverage**
- **Data Transformation Logic:** Tests each provider’s adapter to ensure consistent data structure.
- **Scheduler (Cron Job) Functionality:** Verifies that the cron job is triggered according to the configured schedule.
- **API Endpoints:** Ensures all routes respond with the correct data and status codes.
- **Integration Tests:** End-to-end testing of the entire job syncing flow.

---

## **Getting Started**

1. **Clone the repository:**
```sh
git clone <repo-url>
cd job-syncer
```

2. **Install dependencies:**
```sh
pnpm install
```

3. **Create and configure `.env` file:**
```env
DATABASE_URL="postgresql://user:password@localhost:5432/jobSyncer"
PROVIDER_A_URL="https://assignment.devotel.io/api/provider1/jobs"
PROVIDER_B_URL="https://assignment.devotel.io/api/provider2/jobs"
CRON_CONFIG=*/5 * * * * *
```

4. **Run migrations and start the app:**
```sh
npx prisma migrate dev --name init
pnpm run start:dev
```

---

## **License**
This project is licensed under the MIT License.
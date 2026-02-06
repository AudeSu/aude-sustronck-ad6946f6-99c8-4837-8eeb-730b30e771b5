# Cheese & Wine Store — Inventory System

## Requirements
This document describes the requirements for the inventory management system of the Cheese & Wine Store.

Our system maintains a list of products. Your task is to add the new feature to our system so that
we can begin selling a new category of products. First an introduction to our system:

- All `products` have a `SellIn` value which denotes the number of days we have to sell the `products`
- All `products` have a `Quality` value which denotes how valuable the product is
- At the end of each day our system lowers both values for every item

The basic logic is straightforward; however, the following exceptions and special cases apply:

- Once the sell by date has passed, `Quality` degrades twice as fast
- The `Quality` of a product is never negative
- __"Wine"__ actually increases in `Quality` the older it gets
- The `Quality` of an item is never more than `50`
- __"Nuts"__, never have to be sold or decreased in `Quality`
- __"Brie"__, like wine, increases in `Quality` as its `SellIn` value approaches;
    - `Quality` increases by `2` when there are `10` days or less and by `3` when there are `5` days or less but
    - `Quality` drops to `0` when SellIn is `0`

We have recently signed a supplier of `Grapes`. This requires an update to our system:

- __"Grapes"__ degrade in `Quality` twice as fast as normal items

Feel free to make any changes to the `UpdateQuality` method of the `InventoryService` and add any new code as long as everything
still works correctly. However, do not alter the `ProductDto` or the API specification. Our frontend depends on this API, and we don't want any breaking changes.

Just for clarification, a product can never have its `Quality` increase above `50`, however __"Nuts"__ are an exception to this rule and as such their `Quality` is `80` and it never alters.

## About the Exercise

This exercise is designed to assess your ability to interpret requirements and work with legacy codebases. The requirements are intentionally vague, and the codebase is not well-structured. 
Your task is to implement the new feature while **maintaining the existing functionality**.

You are encouraged to:

- **Refactor the existing code** to improve clarity, maintainability, or extensibility.
- Write **tests** to ensure the system’s behavior remains unchanged.
- Use meaningful, incremental commits to illustrate your development process and reasoning. Feel free to create additional branches if you want to experiment with different approaches.

## GIT

You have received this project in a ZIP file. Please follow the steps below to deliver your solution:

### 1. Create a Public GitHub Repository
- Name the repository using the following format:  
  **`{firstname}-{lastname}-{uuid}`**  
  *(Generate the UUID yourself.)*

### 2. Repository Setup
- Create two branches:
  - `main`: contains the **original, unmodified** code from the ZIP file.
  - `development`: contains **all your changes and additions**.

### 3. Permissions
- Invite the following users as **maintainers** of the repository:
  - `@maartenraes`
  - `@jmostaer`

### 4. Pull Request
- Once your development work is complete:
  - Create a **pull request** from `development` into `main`.
  - Tag both `@maartenraes` and `@jmostaer` as **reviewers** on the PR.

## AI Usage Policy

AI assistance is encouraged! We believe in leveraging AI tools to enhance problem-solving and learning. Feel free to use AI assistants (like ChatGPT) to **clarify concepts, ask questions, or validate your understanding** while working on this project.

However, **during this technical test we ask you not to use autonomous or code-generating AI agents** (such as Claude Code, Cursor agents, Copilot Chat generating large blocks of code, or similar tools that substantially author the solution).  
The goal of this exercise is to better understand your own problem-solving approach and coding skills, which becomes harder to assess when most of the implementation is auto-generated.

In your day-to-day work, we fully encourage the use of such tools, this restriction applies **only** to the interview exercise.

Please document any AI usage in the `AI_PROMPTS.md` file.

This approach reflects modern development practices while still allowing us to fairly evaluate your individual capabilities.

## Getting started

To run and modify the project, you will need the following installed:

- [Node.js](https://nodejs.org/) (version `22.x`)
- [npm](https://www.npmjs.com/) (comes with Node.js)

### Install dependencies:

```bash
cd backend && npm install
```

### Run the tests:

```bash
cd backend && npm run test
```

### Run the application:

```bash
cd backend && npm run start
```

### Access the swagger UI:

With the application running, the documentation is accessible at:
[http://localhost:8080/docs/](http://localhost:8080/docs/)

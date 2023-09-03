Southern Lights Assignment (SL_TEST)

Overview
The Calculations Dashboard is a web application designed to provide insights into hydrogen production economics. The app offers three main sections: CAPEX (Capital Expenditure), Hydrogen Production, and LCOH (Levelized Cost of Hydrogen). Users can input specific parameters in the CAPEX and Hydrogen Production sections, such as installation and hardware costs or yearly hydrogen production levels. The app then calculates the Levelized Cost of Hydrogen (LCOH) based on these inputs and visualizes the results through line and doughnut charts. The dashboard aims to make it easier for stakeholders to understand the financial viability of hydrogen production projects.

Design Choices
1. Next.js: For server-side rendering and better SEO capabilities.
2. Tailwind CSS: For a utility-first approach to styling, which speeds up development.
3. React Hooks: To manage component state and side-effects.
4. State Management: Local component state was used, as the application is not overly complex to require Redux or MobX.

Implementation Details
1. Capex Form: Users input the capital expenditure data. The form validates and posts the data to the server.
2. H2 Production: Another form that handles H2 production data.
3. LCOH: This section calculates the Levelized Cost of Hydrogen based on the data from Capex and H2 Production forms.
4. Charts: Used Charts.js for data visualization.

AI Usage
OpenAI's GPT-4 was used to assist in generating content for the README and for code suggestions.


This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

Instructions to Run Locally

Clone the Repo
git clone https://github.com/Nollis/sl_test.git

Navigate into the directory
cd /sl_test

Install dependencies
npm install

Run the development server
npm run dev

Visit localhost
Open http://localhost:3000 with your browser to see the result.

Additional Comments
I decided to use charts for the responses because it is easier to understand the results, and it is more fun to code =)
Future Enhancements: I would work on making it more responsive, colors and layout. I would also try making more components for reuseability.
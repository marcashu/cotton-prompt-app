## How to Setup

### Prerequisites

- Download **appPackage.local.zip** from the email
- Download **.env** file from the email and paste it on the root folder of the app
- Install [Node.js](https://nodejs.org/en) v18 or above

### Install the app in MS Teams

(This needs to be done once only)

1. In MS Teams, click on **Apps**
2. Then click on **Manage your apps**
3. Then click on **Upload an app**
4. Then click on **Upload a custom app**
5. Select the **appPackage.local.zip**
6. Wait for the app details to load, then click on **Add**

### Install the app dependencies

(This needs to be done once only)

1. Open a terminal on the root folder of the app
2. Run the command `npm install`

### Run the app

(This needs to be done everytime)

1. Run the Backend API (follow the README file from the other repository)
2. Open a terminal on the root folder of the app
3. Run the command `git checkout dev` to switch to the `dev` branch
4. Run the command `npm run dev` to start the app
5. Go to MS Teams, and click the app **CP Order Platform - local**

## How to deploy changes to production

1. Run the command `git checkout master` to switch to the `master` (production) branch
2. Run the command `git merge dev` to merge the changes from `dev` to `master` branch
3. Run the command `git push` to push the changes to the `master` branch.

This will trigger a GitHub Action that will automatically deploy the changes to the cloud. The progress of the GitHub Action can be monitored on the **Actions** tab in the GitHub repo.

If the GitHub Action job fails, the usual suspect is there's not enough storage in the App Service file system. To fix this:

1. Go to the [azure portal](https://portal.azure.com/).
2. Login using your Cotton Prompt account
3. Go to **App Services**
4. Click on **cottonpromptapp-prod**
5. Under **Development Tools**, click on **SSH**
6. Click on **Go ->**
7. This will open a new tab, wait for the terminal to load
8. Run the command `cd site/wwwroot/.next/cache`
9. Then run the command `rm -rf images`, this will clear up the cached images
10. Wait for the command to finish
11. Then go back to the **Actions** tab in the GitHub repo, and rerun the failed job

### Updating the Database

If the update contains database changes, you can get the Production database connection string/credentials here:

1. Go to the [azure portal](https://portal.azure.com/).
2. Login using your Cotton Prompt account
3. Go to **App Services**
4. Click on **cottonpromptapi-prod**
5. Under **Settings**, click on **Environment variables**
6. Then click on the **Connection strings** tab
7. Then click on **Show value** button in the **DefaultConnection**

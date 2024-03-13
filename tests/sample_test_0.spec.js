const { test, expect } = require("@playwright/test");
const { LoginPageObject } = require("../utils/modules/login-pageObject");
const { PostNewsFeed } = require("../utils/api/post-newsFeed.js");
const { PostLogin } = require("../utils/api/post-login.js");
const { PostAdmin } = require("../utils/api/post-admin.js");
const { NewsFeedPageObject } = require("../utils/modules/newsFeed-pageObject");
const playwright = require("@playwright/test");
const axios = require("axios");
const { ENV } = require("../utils/setup/env");

const testData = require("../test-data/test-data.json");

test.describe("UI Automation", () => {
  let page,
    envUtil,
    loginPageObject,
    context,
    projectsApi,
    token,
    projectId,
    userMgmtApi,
    userDetails;

  test.beforeEach(async ({ browser }) => {
    envUtil = new ENV();

    context = await browser.newContext({
      httpCredentials: {
        username: envUtil.getHttpCredentialsUsername(),
        password: envUtil.getHttpCredentialsPassword(),
      },
      //   viewport: { width: 1920, height: 1080 },
    });
    page = await context.newPage();

    loginPageObject = new LoginPageObject(page);

    token = await loginPageObject.loginAs(envUtil.getUserToken());
  });

  test("Sample test", async () => {
    await test.step("Clicking on the header urls", async () => {
      const url_newsFeed = `${envUtil.getBaseUrl()}/news-feed`;
      const url_photos = `${envUtil.getBaseUrl()}/photos`;
      const url_videos = `${envUtil.getBaseUrl()}/videos`;
      const url_ourPeople = `${envUtil.getBaseUrl()}/our-people`;
      const url_admin = `${envUtil.getBaseUrl()}/admin`;
      const url_pim = `${envUtil.getBaseUrl()}/personnel-information-management`;

      await test.step("Given I am on the News Feed Page", async () => {
        await page.goto(envUtil.getBaseUrl());
      });

      await test.step("Clicking on the header urls", async () => {});
    });
  });

  test("Handling Inputs", async () => {
    const section_whatsOnYourMind = `//div[@data-testid="create-post"]`;
    const textarea_postContent = `//textarea[@data-testid="create-post-content"]`;
    const button_post = `//button[@data-testid="create-new-post-button"]`;
    const label_postContentText = `//p[@data-testid="news-feed-post-content"]`;

    await test.step("Given I am on the News Feed Page", async () => {
      await page.goto(envUtil.getBaseUrl());
    });

    await test.step("Display the create post modal", async () => {
      await page.locator(section_whatsOnYourMind).click();
    });

    await test.step("Type a newsfeed content", async () => {
      await page
        .locator(textarea_postContent)
        .type(
          "Kane Erryl Castillano - Software Engineer Intern from Angeles University Foundation"
        );
    });

    await test.step("Click the post button", async () => {
      await page.locator(button_post).click();
      await expect(page.locator(button_post)).toBeHidden();
    });

    await test.step("Assert the news feed content", async () => {
      await expect(page.locator(label_postContentText).nth(0)).toBeVisible();
      await expect(page.locator(label_postContentText).nth(0)).toContainText(
        "Kane Erryl Castillano - Software Engineer Intern from Angeles University Foundation"
      );
      await page.pause(6);
    });
  });

  test("Taking Screenshots", async () => {
    const section_whatsOnYourMind = `//div[@data-testid="create-post"]`;
    const textarea_postContent = `//textarea[@data-testid="create-post-content"]`;
    const button_post = `//button[@data-testid="create-new-post-button"]`;
    const label_postContentText = `//p[@data-testid="news-feed-post-content"]`;

    await test.step("Given I am on the News Feed Page", async () => {
      await page.goto(envUtil.getBaseUrl());
    });

    await test.step("Display the create post modal", async () => {
      await page.locator(section_whatsOnYourMind).click();
    });

    await test.step("Type a newsfeed content", async () => {
      await page
        .locator(textarea_postContent)
        .type(
          "Kane Erryl Castillano - Software Engineer Intern from Angeles University Foundation"
        );
    });

    await test.step("Click the post button", async () => {
      await page.locator(button_post).click();
      await expect(page.locator(button_post)).toBeHidden();
    });

    await test.step("Assert the news feed content", async () => {
      await expect(page.locator(label_postContentText).nth(0)).toBeVisible();
      await expect(page.locator(label_postContentText).nth(0)).toContainText(
        "Kane Erryl Castillano - Software Engineer Intern from Angeles University Foundation"
      );
      await page.pause(6);
    });

    await page.screenshot({ path: "screnshots/screenshot1.png" });
  });

  test("Utilizing Page Object Model", async () => {
    const newsFeedPageObject = new NewsFeedPageObject(page);

    await test.step("Given I am on the News Feed Page", async () => {
      await page.goto(envUtil.getBaseUrl());
    });

    await test.step("Create Post Content", async () => {
      await newsFeedPageObject.createNewsFeedPost(testData.sampleInput);
    });

    await test.step("Assert the news feed content", async () => {
      await expect(
        page.locator(newsFeedPageObject.label_postContentText).nth(0)
      ).toBeVisible();
      await expect(
        page.locator(newsFeedPageObject.label_postContentText).nth(0)
      ).toContainText(testData.sampleInput);
      await page.pause(6);
    });

    await page.screenshot({ path: "screnshots/screenshot1.png" });
  });

  test("Create Scheduled Post Modal", async () => {
    const newsFeedPageObject = new NewsFeedPageObject(page);

    await test.step("Given I am on the News Feed Page", async () => {
      await page.goto(envUtil.getBaseUrl());
    });

    await test.step("Create Post Modal is open", async () => {
      await newsFeedPageObject.createScheduledNewsFeedPost(
        testData.sampleInput
      );
    });
  });

  test("Check Scheduled Tab", async () => {
    const newsFeedPageObject = new NewsFeedPageObject(page);

    await test.step("Given I am on the News Feed Page", async () => {
      await page.goto(envUtil.getBaseUrl());
    });

    await test.step("Check Scheduled Post", async () => {
      await newsFeedPageObject.goToScheduledPost();
    });

    await page.pause(6);
  });

  test("Create Photo Post", async () => {
    const newsFeedPageObject = new NewsFeedPageObject(page);

    await test.step("Given I am on the News Feed Page", async () => {
      await page.goto(envUtil.getBaseUrl());
    });

    await test.step("Create Photo post", async () => {
      await newsFeedPageObject.createPhoto(testData.sampleInput);
    });

    // await test.step("Assert the news feed content", async () => {
    //   await expect(
    //     page.locator(newsFeedPageObject.label_postContentText).nth(0)
    //   ).toBeVisible();
    //   await expect(
    //     page.locator(newsFeedPageObject.label_postContentText).nth(0)
    //   ).toContainText(testData.sampleInput);
    //   await page.pause(6);
    // });
  });
});

test.describe("API Automation", () => {
  let page,
    envUtil,
    loginPageObject,
    context,
    projectsApi,
    token,
    projectId,
    userMgmtApi,
    userDetails;

  test.beforeEach(async ({}) => {
    envUtil = new ENV();
  });

  test("Creating News feed post via API", async () => {
    const request = await playwright.request.newContext();
    const postLoginApi = new PostLogin();
    let accessToken;

    await test.step("Clicking on the header urls", async () => {
      accessToken = await postLoginApi.postAdmin(envUtil.getUserToken());
      console.log(accessToken);
    });

    await test.step("Create news-feed post from API", async () => {
      const response = await request.post(
        `${envUtil.getApiBaseUrl()}/twisthrm/api/v1/new-newsfeed/create`,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
          data: {
            content: "Hello from Kane Erryl",
            groupId: "development",
            postType: "standard",
          },
        }
      );
      expect(response.status()).toBe(200);
    });
  });

  test("Validating Responses", async () => {
    const request = await playwright.request.newContext();
    const postLoginApi = new PostLogin();
    let accessToken, response;

    await test.step("Clicking on the header urls", async () => {
      accessToken = await postLoginApi.login(envUtil.getUserToken());
      console.log(accessToken);
    });

    await test.step("Create news-feed post from API", async () => {
      response = await request.post(
        `${envUtil.getApiBaseUrl()}/twisthrm/api/v1/new-newsfeed/create`,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
          data: {
            content: "Hello from Kane Erryl",
            groupId: "development",
            postType: "standard",
          },
        }
      );
      expect(response.status()).toBe(200);
    });

    await test.step("Assert API response values", async () => {
      expect(response.status()).toBe(200);

      const responseJson = await response.json();

      console.log(responseJson);

      expect(responseJson.message).toBe("Successfully created post");
      expect(responseJson.result.firstName).toBe("Kane Erryl");
      expect(responseJson.result.lastName).toBe("CASTILLANO");
      expect(responseJson.result.content).toBe("Hello from Kane Erryl");
    });
  });

  test("Utilizing Page Object Model", async () => {
    const request = await playwright.request.newContext();
    const postLoginApi = new PostLogin();
    const postNewsFeedApi = new PostNewsFeed();
    let accessToken, response;

    await test.step("Clicking on the header urls", async () => {
      accessToken = await postLoginApi.login(envUtil.getUserToken());
      console.log(accessToken);
    });

    await test.step("Create news-feed post from API", async () => {
      response = await postNewsFeedApi.postNewsFeed(
        accessToken,
        "Hello from Kane Erryl"
      );
    });

    await test.step("Assert API response values", async () => {
      expect(response.status()).toBe(200);

      const responseJson = await response.json();

      console.log(responseJson);

      expect(responseJson.message).toBe("Successfully created post");
      expect(responseJson.result.firstName).toBe("Kane Erryl");
      expect(responseJson.result.lastName).toBe("CASTILLANO");
      expect(responseJson.result.content).toBe("Hello from Kane Erryl");
    });
  });

  test.only("Adding Skill", async ({}) => {
    const request = await playwright.request.newContext();
    const adminLoginApi = new PostAdmin();

    const accessToken = await adminLoginApi.postAdmin(envUtil.getUserToken());

    await test.step("Add skill from API", async () => {
      const response = await request.post(
        `${envUtil.getApiBaseUrl()}/twisthrm/api/v1/skill/create`,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
          data: {
            name: "Kane Castillano",
          },
        }
      );
      expect(response.status()).toBe(200);
    });
  });
});

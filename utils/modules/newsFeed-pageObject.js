const { expect } = require("@playwright/test");
const playwright = require("@playwright/test");
const { ENV } = require("../setup/env");

const envUtil = new ENV();
const path = require("path");

class NewsFeedPageObject {
  constructor(page) {
    this.page = page;
    this.section_whatsOnYourMind = `//div[@data-testid="create-post"]`;
    this.textarea_postContent = `//textarea[@data-testid="create-post-content"]`;
    this.button_post = `//button[@data-testid="create-new-post-button"]`;
    this.label_postContentText = `//p[@data-testid="news-feed-post-content"]`;
    this.button_time = `//button[@aria-label="Open"]`;
    this.schedule_button = `//div[@aria-label="Schedule"]`;
    this.schedule_tab = `//div[@class="MuiTabs-flexContainer css-k008qs"]//child::button[2]`;
    this.attach_photo = `//div[@aria-label="Attach Photo"]`;
    this.upload_photo = `//label[@for="mediaFileUpload"]`;
    this.create_album = `//div[@class="MuiAutocomplete-root css-18nc3u2"]`;
    this.post_album = `//div[@class="ml-auto flex gap-4"]//child::button[2]`;
  }

  async createNewsFeedPost(postInput) {
    await this.page.locator(this.section_whatsOnYourMind).click();
    await this.page.locator(this.textarea_postContent).type(postInput);
    await this.page.locator(this.button_post).click();
    await expect(this.page.locator(this.button_post)).toBeHidden();
  }

  async createScheduledNewsFeedPost(postInput) {
    await this.page.locator(this.section_whatsOnYourMind).click();
    await this.page.locator(this.textarea_postContent).type(postInput);
    await this.page.locator(this.schedule_button).click();
    await this.page.locator(this.button_time).click();
    await this.page.keyboard.press("ArrowUp");
    await this.page.keyboard.press("Enter");
    await this.page.locator(this.button_post).click();
    await expect(this.page.locator(this.button_post)).toBeHidden();
    //
    // await this.page.mouse.move(-100, -150);
    // await this.page.waitForTimeout(500);
    // await this.page.mouse.click(0, 0);
    //
  }

  async goToScheduledPost() {
    await this.page.locator(this.schedule_tab).click();
  }

  async createPhoto(postInput) {
    await this.page.locator(this.section_whatsOnYourMind).click();
    await this.page.locator(this.textarea_postContent).type(postInput);
    await this.page.locator(this.attach_photo).click();
    await this.page
      .locator(this.upload_photo)
      .setInputFiles(path.join(__dirname, "screenshot1.png"));
    await this.page.locator(this.button_post).click();
    await this.page.locator(this.create_album).click();
    await this.page.keyboard.press("ArrowDown");
    await this.page.keyboard.press("Enter");
    await this.page.locator(this.post_album).click();
  }

  // async loginAs(userToken) {
  //   const token = await this.postLoginAndFetchUserAccessToken(userToken);
  //   this.page.addInitScript((value) => {
  //     window.localStorage.setItem("auth-token", value);
  //   }, token);

  //   return token;
  // }

  // async postLoginAndFetchUserAccessToken(userToken) {
  //   const request = await playwright.request.newContext();

  //   const response = await request.post(`${envUtil.getApiBaseUrl()}/twisthrm/api/v1/user/login`, { data: { token: userToken } });

  //   expect(response.status()).toBe(200);
  //   const responseJSON = await response.json();
  //   const accessToken = responseJSON.accessToken;

  //   return accessToken;
  // }

  // await this.page.locator(this.button_post).click();
  // await expect(this.page.locator(this.button_post)).toBeHidden();
}

module.exports = { NewsFeedPageObject };

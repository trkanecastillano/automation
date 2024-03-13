const { expect } = require("@playwright/test");
const playwright = require("@playwright/test");
const { ENV } = require("../setup/env");

const envUtil = new ENV();

class PostNewsFeed {
  constructor(page) {
    
  }

  async postNewsFeed(accessToken, contentInput) {
    const request = await playwright.request.newContext();

    const response = await request.post(`${envUtil.getApiBaseUrl()}/twisthrm/api/v1/new-newsfeed/create`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      data: { content: contentInput, groupId: "staging", postType: "standard" },
    });

    return response;
  }
}

module.exports = { PostNewsFeed };

const { expect } = require("@playwright/test");
const playwright = require("@playwright/test");
const axios = require("axios");
const { ENV } = require("../setup/env");

const envUtil = new ENV();

class PostAdmin {
  constructor(page) {}

  async postAdmin(accessToken) {
    const request = await playwright.request.newContext();

    const response = await request.post(
      `${envUtil.getApiBaseUrl()}/twisthrm/api/v1/skill/create`,
      {
        headers: { Authorization: `Bearer ${accessToken}` },
        data: {
          name: "Kane Castillano",
        },
      }
    );

    return response;
  }
}

module.exports = { PostAdmin };

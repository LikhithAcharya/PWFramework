class HomePage {
    constructor(page) {
        this.page = page;
        this.Username = '#user-name';
        this.Password = '#password';
        this.LogInButton = '#login-button';
    }

    async gotoLoginPage(URL) {
        await this.page.goto(URL);
    }

    async Login(username, password) {
        await this.page.locator(this.Username).fill(username);
        await this.page.locator(this.Password).fill(password);
        await this.page.locator(this.LogInButton).click();
    }
}

module.exports = { HomePage };
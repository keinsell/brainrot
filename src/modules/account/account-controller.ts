import { faker } from "@faker-js/faker";
import { Controller, Get, Inject } from "@nestjs/common";
import { AccountService } from "./account-service.ts";

@Controller("account")
export class AccountController {
  constructor(
    @Inject(AccountService)
    private accountService: AccountService
  ) {}

  @Get("/")
  async generateRandomAccount() {
    const username = faker.internet.email();
    const password = faker.internet.password();

    const maybeAccount = await this.accountService.register(username, password);

    if (maybeAccount.isOk()) {
      return maybeAccount.unwrap();
    }

    throw maybeAccount.unwrapErr();
  }
}

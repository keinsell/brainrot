import { Injectable, Logger } from "@nestjs/common";
import { Account } from ".prisma/client";
import { Err, Ok, Result } from "oxide.ts";
import { PrismaService } from "../../infrastructure/database/prisma/prisma-service.ts";
import { AccountError } from "./account-error.ts";

@Injectable()
export class AccountService {
  private logger: Logger = new Logger(this.constructor.name);

  constructor(private readonly prisma: PrismaService) {}

  async register(
    email: string,
    password: string
  ): Promise<Result<Account, typeof AccountError.CouldNotSaveAccount>> {
    let account: Account;

    try {
      account = await this.prisma.account.create({
        data: {
          username: email,
          password,
        },
      });

      this.logger.log("Account successfully saved in database.");
    } catch (e) {
      this.logger.error(
        `Error while trying to save account in database: ${e.message}`
      );
      return Err(AccountError.CouldNotSaveAccount);
    }

    return Ok(account);
  }
}

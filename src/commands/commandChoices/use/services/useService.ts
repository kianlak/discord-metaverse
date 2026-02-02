import { UseRepository } from "../repository/useRepsository.js";

export class UseService {
  constructor(
    private readonly repo = new UseRepository()
  ) {}

  addBalehBucks(discordId: string,delta: number): void {
    this.repo.addBalehBucksByDiscordId(discordId, delta);
  }
}

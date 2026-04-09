import { SettingRepository } from "../repositories/setting.repository";

export class SettingService {
  static async getAllSettings() {
    return await SettingRepository.findAll();
  }

  static async updateSettings(settings: Record<string, string>) {
    for (const [key, value] of Object.entries(settings)) {
      await SettingRepository.upsert(key, value);
    }
    return true;
  }
}

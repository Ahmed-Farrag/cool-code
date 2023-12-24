import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from './user.entity';
import {
  Builder,
  By,
  until,
  Capabilities,
  WebDriver,
} from 'selenium-webdriver';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async createUser(user: User): Promise<User> {
    if (user.linkedInUrl) {
      const linkedInProfile = await this.getLinkedInProfileInfo(
        user.linkedInUrl,
      );
      if (linkedInProfile) {
        const { name, photoUrl } = linkedInProfile;
        user.linkedInName = name;
        user.linkedInPhotoUrl = photoUrl;
      } else {
        console.error('Failed to retrieve LinkedIn profile information.');
      }
    }

    const hashedPass = await bcrypt.hash(user.password, 10);
    user.password = hashedPass;

    return this.userRepository.save(user);
  }

  private async getLinkedInProfileInfo(
    linkedInUrl: string,
  ): Promise<{ name: string; photoUrl: string } | null> {
    let driver: WebDriver | null = null;

    try {
      const capabilities = Capabilities.chrome();

      driver = await new Builder()
        .forBrowser('chrome')
        .withCapabilities(capabilities)
        .build();

      await driver.get(linkedInUrl);
      await driver.wait(until.titleContains('LinkedIn'));

      const nameElement = await driver.wait(
        until.elementLocated(
          By.xpath('//h1[contains(@class, "text-heading-")]'),
        ),
      );
      await driver.wait(until.elementIsVisible(nameElement));
      const name = await nameElement.getText();

      const photoElement = await driver.findElement(
        By.css('img.pv-top-card-profile-picture__image'),
      );
      await driver.wait(until.elementIsVisible(photoElement));
      const photoUrl = await photoElement.getAttribute('src');

      return { name, photoUrl };
    } catch (error) {
      console.error('Failed to extract LinkedIn profile info:', error);
      return null;
    } finally {
      if (driver !== null) {
        await driver.quit();
      }
    }
  }

  async findOne(email: string): Promise<User | undefined> {
    return this.userRepository.findOne({ where: { email } });
  }

  async validateUser(
    email: string,
    password: string,
  ): Promise<User | undefined> {
    const user = await this.userRepository.findOne({ where: { email } });

    if (user && (await bcrypt.compare(password, user.password))) {
      return { ...user, password: undefined };
    }

    return undefined;
  }

  async findUserById(userId: number): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    return user;
  }
}

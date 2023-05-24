import { Controller, Get, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { Response } from 'express';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/wordpdf')
  async getWordPDF(@Res() res: Response): Promise<void> {
    const template = './src/assets/word_template.odt';
    const filename = 'wordexample.pdf';
    await this.getPDF(res, template, filename);
  }

  @Get('/excelpdf')
  async getExcelPDF(@Res() res: Response): Promise<void> {
    const template = './src/assets/spreadsheet_template.ods';
    const filename = 'excelexample.pdf';
    await this.getPDF(res, template, filename);
  }

  async getPDF(
    res: Response,
    template: string,
    filename: string,
  ): Promise<void> {
    const buffer = await this.appService.getPdf(template, filename);
    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename=${filename}`,
      'Content-Length': buffer.length,
    });
    res.end(buffer);
  }
}

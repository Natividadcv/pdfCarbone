import { Injectable } from '@nestjs/common';
import { readFile } from 'fs/promises';
import { writeFile } from 'fs/promises';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const carbone = require('carbone');

@Injectable()
export class AppService {
  // Data to inject
  data = {
    id: 1,
    date: '16/06/2021',
    company: {
      name: 'InfTec',
      address: 'Schönbühl',
      city: 'Bern',
      postalCode: 3000,
    },
    customer: {
      name: 'ICS protocol',
      address: 'ICS',
      city: 'ICS',
      postalCode: 3000,
    },
    products: [
      { name: 'product 1', priceUnit: 1, quantity: 10, priceTotal: 10 },
      { name: 'product 2', priceUnit: 5, quantity: 20, priceTotal: 100 },
      { name: 'product 3', priceUnit: 10, quantity: 20, priceTotal: 200 },
    ],
    total: 310,
  };
  options = {
    convertTo: 'pdf', //can be docx, txt, ...
  };

  getHello(): string {
    return 'Go to /wordpdf to download word example, go to /excelpdf to download execel example';
  }

  async getPdf(template: string, filename: string): Promise<Buffer> {
    try {
      await this.writePdf(template, filename);
      const pdf = await readFile(filename);
      return pdf;
    } catch (err) {
      console.log(err);
    }
  }

  async writePdf(template: string, filename: string): Promise<void> {
    try {
      await carbone.render(
        template,
        this.data,
        this.options,
        function (err, result) {
          if (err) return console.log(err);
          writeFile(filename, result);
        },
      );
    } catch (err) {
      console.log(err);
    }
  }
}

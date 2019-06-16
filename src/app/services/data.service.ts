import { Injectable } from '@angular/core';
import { sp, SPRest, Items } from '@pnp/sp';
import { environment } from 'src/environments/environment';
import { IClient } from '../models/IClient';
import { IIndustry } from '../models/IIndustry';

const SPHeaders: any = {
  'Accept': 'application/json; odata=verbose',
  'Content-Type': 'application/json; odata=verbose'
};
sp.setup({
  sp: {
    baseUrl: environment.webAbsoluteUrl,
    headers: SPHeaders
  }
});

export interface IDatasService {
  getClients: (listName: string, showActive: boolean) => Promise<IClient[]>;
}

@Injectable({
  providedIn: 'root'
})
export class DataService implements IDatasService {
  commonSP: SPRest;

  constructor() {
    let commonSiteUrl: string;
    if (environment.production) {
      commonSiteUrl = location.origin.concat(environment.commonSiteUrl);
    } else {
      commonSiteUrl = environment.commonSiteUrl;
    }
    this.commonSP = sp.configure(SPHeaders, commonSiteUrl);
  }

  private getAllItems = (items: Items, tickCallback?: (chunk?: any[], allData?: any[]) => void, skip: number = 0, results: any[] = []): Promise<any[]> => {
    return new Promise(resolve => {
      if (skip) {
        items = items.skip(skip);
      }
      items.top(5000).get().then((res: any[]) => {
        if (res.length > 0) {
          results = results.concat(res);
          if (tickCallback && typeof tickCallback === 'function') {
            tickCallback(res, results);
          }
          skip = res[res.length - 1].Id;
          return resolve(this.getAllItems(items, tickCallback, skip, results));
        } else {
          return resolve(results);
        }
      });
    });
  }

  getClients(listName: string, showActive: boolean = true): Promise<IClient[]> {
    const SelectFields: string[] = [
      'Id', 'Title', '*', 'PNIsActive', 'AttachmentFiles,PNEngagementManagerId,PNEngagementManager/Title,PNEngagementManager/EMail,PNEngagementManager/Id,PNIndustry/Id,PNIndustry/Title', 'Modified', 'Created'
    ];
    return new Promise<IClient[]>((resolve: (items: IClient[]) => void, reject: (error: any) => void): void => {
      const clients: IClient[] = new Array<IClient>();

      let listItems: Items = this.commonSP.web.lists.getByTitle(listName).items
        .select(SelectFields.join(','))
        .expand('AttachmentFiles,PNEngagementManager,PNIndustry')
        .orderBy('Id', true);

      if (showActive) {
        listItems = listItems.filter(`PNIsActive eq '1'`);
      }

      this.getAllItems(listItems).then((clientItems: IClient[]) => {
        if (clientItems && clientItems.length > 0) {
          clientItems.forEach((client: any) => {
            const industryIds: number[] = [];
            const industryTitles: string[] = [];
            if (client) {
              if (client.PNIndustry && client.PNIndustry.results && client.PNIndustry.results.length > 0) {
                client.PNIndustry.results.forEach((industry: IIndustry) => {
                  industryIds.push(industry.Id);
                  industryTitles.push(industry.Title);
                });
              }
              client.IndustryId = industryIds;
              clients.push(client);
            }
          });
        }
        resolve(clients);
      }).catch((error: any) => {
        reject(error);
      });
    });
  }
}

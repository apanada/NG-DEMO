import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { distinctUntilChanged, filter, map } from 'rxjs/operators';
import { IBreadCrumb } from './IBreadCrumb';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss']
})
export class BreadcrumbComponent implements OnInit {
  breadcrumbs = this.router.events.pipe(
    filter(event => event instanceof NavigationEnd),
    distinctUntilChanged(),
    map(event => this.buildBreadCrumb(this.activatedRoute.root))
  );

  constructor(private activatedRoute: ActivatedRoute, private router: Router) { }

  ngOnInit() { }

  buildBreadCrumb(route: ActivatedRoute, url: string = '', breadcrumbs: Array<IBreadCrumb> = []): Array<IBreadCrumb> {
    let nextUrl: string;
    let newBreadcrumbs: IBreadCrumb[] = Array<IBreadCrumb>();

    // If no routeConfig is avalailable we are on the root path
    const label = route.routeConfig ? (route.routeConfig.data ? route.routeConfig.data['breadcrumb'] : '') : 'Home';
    const path = route.routeConfig ? route.routeConfig.path : '';

    if (label !== '') {
      // In the routeConfig the complete path is not available,
      // so we rebuild it each time
      nextUrl = `${url}${path}/`;
      const breadcrumb = {
        label: label,
        url: nextUrl,
      };
      newBreadcrumbs = [...breadcrumbs, breadcrumb];
      if (route.firstChild) {
        // If we are not on our current path yet,
        // there will be more children to look after, to build our breadcumb
        return this.buildBreadCrumb(route.firstChild, nextUrl, newBreadcrumbs);
      }
      return newBreadcrumbs;
    } else {
      if (route.firstChild) {
        // If we are not on our current path yet,
        // there will be more children to look after, to build our breadcumb
        newBreadcrumbs = [...breadcrumbs];
        return this.buildBreadCrumb(route.firstChild, nextUrl, newBreadcrumbs);
      }
    }
    return [] as Array<IBreadCrumb>;
  }
}

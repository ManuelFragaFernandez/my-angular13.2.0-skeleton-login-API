import { Component, OnInit } from '@angular/core';
import { filter, map, Subject, takeUntil, tap } from 'rxjs';
import { UtilsService } from 'src/app/shared/services/utils.service';
import { pagesData } from './interfaces/pagesData';
import { userData } from './interfaces/userData';
import { usersList } from './interfaces/usersList';
import { UsersService } from './services/users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  public usersData$ = new Subject<userData[]>();
  private pageInfo$ = new Subject<pagesData>();

  public totalUsers!: number;
  public usersPerPage!: number;

  constructor(
    private readonly usersService: UsersService,
    private readonly utilsService: UtilsService
  ) { }

  ngOnInit() {
    this.pageInfo$.subscribe(
      info => this.setPaginatorOptions(info)
    );

    this.getPagesAndUsersData(0);
  }

  private setPaginatorOptions(options: pagesData): void {
    if (options) {
      this.totalUsers = options.total;
      this.usersPerPage = options.per_page;
    }
  }

  public changePage(event: any): void {
    this.getPagesAndUsersData(event.pageIndex + 1);
  }

  private getPagesAndUsersData(page: number): void {
    this.usersService.getUsersList(page).pipe(
      filter((allData: usersList) => allData.data.length !== 0),
      tap(pages => {
        const pageInfo = {
          page: pages.page,
          per_page: pages.per_page,
          total: pages.total,
        };
        this.pageInfo$.next(pageInfo);
      }),
      map((usersList: usersList) => {
        return usersList.data.map(
          user => {
            return {
              email: user.email,
              avatar: user.avatar,
              name: `${user.first_name} ${user.last_name}`
            };
          }
        );
      }),
      tap(usefullData => this.usersData$.next(usefullData))
    )
      .subscribe({
        error: (error) => this.utilsService.openSnackBar(error.message)
      }
      );
  }

}

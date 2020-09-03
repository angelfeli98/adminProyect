import { Component, OnInit } from '@angular/core';
import { UserModel } from '../../../models/user.model';
import { UserService } from '../../../service/user.service';
import { CollectionService } from '../../../service/collections.service';
import { AlertService } from '../../../service/alert.service';
import { Data } from '../../../interfaces/data.interface';
import { ModalImgService } from '../../../service/modal.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styles: [
  ]
})
export class UserComponent implements OnInit {

  public searchField: string;
  private users: UserModel[];
  public results: number;
  private loading: boolean;
  public page: number;
  private field: string;
  public modalImg: Data;

  constructor(
    private userService: UserService,
    private collectionService: CollectionService,
    private alert: AlertService,
    private modalImgService: ModalImgService
  ){
    this.page = 1;
    this.loading = true;
    this.getUsersService();
    this.modalImg = this.modalImgService.getData;
  }

  ngOnInit(): void {
  }

  public getUsersService = (): void => {
    this.searchField = 'user';
    this.userService.getUsers(this.page).subscribe( ({ users, results }) => {
      this.users = users
      this.results = results;
      this.loading = false;
    })
  }

  public pageUsers = (next: boolean): void => {
    next?this.page++:this.page--;
    this.loading = true;
    this.searchField == 'user'?this.getUsersService():'';
  }

  public search = (field: string): void => {
    this.loading = true;
    this.field = field;
    this.page = 1;
    if(field.length > 0)
      this.searchUsers(this.field);
    else
      this.getUsersService();

  }

  private searchUsers = (field: string): void => {
    this.searchField = 'collection';
    this.collectionService.getCollectionByName('user', field, this.page, 20)
                            .subscribe( ({noResults, results}) => {
                                this.users = results.map( (user: any) => {
                                  const newUser = new UserModel('', '', '');
                                  newUser.setData = user;
                                  return newUser;
                                })
                                this.results = noResults;
                                this.loading = false;
                            })
  }

  public deleteUser = async(user: UserModel, index: number): Promise<void> => {
    const text = `You are to delete ${user.email}`
    if(user.id == this.userService.user.id)
      return this.alert.makeNotification('Warning', 'warning', 'You can not to delete yourself');

    const result = await this.alert.makeQustion(text);
    if(result.value){
      const userToDelete = this.users.splice(index, 1)[0];
      this.userService.deleteUser(userToDelete.id)
                      .subscribe(res =>{
                        this.alert.makeNotification('Success', 'success', 'The user has been deleted')
                        this.results--;
                      })
    }
  }

  public changeRole = (value: string, user: UserModel): void => {
    user.role = value;
    this.userService.updateUser(user.getData, false, user.id)
                    .subscribe( res => {},
                                error => this.alert.makeNotification('Ops..', 'error', 'Somethig is bad')
                    )
  }

  public startModal = (user: UserModel): void => {
    this.modalImg.show = true;
    this.modalImg.user = user;
    this.modalImg.type = 'user';
  }

  public get getUsers(): UserModel[]{
    return this.users;
  }

  public get getLodin(): boolean{
    return this.loading;
  }

}

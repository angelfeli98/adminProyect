import { Component, OnInit, Input } from '@angular/core';
import { UserModel } from 'src/app/models/user.model';
import { Data } from '../../interfaces/data.interface';
import { ModalImgService } from '../../service/modal.service';
import { FileService } from '../../service/file.service';
import { AlertService } from '../../service/alert.service';

@Component({
  selector: 'app-image-modal',
  templateUrl: './image-modal.component.html',
  styles: [
  ]
})
export class ImageModalComponent implements OnInit {

  private data: Data;
  private newPhoto: any;

  constructor(
    private modalImg: ModalImgService,
    private fielService: FileService,
    private alert: AlertService
  ){
    this.data = this.modalImg.getData;
  }

  ngOnInit(): void {
  }

  public get getData(): Data{
    return this.data;
  }

  public closeModal = (): void => {
    this.data.show = false;
  }

  public showNewImage = async(files: FileList): Promise<any> => {
    if(files.length == 0)
      return null;
    const file = files.item(0);
    const data = file.slice(0);
    const reader = new FileReader();
    reader.readAsDataURL(data);
    reader.onloadend = (): void => {
        const result = reader.result;
        this.newPhoto = result;
    }
  }

  public updateImg = (file: FileList): any => {
    if(file.length == 0)
      return null;

    const newPhoto = file.item(0);
    this.fielService.uploadImge(newPhoto, this.data.type, this.data.user.id, false)
                    .subscribe( ({ result }) =>  {
                      this.data.user.img = result.img;
                      this.data.show = false
                    },
                      error => this.alert.makeNotification('Ops...', 'error', 'Somethin is bad')
                    );
  }

  public get getImg(): string{
    return this.newPhoto || this.data.user.getImg;
  }

}


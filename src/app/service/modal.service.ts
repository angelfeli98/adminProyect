import { Injectable } from '@angular/core';
import { Data } from '../interfaces/data.interface';

@Injectable({
    providedIn: 'root'
})
export class ModalImgService{

    private data: Data;

    constructor(){
        this.data = {
            show: false
        }
    }

    public get getData(): Data{
        return this.data;
    }

    public set setData(data: Data){
        this.data = data;
    }
}
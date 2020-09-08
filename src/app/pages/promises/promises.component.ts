
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-promises',
    templateUrl: './promises.component.html'
})
export class PromisesComponent implements OnInit{

    public ngOnInit(){
        // const promise = new Promise<any>((resolve, reject) => {
        //     reject('Hola mundo');
        // })

        // promise.then(console.log)
        //         .catch(console.log)

        this.getUsuarios().then(users => console.log(users['data']))
    }

    private getUsuarios = (): Promise<string> =>{
        return fetch('https://reqres.in/api/users?page')
                .then( response => response.json());
    }

}
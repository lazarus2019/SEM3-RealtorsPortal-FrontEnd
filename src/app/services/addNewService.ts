import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
@Injectable()
export class AddNewService implements CanActivate  {
    canActivate() {
 // XXXXXXX
        return false;
    }
}
import { Component } from '@angular/core';
declare var alertFunction: any;

@Component({
  templateUrl: './template.component.html'
})
export class TemplateComponent {


  test_success_alert(){
    alertFunction.success("Your messenge");
  }
  
  test_error_alert(){
    alertFunction.error("Your messenge");
  }
}

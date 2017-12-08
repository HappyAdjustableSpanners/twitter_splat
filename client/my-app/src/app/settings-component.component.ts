import { TwitterHandleService } from './services/twitter-handle.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'settings',
  templateUrl: './settings-component.component.html',
  styleUrls: ['./settings-component.component.css']
})
export class SettingsComponentComponent implements OnInit {

  constructor(private handleService: TwitterHandleService) {
    this.handleService.getTwitterHandles().subscribe( res => { this.handleList = res; console.log(res); });

    this.handleService.handlesChanged.subscribe( () => {
      this.handleService.getTwitterHandles().subscribe( res => { this.handleList = res; console.log(res);
      });
    });
   }

  handle: string;
  handleList: any[] = [];
  btnState = 'good';

  ngOnInit() {
  }

  addHandle(event)
  {
    event.preventDefault();

    // construct a handle object
    const newHandle = { handle: this.handle, state: this.btnState };

    // Check if handle already exists
   {

      for( let i = 0; i < this.handleList.length; i++ )
      {
        if (this.handleList[i].handle === newHandle.handle) {
          console.log("Handle already exists");
          return;
        }
      }

    // post handle
    this.handleService.PostTwitterHandle(newHandle);
  }
}

  deleteTask(id)
  {
    this.handleService.DeleteTwitterHandle(id);
  }
  
  btnBadClicked()
  {
    this.btnState = 'bad';
  }

  btnGoodClicked()
  {
    this.btnState = 'good';
  }

}

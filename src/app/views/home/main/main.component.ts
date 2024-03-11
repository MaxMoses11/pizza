import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {map, Subject, Subscription} from "rxjs";
import {PopupComponent} from "../../../shared/components/popup/popup.component";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.less']
})
export class MainComponent implements OnInit, OnDestroy, AfterViewInit {
  private subscription: Subscription | null = null;
  private subject: Subject<number>;
  constructor() {
    this.subject = new Subject<number>();
    let count = 0;
    setInterval(() => {
      this.subject.next(count++);
    }, 1000);
    setTimeout(() => {
      this.subject.complete();
    }, 4000);
  }


  ngOnInit() {
    //подписка на subject объект
    this.subscription = this.subject
      .subscribe(
      {
        next: (param: number) => {
          console.log('sub1: ', param);
        },
        error: (error: string) => {
          console.log('ERROR!!!!: ' + error);
        }
      }
      );
  }

  @ViewChild(PopupComponent)
  private popupComponent!: PopupComponent;

  ngAfterViewInit() {
    this.popupComponent.open();
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }

  test() {
    this.subject
      .pipe(
        map((num) => {
          return 'Число: ' + num
        })
      )
      .subscribe((param: string) => {
      console.log('sub2: ', param);
    });
  }
}

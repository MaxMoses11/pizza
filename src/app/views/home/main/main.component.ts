import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {map, Subject, Subscription} from "rxjs";
import {PopupComponent} from "../../../shared/components/popup/popup.component";
import {environment} from "../../../../environments/environment";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.less']
})
export class MainComponent implements OnInit, OnDestroy, AfterViewInit {
  // private observable: Observable<number>;
  private subscription: Subscription | null = null;
  private subject: Subject<number>;
  constructor() {
    this.subject = new Subject<number>();
    let count = 0;
    const interval = setInterval(() => {
      this.subject.next(count++);
    }, 1000);
    const timeout1 = setTimeout(() => {
      this.subject.complete();
    }, 4000);
    //создание observable объекта
    // this.observable = from([1,2,3,4,5]);

    // this.observable = new Observable((observer) => {
    //   let count = 0;
    //   const interval = setInterval(() => {
    //     observer.next(count++);
    //   }, 1000);
    //   const timeout1 = setTimeout(() => {
    //     observer.complete();
    //   }, 4000);
    //   const timeout2 = setTimeout(() => {
    //     observer.error('ERROROROROROR');
    //   }, 5000);
    //   return {
    //     unsubscribe() {
    //       clearInterval(interval);
    //       clearTimeout(timeout1);
    //       clearTimeout(timeout2);
    //     }
    //   }
    // });
  }


  ngOnInit() {
    console.log(environment.production);

    // const myModal = new bootstrap.Modal(document.getElementById('myModal'));
    // myModal.show();

    //подписка на observable объект
    // this.subscription = this.subject
    //   .subscribe(
    //   {
    //     next: (param: number) => {
    //       console.log('sub1: ', param);
    //     },
    //     error: (error: string) => {
    //       console.log('ERROR!!!!: ' + error);
    //     }
    //   }
    //   );
  }

  @ViewChild(PopupComponent)
  private popupComponent!: PopupComponent;

  ngAfterViewInit() {
    // this.popupComponent.open();
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

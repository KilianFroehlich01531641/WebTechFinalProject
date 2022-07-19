import { Component, ElementRef, EventEmitter, HostListener, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DbItem } from 'src/app/model/Item';
import { DataBaseService } from 'src/app/services/data-base.service';
import { Location } from '@angular/common'

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {
  @Input() dbitem!: DbItem;
  @Output() onCommit: EventEmitter<MouseEvent> = new EventEmitter();
  @Output() enterEdited: EventEmitter<MouseEvent> = new EventEmitter();
  @Output() exitEdited: EventEmitter<MouseEvent> = new EventEmitter();

  @ViewChild('input') input!: ElementRef;
  inputElement!: HTMLInputElement;


  readonly: boolean = true;

  constructor(private databaseservice: DataBaseService, private activatedRoute: ActivatedRoute, private router: Router, private location: Location) { }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.inputElement = this.input.nativeElement;
    this.activatedRoute.fragment.subscribe(res => this.jumpTo(res)); //TODO tried to move it to itemlist.component; but Init() methods did not reach dom selection
  }

  commit() {
    if (this.dbitem.comment != this.inputElement.value) {
      this.dbitem.comment = this.inputElement.value;
      this.databaseservice.setComment(this.dbitem.itemnumber, this.inputElement.value).subscribe((data) => console.log(data));

      this.onCommit.emit(); //Refresh //TODO probably not necessary
    }

    this.exit();
  }

  reset() {
    this.inputElement.value = this.dbitem.comment;
    this.exit();
  }

  exit() {
    this.readonly = true;
    this.inputElement.blur();
    this.exitEdited.emit();
  }

  inside = false;

  @HostListener("click")
  componentClicked() {
    this.inside = true;
  }

  // effectively: when clicked outside of the componen => reset()
  @HostListener("document:click")
  domClicked() {
    if (!this.inside) this.reset();
    this.inside = false;
  }


  //scroll to url fragment
  jumpTo(fragment: string | null) {
    if (fragment != null && this.getItemListItem(parseInt(fragment))) {
      this.getItemListItem(parseInt(fragment))?.scrollIntoView({ behavior: "smooth" });

      this.router.navigateByUrl("/kitchen/items") //location.replaceState better version //, {skipLocationChange: true}
      this.location.replaceState('/kitchen/items'); //TODO still weird behaving when adding fragment by hand
      //TODO make sure navigating back works
    }
  }

  //returns the element with a certain itemnumber
  getItemListItem(itemnumber: number): HTMLDivElement | null {
    let div: HTMLElement | null | undefined = null;

    (document.querySelectorAll('.item-list-item .itemnumber') as NodeListOf<HTMLDivElement>).forEach((element) => {
      if (element.textContent != null)
        if (element.textContent != null && parseInt(element.textContent.match(/\d+/)?.shift() || "") == itemnumber) {
          div = element.parentElement;
        }
    })

    return div == null || div == undefined ? null : div;
  }


}

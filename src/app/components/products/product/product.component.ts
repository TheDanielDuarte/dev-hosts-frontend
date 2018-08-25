import { Component, OnInit, Input, Output, EventEmitter, ElementRef, Renderer2, HostListener } from '@angular/core';
import { ProductsCommunicationService } from '@services/products-communication.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  @Input() public fields: string[];
  @Input() public title: string;
  @Input() public price: number;
  @Input() public data: any;
  @Input() public productId: string;
  @Input() public userIsLoggedIn: boolean;
  @Output() private activate = new EventEmitter();
  @Output() private deactivate = new EventEmitter();
  @Output() public purchased = new EventEmitter();
  @Output() public addedToCart = new EventEmitter();
  public layout$: Observable<any>;
  public previewFields: string[];
  private remainingFields: number;
  private active = false;
  private shadowed = false;

  constructor(
    private productsCommunication: ProductsCommunicationService,
    private element: ElementRef,
    private renderer: Renderer2
  ) { }

  public ngOnInit() {
    this.layout$ = this.productsCommunication.onNewLayout();
    this.previewFields = this.fields.slice(0, 3);
  }

  public getRemainingFields() {
    if (!this.remainingFields) {
      this.remainingFields = this.fields.length - this.previewFields.length;
    }

    return this.remainingFields;
  }

  public toggleActive() {
    if (this.active) {
      this.renderer.removeClass(this.element.nativeElement, 'active');
      this.deactivate.emit();
    } else {
      this.renderer.addClass(this.element.nativeElement, 'active');
      this.activate.emit();
    }
    this.active = !this.active;
  }

  public toggleShadowMode() {
    if (this.shadowed) {
      this.renderer.removeClass(this.element.nativeElement, 'shadowed');
    } else {
      this.renderer.addClass(this.element.nativeElement, 'shadowed');
    }
    this.shadowed = !this.shadowed;
  }

  public get isShadowed() { return this.shadowed; }
  public get isActive() { return this.active; }
}

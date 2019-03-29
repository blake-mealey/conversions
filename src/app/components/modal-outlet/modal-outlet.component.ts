import {
  AfterViewInit,
  Component,
  ComponentFactoryResolver, ComponentRef, ElementRef, OnInit,
  QueryList,
  ViewChildren
} from '@angular/core';
import { ComponentModel, ModalService } from '../../services/modal.service';
import { ModalOutletHostDirective } from './modal-outlet-host.directive';
import { ModalComponent } from './modal-component';
import { SubscriberComponent } from '../../../app-common/components/subscriber-component';

@Component({
  selector: 'modal-outlet',
  styleUrls: [
    './modal-outlet.component.scss'
  ],
  templateUrl: './modal-outlet.component.pug'
})
export class ModalOutletComponent extends SubscriberComponent implements OnInit, AfterViewInit {
  public componentModel: ComponentModel;

  @ViewChildren(ModalOutletHostDirective)
  public modalHosts: QueryList<ModalOutletHostDirective>;

  private modalHost: ModalOutletHostDirective;

  private componentRef: ComponentRef<any>;

  constructor(private elementRef: ElementRef,
              private modalService: ModalService,
              private componentFactoryResolver: ComponentFactoryResolver) {
    super();
  }

  public ngOnInit(): void {
    this.addSubscription(this.modalService.modalComponent$.subscribe((componentModel: ComponentModel) => {
      this.componentModel = componentModel;
      this.loadComponent();
    }));
  }

  public ngAfterViewInit(): void {
    this.updateModalHost(this.modalHosts);
    this.addSubscription(this.modalHosts.changes.subscribe((hosts) => {
      this.updateModalHost(hosts);
    }));
  }

  private updateModalHost(hosts: QueryList<ModalOutletHostDirective>): void {
    this.modalHost = hosts.first;
    this.loadComponent();
  }

  private loadComponent(): void {
    if (!this.componentModel || !this.modalHost) {
      return;
    }

    // Get and clear the view container reference from the modal host directive
    let viewContainerRef = this.modalHost.viewContainerRef;
    viewContainerRef.clear();

    // Get a component factory for the component type
    let componentFactory = this.componentFactoryResolver
      .resolveComponentFactory(this.componentModel.componentType);

    // Create the component on the view container reference and give it the input data
    this.componentRef = viewContainerRef.createComponent(componentFactory);

    // Initialize the component instance
    const componentInstance = (<ModalComponent>this.componentRef.instance);
    componentInstance.data = this.componentModel.data;
    componentInstance.result.subscribe((result: any) => {
      this.modalService.closeModal(result);
    });
  }

  public onOverlayClicked(event) {
    if (!this.componentRef || !this.componentRef.location.nativeElement.contains(event.target)) {
      this.modalService.closeModal();
    }
  }

}

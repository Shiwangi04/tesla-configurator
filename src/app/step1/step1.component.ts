import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModelsService } from '../models/models.service';
import { Observable, Subject, catchError, of } from 'rxjs';
import { Model, ModelList } from '../models/models';
import { FormsModule } from '@angular/forms';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';

@Component({
  selector: 'app-step1',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './step1.component.html',
  styleUrl: './step1.component.scss'
})
export class Step1Component {

  @Input() showStep1Component : Boolean = false;
  modelSelect :  ModelList = {colors: [], code : '', description: ''};
  colorSelect :  Model = {code : '', description: '', price:0 };
  optionsSelected = false;
  imageUrl : SafeUrl = {};
  @Output() isStep2ButtonDisable = new EventEmitter<boolean>();
  selectedChoice ?: Boolean ;
  mainModel = {
    code: '',
    description: ''
  };
  colorModel = {
    code: '',
    description: ''
  };
  @Output() informStep2 = new EventEmitter();
  image ?: Blob;
  checkColor ?: Model[];
  constructor(private route: Router, private modelsService: ModelsService, private sanitizer: DomSanitizer) {}
  error$ = new Subject<string>();
  models$ = this.modelsService.getModels$.pipe(
    catchError((err) => { 
      this.error$.next(err.message);
      return of([]);
    })
  );

  filterSubByCode(description: string) : Observable<Model[] | undefined> {
    return this.modelsService.getModelsByCode(description);
  }

  onOptionsSelected(modelSelect: ModelList) {
    this.mainModel.description = modelSelect.description;
    this.modelSelect = modelSelect;
    this.filterSubByCode(modelSelect.description).forEach((item) => this.checkColor = item);
    this.modelsService.modelListValue.next(this.modelSelect);
    this.modelsService.colorValue.next({code : '', description: '', price:0 });
    this.selectedChoice = true;
    this.imageUrl = '';
    this.isStep2ButtonDisable.emit(true);
  }

  onColorSelected(colorSelect: Model) {
    this.colorModel.description = colorSelect.description;
    this.optionsSelected = true;
    this.loadImageUrl();
    this.informStep2.emit(true);
    this.modelsService.modelCodeValue.next(this.modelSelect.code);
    this.modelsService.colorValue.next(this.colorSelect);  
    this.isStep2ButtonDisable.emit(false);
  }

  loadImageUrl() {
    this.imageUrl = this.modelsService.loadImageHttp(this.modelSelect.code, this.colorSelect.code).subscribe((i) => {
      this.image = i;
      this.imageUrl = this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(this.image));
      this.modelsService.imageUrl.next(this.image);
    });
   
  }
}

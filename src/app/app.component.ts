import {Component} from '@angular/core';
import {AsyncPipe, CommonModule, JsonPipe} from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Step1Component } from './step1/step1.component';
import { Step2Component } from './step2/step2.component';
import { Step3Component } from './step3/step3.component';
import { ModelsService } from './models/models.service';
import { Config, ConfigList } from './configs/configs';
import { Model, ModelList } from './models/models';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { RouterLink, RouterModule } from '@angular/router';

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    imports: [AsyncPipe, JsonPipe, Step1Component, Step2Component, Step3Component, CommonModule, RouterLink, RouterModule],
    providers: [HttpClientModule]
})
export class AppComponent {

  constructor(private modelService: ModelsService, private sanitizer: DomSanitizer) {}
  name = 'Angular';
  modelCode: string = '';
  buttonClicked : string = '';
  configList: ConfigList = {configs: [], towHitch: false, yoke: false};
  image : SafeUrl = {};
  color : Model = {code : '', description: '', price:0 };
  modelList : ModelList = {colors: [], code : '', description: ''};
  config : Config = {id: 0, description: '', price:0, range: 0, speed: 0};
  displayStep1Component: Boolean = false;
  displayStep2Component: Boolean = false;
  displayStep3Component: Boolean = false;
  isStep2ButtonDisable: Boolean = true;
  isStep3ButtonDisable: Boolean = true;
  onStep1BtnClick() {
    this.displayStep1Component = true;
    this.displayStep2Component = false;
    this.displayStep3Component = false;
    this.buttonClicked = 'step1';
  }
  onStep2BtnClick() {
    this.displayStep2Component = true;
    this.displayStep1Component = false;
    this.displayStep3Component = false;
    this.modelService.modelCodeValue.subscribe((data) => {
      this.modelCode = data;
    });
    if (this.buttonClicked == 'step1') {
      this.configList = this.modelService.step2Renderer(this.modelCode);
      this.isStep3ButtonDisable = true;
    }
    this.modelService.configValue.subscribe((data) => {
      this.config = data;
    });
    this.modelService.imageUrl.subscribe((data) => {
      this.image = this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(data));
    });
    this.buttonClicked = 'step2';
  }
  isStep2Enabled() {
    this.isStep2ButtonDisable = false;
  }
  isStep3Enabled() {
    this.isStep3ButtonDisable = false;
  }
  setStep2ButtonEnabled(value: Boolean) {
    this.isStep2ButtonDisable = value;
  }

  onStep3BtnClick() {
    this.displayStep3Component = true;
    this.displayStep2Component = false;
    this.displayStep1Component = false;
    this.buttonClicked = 'step3';
    this.modelService.colorValue.subscribe((data) => {
      this.color = data;
    });
    this.modelService.modelListValue.subscribe((data) => {
      this.modelList = data;
    });
    this.modelService.configValue.subscribe((data) => {
      this.config = data;
    });
    this.modelService.imageUrl.subscribe((data) => {
      this.image = this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(data));
    });
  }
}

import { CommonModule } from '@angular/common';
import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ConfigsService } from '../configs/config.service';
import { Observable, Subject, catchError, map, of } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { ModelsService } from '../models/models.service';
import { Config, ConfigList } from '../configs/configs';
import { Router } from '@angular/router';
import { SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-step2',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './step2.component.html',
  styleUrl: './step2.component.scss'
})
export class Step2Component {

  @Input() showStep2Component : Boolean = false;
  configSelect: Config = {id: 0, description: '', price:0, range: 0, speed: 0};
  modelCode: string = '';
  @Input() configList : ConfigList = {configs: [], towHitch: false, yoke: false};
  @Output() informStep3 = new EventEmitter();
  @Input() imageUrl ?: HTMLImageElement;

  constructor(private route: Router, private modelsService: ModelsService) {}

  onSelect(config: Config) {
    this.modelsService.configValue.next(config);
    this.informStep3.emit(true);
  }
   

}

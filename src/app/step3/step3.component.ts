import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Config, ConfigList } from '../configs/configs';
import { Model, ModelList } from '../models/models';
import { SafeUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';

@Component({
  selector: 'app-step3',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './step3.component.html',
  styleUrl: './step3.component.scss'
})
export class Step3Component {
  @Input() showStep3Component : Boolean = false;
  @Input() configList : ConfigList = {configs: [], towHitch: false, yoke: false};
  @Input() modelList : ModelList = {colors: [], code : '', description: ''};
  @Input() color : Model = {code : '', description: '', price:0 };
  @Input() config : Config = {id: 0, description: '', price:0, range: 0, speed: 0};
  @Input() imageUrl : SafeUrl = {};
  price: number = 1000;

  total: number = 0;

  constructor(private route: Router) {}
  calcTotal(price : number, configPrice : number, colorPrice : number) : number {
    return price + configPrice + colorPrice;
  }
}

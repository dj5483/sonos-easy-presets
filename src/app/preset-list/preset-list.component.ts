import { Component, OnInit } from '@angular/core';
import { PresetService } from '../preset.service';
import { Preset } from '../preset';

@Component({
  selector: 'app-preset-list',
  templateUrl: './preset-list.component.html',
  styleUrls: ['./preset-list.component.css']
})
export class PresetListComponent implements OnInit {

  presets: Preset[];

  selectedPreset: Preset;

  constructor(private presetService: PresetService) { }

  ngOnInit() {
    this.getPresets();
  }

  getPresets(): void {
    this.presetService.getPresets()
      .subscribe(presets => this.presets = presets);
  }

  onSelect(preset: Preset): void {
    console.log('preset selected ' + preset.name);
    this.presetService.invokePreset(preset.name);
    this.selectedPreset = preset;
  }

}

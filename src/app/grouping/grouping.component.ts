import { Component, OnInit } from '@angular/core';
import { Group } from './group';
import { GroupService } from './group.service';
import { Player } from '../player/player';
import { PLAYERS } from '../player/mock-players';

@Component({
  selector: 'app-grouping',
  templateUrl: './grouping.component.html',
  styleUrls: ['./grouping.component.css']
})
export class GroupingComponent implements OnInit {

  groups: Group[];

  selectedGroup: Group;

  coordinator: Player = PLAYERS[0];

  constructor(private groupService: GroupService) { }

  ngOnInit() {
    this.getPredefinedGroups();
  }

  getPredefinedGroups(): void {
    this.groupService.getPredefinedGroups()
      .subscribe(groups => this.groups = groups);
  }

  onSelect(group: Group): void {
    console.log('group selected ' + group);
    this.groupService.invokeGrouping(group);
    this.selectedGroup = group;
    this.coordinator = this.groupService.coordinator;
  }
}

import { Component, OnInit } from '@angular/core';

interface SideNavToggle {
	screenwidth: number;
	collapsed: boolean
}

@Component({
	selector: 'app-main-page',
	templateUrl: './main-page.component.html',
	styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {
	isSideNavCollapsed = true;
	screenwidth = 1920;

	constructor() {
	}

	ngOnInit(): void {
	}

	public onToggleSideNav(data: SideNavToggle): void {
		this.screenwidth = data.screenwidth;
		this.isSideNavCollapsed = data.collapsed;
	}
}

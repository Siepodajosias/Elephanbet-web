import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';

@Component({
	selector: 'app-import-online',
	templateUrl: './import-online.component.html',
	styleUrls: ['./import-online.component.scss']
})
export class ImportOnlineComponent implements OnInit {

	constructor(private messageService: MessageService) {
	}

	ngOnInit(): void {
	}

	/**
	 * Envois un message de confirmation du téléchargement.
	 */
	public onUpload(): void {
		this.messageService.add({
			key: 'notification',
			severity: 'success',
			summary: 'Import online',
			detail: 'Le fichier a été téléchargé'
		});
	}

	/**
	 * Envois un message d'erreur lorsque le téléchargement échoue.
	 */
	public onError(): void {
		this.messageService.add({
			key: 'notification',
			sticky: true,
			severity: 'error',
			summary: 'Echec',
			detail: 'Le fichier n\'a pas pu être téléchargé,' +
					' vérifiez que vous avez le bon fichier.'
		});
	}
}

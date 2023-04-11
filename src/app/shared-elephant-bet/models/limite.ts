export class Limite {
	id: number;
	code: string;
	limiteDebut: number;
	limiteFin: number;
	dateDebutLimite: string;
	dateFinLimite: string;
}

export class GroupeDate {
	id: number;
	code: string;
	groupe: string;
	dateDebutLimite: Date;
	dateFinLimite: Date;
}

export class GroupeDateDto {
	id: number;
	code: string;
	groupe: string;
	dateDebutLimite: string;
	dateFinLimite: string;
}


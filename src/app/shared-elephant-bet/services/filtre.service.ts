import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class FiltreService {
	generalChange: Subject<void> = new Subject<void>();
	premiosChange: Subject<void> = new Subject<void>();
	miseChange: Subject<void> = new Subject<void>();
	generalOnlineChange: Subject<void> = new Subject<void>();
	gainChange: Subject<void> = new Subject<void>();
	boutonProcess: Subject<void> = new Subject<void>();
}

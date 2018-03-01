import { Component, Input } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'

import { Solver } from '../solver.model'

@Component({
	selector: 'solver-form',
	templateUrl: './solverForm.component.html',
	styleUrls: ['./solverForm.component.css']
})
export class SolverFormComponent {

	@Input() solver: Solver

	solverForm: FormGroup

	constructor (private formBuilder: FormBuilder) {
		this.createForm()
	}

	createForm() {
		this.solverForm = this.formBuilder.group({
			name: [(this.solver) ? this.solver.name : '', [Validators.required, Validators.maxLength(100)]],
			version: [(this.solver) ? this.solver.version : '', Validators.maxLength(100)],
			sourcePath: [(this.solver) ? this.solver.sourcePath : '', Validators.maxLength(200)],
			executablePath: [(this.solver) ? this.solver.executablePath : '', Validators.maxLength(200)]
		})
	}

	onSubmit() {
		if (this.solverForm.dirty && this.solverForm.valid) {
				const formModel = this.solverForm.value
				console.log(formModel)
		}
	}
}

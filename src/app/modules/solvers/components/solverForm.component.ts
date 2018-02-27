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

	createForm () {
		this.solverForm = this.formBuilder.group({
			name: [(this.solver) ? this.solver.name : '', Validators.required],
			version: [(this.solver) ? this.solver.version : '', Validators.required],
			sourcePath: [(this.solver) ? this.solver.sourcePath : '', Validators.required],
			executablePath: [(this.solver) ? this.solver.executablePath : '', Validators.required]
		})
	}

	onSubmit () {
		const formModel = this.solverForm.value

		console.log(formModel)

		
	}
}

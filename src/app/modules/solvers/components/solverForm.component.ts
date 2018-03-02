import { Component, OnInit, ViewChild } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { ActivatedRoute } from '@angular/router'
import { Location } from '@angular/common'

import { Solver } from '../solver.model'
import { SolverService } from '../solver.service'
import { FileUploadComponent } from '../../../shared/components/fileUpload.component'

@Component({
	selector: 'solver-form',
	templateUrl: './solverForm.component.html',
	styleUrls: ['./solverForm.component.css']
})
export class SolverFormComponent implements OnInit {

	solver: Solver

	isLoadingResults: boolean = false

	solverForm: FormGroup

	@ViewChild('sourceInput') sourceInput: FileUploadComponent

	@ViewChild('execInput') execInput: FileUploadComponent

	constructor(
		private formBuilder: FormBuilder,
		private route: ActivatedRoute,
		private location: Location,
		private solverService: SolverService
	) {
		this.createForm()
	}

	ngOnInit() {
		let sub = this.route.params.subscribe(
			params => {
				if (params['solverID']) {
					this.isLoadingResults = true
					this.solverService.getSolver(params['solverID']).subscribe(
						data => {
							this.setFormValues(data)
							this.isLoadingResults = false
						},
						err => {
							this.isLoadingResults = false
							throw err
						}
					)
				}
			},
			err => {
				this.back()
				throw err
			}
		)
		this.sourceInput.onFileAddedToQueue.subscribe(
			file => {
				file.apiValidationStatus = 0
				this.validateFile(file.md5Hash)
			}
		)
	}

	back() {
		this.location.back()
	}

	createForm() {
		this.solverForm = this.formBuilder.group({
			name: ['', [Validators.required, Validators.maxLength(100)]],
			version: ['', Validators.maxLength(100)],
			created: [new Date(), Validators.required],
			modified: [new Date(), Validators.required]
		})
	}

	onSubmit() {
		if (this.solverForm.dirty && this.solverForm.valid) {
				let formData = new FormData()

				formData.append('name', this.solverForm.value.name)
				formData.append('version', this.solverForm.value.version)
				formData.append('created', this.solverForm.value.created)
				formData.append('modified', this.solverForm.value.modified)

				if (this.sourceInput.fileUploader.queue[0])
					formData.append('source_path', this.sourceInput.fileUploader.queue[0].file.rawFile, this.sourceInput.fileUploader.queue[0].file.rawFile.name)

				if (this.execInput.fileUploader.queue[0])
					formData.append('executable_path', this.execInput.fileUploader.queue[0].file.rawFile, this.execInput.fileUploader.queue[0].file.rawFile.name)


				this.solverService.postSolver(formData).subscribe(
					data => { console.log('success') },
					err => { console.log(err) }
				)
		}
	}

	setFormValues(data) {
		this.solverForm.setValue({
			name: data.name,
			version: data.version,
			created: data.created,
			modified: data.modified,
			source_path: data.source_path,
			executable_path: data.executable_path
		})
	}

	validateFile(fileMd5: string) {
		//check with the api there
	}
}

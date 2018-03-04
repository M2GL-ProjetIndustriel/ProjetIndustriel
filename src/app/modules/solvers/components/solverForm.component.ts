import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { ActivatedRoute } from '@angular/router'
import { Location, DatePipe } from '@angular/common'

import { Solver } from '../solver.model'
import { SolverService } from '../solver.service'
import { FileUploadComponent } from '../../../shared/components/fileUpload.component'
import { CustomFile, ApiValidationStatus } from '../../../shared/files.model'

@Component({
	selector: 'solver-form',
	templateUrl: './solverForm.component.html',
	styleUrls: ['./solverForm.component.scss']
})
export class SolverFormComponent implements OnInit, OnDestroy {

	solver: Solver

	isLoadingResults: boolean = false

	solverForm: FormGroup

	subscriptions = []

	@ViewChild('sourceInput') sourceInput: FileUploadComponent


	@ViewChild('execInput') execInput: FileUploadComponent

	sourceFile: CustomFile = null

	execFile: CustomFile = null

	constructor(
		private formBuilder: FormBuilder,
		private route: ActivatedRoute,
		private location: Location,
		private datePipe: DatePipe,
		private solverService: SolverService
	) {
		this.createForm()
	}

	ngOnInit() {
		//If it's
		this.getSolverFromParams()

		this.subscriptions.push(this.sourceInput.onFileAddedToQueue.subscribe(
			file => {
				this.sourceFile = file
				this.validateFile(file.md5Hash)
			}
		))
		this.subscriptions.push(this.sourceInput.onFileAddedToQueue.subscribe(
			file => {
				this.execFile = file
				this.validateFile(file.md5Hash)
			}
		))
	}

	ngOnDestroy() {
		this.subscriptions.forEach((sub) => {
			sub.unsubscribe()
		})
	}

	getSolverFromParams() {
		this.subscriptions.push(this.route.params.subscribe(
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
		))
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

				console.log(this.datePipe.transform(this.solverForm.value.modified, 'yyyy-MM-ddThh:mm'))

				formData.append('name', this.solverForm.value.name)
				formData.append('version', this.solverForm.value.version)
				formData.append('created', this.datePipe.transform(this.solverForm.value.created, 'yyyy-MM-ddThh:mm'))
				formData.append('modified', this.datePipe.transform(this.solverForm.value.modified, 'yyyy-MM-ddThh:mm'))

				if (this.sourceFile)
					formData.append('source_path', this.sourceFile.file, this.sourceFile.file.name)

				if (this.execFile)
					formData.append('executable_path', this.execFile.file, this.execFile.file.name)


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
			modified: data.modified
		})
	}

	validateFile(fileMd5: string) {
		//check with the api there
	}
}

import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router'
import { Location, DatePipe } from '@angular/common'

import { SolverService } from '../solver.service'
import { FileUploadComponent } from '../../../shared/components/fileUpload.component'
import { CustomFile, ApiValidationStatus } from '../../../shared/files.model'

/**
 * SolverForm Component, form to add or edit a solver.
 *
 * Composed of a clasic form with inputs and 2 {@link FileUploadComponent} to
 * upload files along the form.
 */
@Component({
	selector: 'solver-form',
	templateUrl: './solverForm.component.html',
	styleUrls: ['./solverForm.component.scss']
})
export class SolverFormComponent implements OnInit, OnDestroy {
	/**
	 * Whether or not we're editing a solver. Default to false (adding a solver).
	 */
	isEdit: boolean = false
	/**
	 * Id of the solver that is being edited, if it's not an edit this attribute
	 * should not be used.
	 */
	solverID: string
	/**
	 * Whether or not a http request is ongoing.
	 */
	isLoadingResults: boolean = false
	/**
	 * Reference to the form.
	 */
	solverForm: FormGroup
	/**
	 * Subscriptions of the component.
	 */
	subscriptions = []
	/**
	 * Reference to the FileUploadComponent holding the source files of the
	 * solver.
	 */
	@ViewChild('sourceInput') sourceInput: FileUploadComponent
	/**
	 * Reference to the FileUploadComponent holding the executable file of the
	 * solver.
	 */
	@ViewChild('execInput') execInput: FileUploadComponent
	/**
	 * Reference to the source file extracted from the FileUploadComponent.
	 */
	sourceFile: CustomFile = null
	/**
	 * Reference to the executable file extracted from the FileUploadComponent.
	 */
	execFile: CustomFile = null
	/**
	 * Value of the progress bar (0-100).
	 */
	progressValue: number = 0

	/**
	 * Constructor, create the form.
	 * @param formBuilder   FormBuilder injection.
	 * @param route         ActivatedRoute injection.
	 * @param router        Router injection.
	 * @param location      Location injection.
	 * @param datePipe      DatePipe injection (to format dates).
	 * @param solverService SolverService injection.
	 */
	constructor(
		private formBuilder: FormBuilder,
		private route: ActivatedRoute,
		private router: Router,
		private location: Location,
		private datePipe: DatePipe,
		private solverService: SolverService
	) {
		this.createForm()
	}

	/**
	 * Setup everything needed on init.
	 *
	 * Check if it's an edit or addition and subscribe to the EventEmitter of
	 * both FileUploadComponent.
	 */
	ngOnInit() {
		//Check if it's an edit or an addition
		this.checkIfIsEdit()

		//Sub to the source file FileUploadComponent to get the file uploaded
		this.subscriptions.push(this.sourceInput.onFileAddedToQueue.subscribe(
			file => {
				this.sourceFile = file
				this.validateFile(file.md5Hash)
			}
		))
		//Sub to the exec file FileUploadComponent to get the file uploaded
		this.subscriptions.push(this.execInput.onFileAddedToQueue.subscribe(
			file => {
				this.execFile = file
				this.validateFile(file.md5Hash)
			}
		))
	}

	/**
	 * Unsubscribe of all subscriptions on destory to prevent memory leaks.
	 */
	ngOnDestroy() {
		this.subscriptions.forEach((sub) => {
			sub.unsubscribe()
		})
	}

	/**
	 * Check if it's an edit or an addition by tryong to get the ':solverID'
	 * params in the route, if no param ':solverID' was found it's not an edit,
	 * otherwise if a ':solverID' is found it mean it's an edit and will set to
	 * true the 'isEdit' flag and call getSolverToEdit to, you guessed it, get
	 * the solver to edit.
	 *
	 * If there's an error call back to go back to the precedent route.
	 */
	checkIfIsEdit() {
		this.subscriptions.push(this.route.params.subscribe(
			params => {
				//if params found mean its an edit
				if (params['solverID']) {
					this.isEdit = true
					this.solverID = params['solverID']
					this.getSolverToEdit(this.solverID)
				}
			},
			err => {
				this.back()
				throw err
			}
		))
	}

	/**
	 * Call the solverService to get the solver to edit, then call
	 * getSolverToEditFiles to get the files of the solver.
	 *
	 * If there's an error call back to go back to the precedent route.
	 * @param  solverID Id of the solver.
	 */
	getSolverToEdit(solverID: string) {
		this.isLoadingResults = true
		this.solverService.getSolver(solverID).subscribe(
			data => {
				this.setFormValues(data)
				this.getSolverToEditFiles(data)
			},
			err => {
				this.back()
				throw err
			}
		)
	}

	/**
	 * Call the solverService to retrieve the file of the solver (if present)
	 * and add them to the corresponding FileUploadComponent.
	 * @param  data Data containing infos on the solver.
	 */
	getSolverToEditFiles(data: any) {
		if (data.source_path)
			this.solverService.getSolverFile(data.source_path).subscribe(
				(blob: Blob) => {
					this.sourceInput.onFileAdded(null, new File([blob], data.source_path.split('/').pop()))
					this.isLoadingResults = false
				},
				err => {
					this.isLoadingResults = false
					throw err
				})

		if (data.executable_path)
			this.solverService.getSolverFile(data.executable_path).subscribe(
				(blob: Blob) => {
					this.execInput.onFileAdded(null, new File([blob], data.executable_path.split('/').pop()))
					this.isLoadingResults = false
				},
				err => {
					this.isLoadingResults = false
					throw err
				})

		if(!data.source_path && !data.executable_path)
			this.isLoadingResults = false
	}

	/**
	 * Use location to go back to the previous route.
	 */
	back() {
		this.location.back()
	}

	/**
	 * Use FormBuilder to create the form with default values and validators.
	 */
	createForm() {
		this.solverForm = this.formBuilder.group({
			name: ['', [Validators.required, Validators.maxLength(100)]],
			version: ['', Validators.maxLength(100)],
			created: [new Date(), Validators.required],
			modified: [new Date(), Validators.required]
		})
	}

	/**
	 * When the form is submited, check if the form is valid and call the
	 * appropriate function if it's an edit or an addition.
	 */
	onSubmit() {
		if (this.solverForm.valid) {
			if (this.isEdit)
				this.editSolver()
			else
				this.addSolver()
		}
	}

	/**
	 * Set the values of the solverForm from data given as an argument.
	 * @param  data Data containing infos on a solver.
	 */
	setFormValues(data) {
		this.solverForm.setValue({
			name: data.name,
			version: data.version,
			created: data.created,
			modified: data.modified
		})
	}

	/**
	 * Build a FormData object from the solverForm FormGroup and the files
	 * uploaded as long as they are valid files.
	 * @return FormData object.
	 */
	buildFormData(): FormData {
		let formData = new FormData()

		formData.append('name', this.solverForm.value.name)
		formData.append('version', this.solverForm.value.version)
		formData.append('created', this.datePipe.transform(this.solverForm.value.created, 'yyyy-MM-ddThh:mm'))
		formData.append('modified', this.datePipe.transform(this.solverForm.value.modified, 'yyyy-MM-ddThh:mm'))

		//add check api logic
		//if (this.sourceFile && this.sourceFile.apiValidationStatus === ApiValidationStatus.Validated)
		if (this.sourceFile)
			formData.append('source_path', this.sourceFile.file, this.sourceFile.file.name)

		if (this.execFile)
			formData.append('executable_path', this.execFile.file, this.execFile.file.name)

		return formData
	}

	validateFile(fileMd5: string) {
		//check with the api there
	}

	/**
	 * Call the solverService to add a solver. On success redirect to the newly
	 * created solver details page.
	 */
	addSolver() {
		this.isLoadingResults = true
		this.solverService.postSolver(this.buildFormData(), this.onProgressUpdate).subscribe(
			data => this.router.navigate(['/solver/', data.id]),
			err => {
				this.isLoadingResults = false
				throw err
			}
		)
	}

	/**
	 * Call the solverService to edit a solver. On success redirect to the
	 * edited solver details page.
	 */
	editSolver() {
		this.isLoadingResults = true
		this.solverService.editSolver(this.buildFormData(), this.solverID, this.onProgressUpdate).subscribe(
			data => this.router.navigate(['/solver/', data.id]),
			err => {
				this.isLoadingResults = false
				throw err
			}
		)
	}

	onProgressUpdate(message: any) {
		if (typeof message === 'number') {
			this.progressValue = message
			console.log(this.progressValue)

		}
		else
			console.log(message)
	}
}

import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router'
import { Location } from '@angular/common'

import { BehaviorSubject } from 'rxjs/BehaviorSubject'

import { ExperimentService } from '../experiment.service'
import { ResultMeasurementsFactory, ExperimentResults } from '../experimentResults.model'
import { FileUploadComponent } from '../../../shared/components/fileUpload.component'
import { CustomFile } from '../../../shared/files.model'
import { CSVParserService } from '../../../shared/csvParser.service'

/**
 * ExperimentForm Component, form to add or edit an experiment.
 *
 * Composed of a clasic form with inputs and 2 {@link FileUploadComponent} to
 * upload files along the form.
 */
@Component({
	selector: 'experiment-form',
	templateUrl: './experimentForm.component.html',
	styleUrls: ['./experimentForm.component.scss']
})
export class ExperimentFormComponent implements OnInit, OnDestroy {
	/**
	 * Whether or not we're editing an experiment. Default to false (adding an
	 * experiment).
	 */
	isEdit: boolean = false
	/**
	 * Id of the experiment that is being edited, if it's not an edit this
	 * attribute should not be used.
	 */
	experimentID: string
	/**
	 * Whether or not an http request is ongoing.
	 */
	isLoadingResults: boolean = false
	/**
	 * Form reference.
	 */
	experimentForm: FormGroup
	/**
	 * Subscriptions of the component.
	 */
	subscriptions = []
	/**
	 * Reference to the FileUploadComponent holding the csv file containing the
	 * features of the experiment.
	 */
	@ViewChild('csvInput') csvInput: FileUploadComponent
	/**
	 * Reference to the csv file extracted from the FileUploadComponent.
	 */
	csvFile: CustomFile = null

	csvFileUploaded: boolean = false

	private exprimentResultsStream: BehaviorSubject<ExperimentResults> = new BehaviorSubject<ExperimentResults>(null)

	//@ViewChild('experimentResults') experimentResults: any

	/**
	 * Constructor, create the form.
	 * @param formBuilder       FormBuilder injection.
	 * @param route             ActivatedRoute injection.
	 * @param router            Router injection.
	 * @param location          Location injection.
	 * @param csvParser         CSVParserService injection.
	 * @param experimentService ExperimentService injection.
	 */
	constructor(
		private formBuilder: FormBuilder,
		private route: ActivatedRoute,
		private router: Router,
		private location: Location,
		private csvParser: CSVParserService,
		private experimentService: ExperimentService
	) {
		this.createForm()
	}

	/**
	 * Setup everything needed on init.
	 *
	 * Check if it's an edit or addition and subscribe to the EventEmitter of
	 * the FileUploadComponent.
	 */
	ngOnInit() {
		//Check if it's an edit or an addition
		this.checkIfIsEdit()

		//Sub to the csv file FileUploadComponent to get the file uploaded
		this.subscriptions.push(this.csvInput.onFileAddedToQueue.subscribe(
			file => this.onFileAdded(file)
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
	 * Check if it's an edit or an addition by trying to get the ':experimentID'
	 * params in the route, if no param ':experimentID' was found it's not an
	 * edit, otherwise if a ':experimentID' is found it mean it's an edit and will
	 * set to true the 'isEdit' flag and call getExperimentToEdit to, you guessed
	 * it, get the experiment to edit.
	 *
	 * If there's an error call back to go back to the precedent route.
	 */
	checkIfIsEdit() {
		this.subscriptions.push(this.route.params.subscribe(
			params => {
				//if params found mean its an edit
				if (params['experimentID']) {
					this.isEdit = true
					this.experimentID = params['experimentID']
					this.getExperimentToEdit(this.experimentID)
				}
			},
			err => {
				this.back()
				throw err
			}
		))
	}

	/**
	 * Call the experimentService to get the experiment to edit.
	 *
	 * If there's an error call back to go back to the precedent route.
	 * @param  experimentID Id of the experiment.
	 */
	getExperimentToEdit(experimentID: string) {
		this.isLoadingResults = true
		this.experimentService.getExperiment(experimentID).subscribe(
			data => {
				this.setFormValues(data)
			},
			err => {
				this.back()
				throw err
			}
		)
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
		this.experimentForm = this.formBuilder.group({
			name: ['', [Validators.required, Validators.maxLength(100)]],
			date: [new Date(), Validators.required],
			solver_parameters: ['', Validators.maxLength(200)],
			solver: ['', Validators.required],
			device: ['', Validators.maxLength(200)],
			description: ['', Validators.maxLength(400)]
		})
	}

	/**
	 * Set the values of the experimentForm from data given as an argument.
	 * @param  data Data containing infos on an experiment.
	 */
	setFormValues(data) {
		this.experimentForm.setValue({
			name: data.name,
			date: data.date,
			solver_parameters: data.solver_parameters,
			solver: data.solver,
			device: data.device,
			description: data.description
		})
		//might need to convert data beforehand
		//this.exprimentResultsStream.next(data.features)
	}

	/**
	 * When the form is submited, check if the form is valid and call the
	 * appropriate function if it's an edit or an addition.
	 */
	onSubmit() {
		if (this.experimentForm.valid) {
			let data = this.experimentForm.value
			this.exprimentResultsStream.subscribe(
				results => {
					data.values = results.toArray()
					console.log(data)

					/*if (this.isEdit)
						this.editExperiment(data)
					else
						this.addExperiment(data)*/
				},
				err => { throw err }
			)
		}
	}


	/**
	 * Call the experimentService to add an experiment. On success redirect to the newly
	 * created experiment details page.
	 */
	addExperiment(data: any) {
		this.isLoadingResults = true
		this.experimentService.postExperiment(data).subscribe(
			data => this.router.navigate(['/experiment/', data.id]),
			err => {
				this.isLoadingResults = false
				throw err
			}
		)
	}

	/**
	 * Call the experimentService to edit an experiment. On success redirect to the
	 * edited experiment details page.
	 */
	editExperiment(data: any) {
		this.isLoadingResults = true
		this.experimentService.editExperiment(data, this.experimentID).subscribe(
			data => this.router.navigate(['/experiment/', data.id]),
			err => {
				this.isLoadingResults = false
				throw err
			}
		)
	}

	private onFileAdded(file: CustomFile) {
		if (this.csvParser.checkFileTypeIsCSV(file.file)) {
			this.isLoadingResults = true
			this.csvFile = file
			this.csvParser.parseCSVFile(file.file,  this.onFileParsed.bind(this))
		}
		else
			file.remove()
	}

	private onFileParsed(result: any) {
		let data = ResultMeasurementsFactory.newFromCSV(result)

		if (data) {
			this.exprimentResultsStream.next(data)
			this.csvFileUploaded = true
		}
		else
			this.csvFile.remove()

		this.isLoadingResults = false
	}
}

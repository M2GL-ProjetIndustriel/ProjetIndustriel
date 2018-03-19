import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router'
import { Location } from '@angular/common'

import { BehaviorSubject } from 'rxjs/BehaviorSubject'

import { PapaParseService } from 'ngx-papaparse'

import { InstanceService } from '../instance.service'
import { FileUploadComponent } from '../../../shared/components/fileUpload.component'
import { CustomFile } from '../../../shared/files.model'

/**
 * InstanceForm Component, form to add or edit an instance.
 *
 * Composed of a clasic form with inputs and 2 {@link FileUploadComponent} to
 * upload files along the form.
 */
@Component({
	selector: 'instance-form',
	templateUrl: './instanceForm.component.html',
	styleUrls: ['./instanceForm.component.scss']
})
export class InstanceFormComponent implements OnInit, OnDestroy {
	/**
	 * Whether or not we're editing an instance. Default to false (adding an
	 * instance).
	 */
	isEdit: boolean = false
	/**
	 * Id of the instance that is being edited, if it's not an edit this
	 * attribute should not be used.
	 */
	instanceID: string
	/**
	 * Whether or not an http request is ongoing.
	 */
	isLoadingResults: boolean = false
	/**
	 * Form reference.
	 */
	instanceForm: FormGroup
	/**
	 * Subscriptions of the component.
	 */
	subscriptions = []
	/**
	 * Reference to the FileUploadComponent holding the csv file containing the
	 * features of the instance.
	 */
	@ViewChild('csvInput') csvInput: FileUploadComponent
	/**
	 * Reference to the csv file extracted from the FileUploadComponent.
	 */
	csvFile: CustomFile = null

	private csvFileAsArrayStream: BehaviorSubject<any> = new BehaviorSubject<any>(null)

	csvFileUploaded: boolean = false

	@ViewChild('featureTable') featureTable: any

	/**
	 * Constructor, create the form.
	 * @param formBuilder     FormBuilder injection.
	 * @param route           ActivatedRoute injection.
	 * @param router          Router injection.
	 * @param location        Location injection.
	 * @param papa            PapaParseService injection.
	 * @param instanceService InstanceService injection.
	 */
	constructor(
		private formBuilder: FormBuilder,
		private route: ActivatedRoute,
		private router: Router,
		private location: Location,
		private papa: PapaParseService,
		private instanceService: InstanceService
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
			file => {
				if (this.checkFileTypeIsCSV(file)) {
					this.isLoadingResults = true
					this.csvFile = file
					this.parseCSVFile()
				}
				else
					file.remove()
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
	 * Check if it's an edit or an addition by trying to get the ':instanceID'
	 * params in the route, if no param ':instanceID' was found it's not an
	 * edit, otherwise if a ':instanceID' is found it mean it's an edit and will
	 * set to true the 'isEdit' flag and call getInstanceToEdit to, you guessed
	 * it, get the instance to edit.
	 *
	 * If there's an error call back to go back to the precedent route.
	 */
	checkIfIsEdit() {
		this.subscriptions.push(this.route.params.subscribe(
			params => {
				//if params found mean its an edit
				if (params['instanceID']) {
					this.isEdit = true
					this.instanceID = params['instanceID']
					this.getInstanceToEdit(this.instanceID)
				}
			},
			err => {
				this.back()
				throw err
			}
		))
	}

	/**
	 * Call the instanceService to get the instance to edit.
	 *
	 * If there's an error call back to go back to the precedent route.
	 * @param  instanceID Id of the instance.
	 */
	getInstanceToEdit(instanceID: string) {
		this.isLoadingResults = true
		this.instanceService.getInstance(instanceID).subscribe(
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
		this.instanceForm = this.formBuilder.group({
			name: ['', [Validators.required, Validators.maxLength(100)]],
			instance_type: ['', [Validators.required, Validators.maxLength(100)]],
			instance_family: ['', Validators.maxLength(100)],
			path: ['', Validators.maxLength(200)]
		})
	}

	/**
	 * Set the values of the instanceForm from data given as an argument.
	 * @param  data Data containing infos on an instance.
	 */
	setFormValues(data) {
		this.instanceForm.setValue({
			name: data.name,
			instance_type: data.instance_type,
			instance_family: data.instance_family,
			path: data.path
		})
		//might need to convert data beforehand
		//this.csvFileAsArrayStream.next(data.features)
	}

	/**
	 * When the form is submited, check if the form is valid and call the
	 * appropriate function if it's an edit or an addition.
	 */
	onSubmit() {
		if (this.instanceForm.valid) {
			let data = this.instanceForm.value
			data.values = this.toBackendFormat(this.featureTable.dataSource.data)

			console.log(data)

			if (this.isEdit)
				this.editInstance(data)
			else
				this.addInstance(data)
		}
	}


	/**
	 * Call the instanceService to add an instance. On success redirect to the newly
	 * created instance details page.
	 */
	addInstance(data: any) {
		this.isLoadingResults = true
		this.instanceService.postInstance(data).subscribe(
			data => this.router.navigate(['/instance/', data.id]),
			err => {
				this.isLoadingResults = false
				throw err
			}
		)
	}

	/**
	 * Call the instanceService to edit an instance. On success redirect to the
	 * edited instance details page.
	 */
	editInstance(data: any) {
		this.isLoadingResults = true
		this.instanceService.editInstance(data, this.instanceID).subscribe(
			data => this.router.navigate(['/instance/', data.id]),
			err => {
				this.isLoadingResults = false
				throw err
			}
		)
	}

	private checkFileTypeIsCSV (file: CustomFile): boolean {
		let mime_type = file.file.type

		if (mime_type === 'text/plain' || mime_type === 'text/csv'
			|| mime_type === 'application/csv' || mime_type === 'application/x-csv'
			|| mime_type === 'text/x-csv' || mime_type === 'application/vnd.ms-excel')
			return true
		return false
	}

	private parseCSVFile() {
		let reader = new FileReader()
		reader.onloadend = () => {
			this.papa.parse(reader.result, {
				complete: (result) => {
					let data = {
						headers: result.data.slice(0, 1)[0],
						data: result.data.slice(1)
					}
					//check
					if (this.isValidCSV(this.normalizeHeader(data.headers))) {
						//convert & normalize
						data.data = this.convertData(data.data)
						this.csvFileAsArrayStream.next(data)
						this.csvFileUploaded = true
					}
					else
						this.csvFile.remove()

					this.isLoadingResults = false
				}
			})
		}
		reader.readAsText(this.csvFile.file)
	}

	//convert
	private convertData(data) {
		let result = []
		for (let i in data) {
			result[i] = {}
			for (let j in data[i]) {
				result[i]['name'] = data[i][0]
				result[i]['value'] = data[i][1]
				result[i]['unit'] = data[i][2] || ''
			}
		}
		return result
	}

	private isValidCSV(headers): boolean {
		if (headers.length !== 3)
			return false
		if (headers[0] !== 'name' || headers[1] !== 'value' || headers[2] !== 'unit')
			return false

		return true
	}

	private normalizeHeader(headers) {
		for (let i in headers)
			headers[i] = headers[i].replace(/ /g, '').toLowerCase()
		return headers
	}

	private toBackendFormat(data) {
		let result = []
		for (let i in data) {
			result[i] = {}
			for (let j in data[i]) {
				result[i]['value'] = data[i]['value']
				result[i]['feature'] = {
					'name': data[i]['name'],
					'unit': data[i]['unit']
				}
			}
		}
		return result
	}
}

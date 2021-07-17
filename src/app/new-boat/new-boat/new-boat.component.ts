import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {BoatsService} from '@app/_services';
import {Router} from '@angular/router';

@Component({
  selector: 'boats-new-boat',
  templateUrl: './new-boat.component.html',
  styleUrls: ['./new-boat.component.css']
})
export class NewBoatComponent implements OnInit {
  newBoatForm: FormGroup;
  submitted = false;

  constructor(private formBuilder: FormBuilder,
              private boatsService: BoatsService,
              private router : Router) { }

  ngOnInit() {
    this.newBoatForm = this.formBuilder.group({
      name: ['', Validators.required],
      shipyardName: ['', Validators.required],
      country: ['', Validators.required],
      model: ['', [Validators.required]],
      year: ['', Validators.required],
      size: ['', [Validators.required, Validators.pattern('[0-9]+')] ],
      type: ['', Validators.required]
    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.newBoatForm.controls; }

  onReset() {
    this.submitted = false;
    this.newBoatForm.reset();
  }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.newBoatForm.invalid) {
        return;
    }

    // @todo: call boats api to add the newly created boat.
    // after a successfull call, redirect to view boats component.

    this.boatsService.addBoat(this.newBoatForm.value).subscribe(response => {
        console.log(response);
        if(response){
  this.router.navigateByUrl('/view');
}

      },
      error => {
        console.log(error);
      });

  }
}

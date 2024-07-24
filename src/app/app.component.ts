import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { jsPDF } from 'jspdf';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  formData: FormGroup; // Form data object

  @ViewChild('reportContent')
  public reportContent!: ElementRef;
  public pdfContent: string = '';
  public isPreview: boolean = false;
  constructor() {
    this.formData = new FormGroup({
      name: new FormControl(''), // Default name
      email: new FormControl(''), // Default email
    });
  }

  public preview(): void {
    const doc = new jsPDF('p', 'pt', 'A4');
    const content = this.reportContent.nativeElement;
    doc.html(content, {
      margin: [0, 30],
    });
    doc.setProperties({
      title: 'preview.pdf',
    });
    //using setTimeout because the PDF generation process is asynchronous so before generating the pdf its getting save
    setTimeout(() => {
      doc.output('dataurlnewwindow');
      //If we want to show the preview with url use below two lines instead of the above one.
      //const dataUrl = doc.output('bloburl');
      //window.open(dataUrl, '_blank');
    }, 1000);
  }

  public save(): void {
    const doc = new jsPDF('p', 'pt', 'A4');
    const content = this.reportContent.nativeElement;
    setTimeout(() => {
      const pdfBlob: Blob = doc.output('blob'); // Convert PDF to Blob

      // Create a File object from the Blob
      const file = new File([pdfBlob], 'preview.pdf', {
        type: 'application/pdf',
      });
      console.log(file);
    }, 1000);
  }

  public downloadPdf(): void {
    const doc = new jsPDF('p', 'pt', 'A4');
    const content = this.reportContent.nativeElement;
    doc.html(content, {
      margin: [0, 30],
    });
    //using setTimeout because the PDF generation process is asynchronous so before generating the pdf its getting save
    setTimeout(() => {
      doc.save('preview.pdf');
    }, 1000);
  }
}

import { Component } from '@angular/core';
import { FormBuilder,FormGroup,Validators } from '@angular/forms';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent {

  productForm:FormGroup;
  public selectedFile!: File;
  constructor(
    private fb:FormBuilder,
    private productService:ProductService
  ){

    this.productForm=this.fb.group({

      name:['',Validators.required],
      category:['',Validators.required],
      brand:[''],
      features:[''],
      price:[''],
      description:[''],
      provider:['openai']  
    });

  }

// generateDescription(){

//   if(this.productForm.invalid){
//     alert("Fill required fields");
//     return;
//   }

//   this.productService.generateDescription(this.productForm.value)
//   .subscribe((res:any)=>{

//     this.productForm.patchValue({
//       description:res.description
//     });

//   });

// }

generateDescription(){

  const formData = new FormData();

  Object.keys(this.productForm.value).forEach(key => {
    formData.append(key, this.productForm.value[key]);
  });

  if(this.selectedFile){
    formData.append("image", this.selectedFile);
  }

  this.productService.generateDescription(formData)
  .subscribe((res:any)=>{
    this.productForm.patchValue({
      description: res.description
    });
  });

}

saveProduct(){

  this.productService.saveProduct(this.productForm.value)
  .subscribe(()=>{

    alert("Product Saved");

    this.productForm.reset();

  });

}

onFileChange(event:any){
  this.selectedFile = event.target.files[0];
}

}
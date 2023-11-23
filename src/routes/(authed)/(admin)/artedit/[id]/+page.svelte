<script lang="ts">

    import { Enviroment, ModelController, PageLoader } from '$lib/lib.js';
    import Loader from '$lib/components/loader.svelte';
    import MyAlert from '$lib/components/myAlert.svelte';
    import MyImg from '$lib/components/myImg.svelte';
    import { onMount } from 'svelte';


    export let form;
    export let data;


    let idField: HTMLParagraphElement;
    let nameVal: string;
    let descVal: string;
    let dimVal: number;
    let currFileVal: string;
    let activeVal: boolean;

    let nameInput: HTMLInputElement;
    let descInput: HTMLTextAreaElement;
    let updBtn: HTMLButtonElement;


    let fileInput: HTMLInputElement;
    let fileNameInput: HTMLInputElement;
    let btnInput: HTMLButtonElement;
    let fileErr: HTMLDivElement;

    const id: string = data.id == null ? "1" : data.id;
    
    let isUpdating: boolean = false;
    let showUpdateAlert: boolean = false;
    let isSuccessUpdateAlert: boolean = false;
    let updateAlertText: string = "";


    let isUploading: boolean = false;
    let showFileAlert: boolean = false;
    let isSuccessFileAlert: boolean = false;
    let fileAlertText: string = "";

    
    $: isFetching = form == null;
    $: article = form == null ? {} : form.res_a.DATA[0];
    $: models = form == null ? [] : form.res_b.DATA;

    $: {
        if(idField != null){
            idField.innerHTML = article.c01;
        }
    }

    $: {
        if(form != null){
            setData();
        }
    }


    function setData(){
        nameVal = article.c02;
        descVal = article.c03;
        dimVal = article.c05;
        currFileVal = article.c04;
        activeVal = article.c06;
    }




    onMount(async () =>{
        
        const fd = new FormData();
        fd.append("id", id);

        const url = `${Enviroment.ROOT_URL}/artedit/[id]?/loadData`;

        PageLoader.fetchData(fd, url);
        
    });


    //0 - ok, 2 - no file. 3 - file ext err
    function checkFile(){

        const file = fileInput.files![0];
        if(file == undefined){
            return 2;
        }
        const ext = file.name.split(".").pop();
        if(!ModelController.EXTENTIONS.includes(ext!)){
            return 3;
        }
        return 0;
    }

    function checkFileName(){
        const ext = fileNameInput.value.split(".").pop();
        if(!ModelController.EXTENTIONS.includes(ext!)){
            return 1;
        }
        return 0;
    }


    // 0 - ok, 1 - name err, 2 - no file, 3 - file ext err
    function validateFileForm(){

        fileNameInput.classList.remove("is-invalid");
        fileInput.classList.remove("is-invalid");

        if(nameVal.trim() == "" || checkFileName() == 1){
            return 1;
        }
        else {
            return checkFile();
        }
    }

    function resetForm(){
        fileInput.value = "";
        fileNameInput.value = "";

        isUploading = false;

    }




    async function uploadDefModel(){

        const check: number = validateFileForm();

        switch (check) {

            case 1:
                fileNameInput.classList.add("is-invalid");
                break;

            case 2:
                fileErr.innerHTML = "Please select a file to upload";
                fileInput.classList.add("is-invalid");
                break;

            case 3:
                fileErr.innerHTML = `You can only upload ${ModelController.EXTENTIONS} files`;
                fileInput.classList.add("is-invalid");
                break;



            case 0:

                btnInput.disabled = true;
                isUploading = true;

                const fData: FormData = new FormData();
                fData.append('file', fileInput.files![0]);
                fData.append('fileName', fileNameInput.value);
                fData.append('aid', id);

                const url = `${Enviroment.ROOT_URL}/upload?/article`;


                const headers: Headers = new Headers();
                headers.set('Content-Type', 'multipart/form-data');
                headers.set('Accept', 'multipart/form-data');

                const request: RequestInfo = new Request(url, {
                    method: 'POST',
                    body: fData,
                });

                const response = await fetch(request);
                const res = await response.json();
                

                if(res.err){
                    displayFileAlert("Error: " + res.message, false);
                }
                else {
                    isUploading = false;

                    displayFileAlert("Upload successful", true);

                    currFileVal = fileNameInput.value;

                    resetForm();
                }
                break;
    }


}












    // 0 - ok, 1 - name err, 2 - desc err
    function validateUpdateForm(){

        nameInput.classList.remove("is-invalid");
        descInput.classList.remove("is-invalid");

        if(nameVal.trim() == ""){
            return 1;
        }
        else if(descVal.trim() == ""){
            return 2;
        }
        else {
            return 0
        }
    }


    async function updateArticle(){

        const check: number = validateUpdateForm();

        switch (check) {

            case 1:
                nameInput.classList.add("is-invalid");
                break;

            case 2:
                descInput.classList.add("is-invalid");
                break;

            case 0:
                updBtn.disabled = true;
                isUpdating = true;

                const fData: FormData = new FormData();
                fData.append('aid', id);
                fData.append('aName', nameVal);
                fData.append('aDesc', descVal);
                fData.append('aDimId', dimVal.toString());
                fData.append('aActive', activeVal ? "1" : "0");
                


                const url = `${Enviroment.ROOT_URL}/update?/article`;


                const headers: Headers = new Headers();
                headers.set('Content-Type', 'application/json');
                headers.set('Accept', 'application/json');

                const request: RequestInfo = new Request(url, {
                    method: 'POST',
                    body: fData,
                });

                const response = await fetch(request);
                const res = await response.json();
                

                if(res.err){
                    displayUpdateAlert("Error: " + res.message, false);
                }
                else {
                    isUpdating = false;
                    displayUpdateAlert("Successfully updated the article", true);

                }
                break;
        }


    }

    function displayUpdateAlert(txt: string, success: boolean ){
        isSuccessUpdateAlert = success;
        updateAlertText = txt;
        showUpdateAlert = true;
    }

    function displayFileAlert(txt: string, success: boolean ){
        isSuccessFileAlert = success;
        fileAlertText = txt;
        showFileAlert = true;
    }


</script>




<!-- Product section-->
<section class="py-5">
    <div class="container px-4 px-lg-5 my-5">
        <div class="my-3">
            <a class="btn btn-outline dark btn-lg" href="{Enviroment.ROOT_URL}/browse/{id}">
                <i class="bi bi-arrow-left" aria-hidden="true"></i>
            </a>
        </div>
        {#if isFetching}
            <Loader />
        {:else}
        <div class="row gx-4 gx-lg-5 align-items-center">
            <div class="card ">

                <div class='card-header'>
                        <div class='row '>
                            <!-- svelte-ignore a11y-label-has-associated-control -->
                            <label class='col-sm-2 col-form-label'>ID:</label>
                            <!-- svelte-ignore a11y-label-has-associated-control -->
                            <p class='col-sm-10 col-form-label' bind:this={idField}></p>
                        </div>
                </div>

                <div class='card-body'>
                    <form > 
                        
                        <div class='row mb-2'> 
                            <label for='nf' class='col-sm-2 col-form-label'>Name:</label> 
                            <div class='col-sm-5'> 
                                <div class='input-group'> 
                                    <input id='nf' type='text' class='form-control' bind:this={nameInput} bind:value={nameVal}> 

                                    <div class='invalid-feedback'>  
                                        Enter a valid name
                                    </div>  
        
                                </div> 
                            </div> 
                        </div> 

                        <div class='row mb-2'> 
                            <label for='desc' class='col-sm-2 col-form-label'>Description:</label> 
                            <div class='col-sm-7'> 
                                <div class='input-group'> 
                                    <textarea class="form-control" id="desc" maxlength="100" bind:this={descInput} bind:value={descVal}></textarea> 

                                    <div class='invalid-feedback'>  
                                        Enter a valid description
                                    </div>  
        
                                </div> 
                            </div> 
                        </div> 
                        <div class='row mb-2'> 
                            <div class='col-sm-2'></div> 
                            <div class='col-sm-7'> 
                                <div id="text" class="form-text">Max. 100 characters...</div>
                            </div> 
                        </div>
                        
                        


                        <hr class= 'mt-4 mb-4'> 
        
                        <div class='row mb-2'> 
                            <label for='dim' class='col-sm-2 col-form-label'>Dimensions:</label> 
        
                            <div class='col-sm-3'> 
                                <div class='input-group'> 
                                    <select id='dim' class='form-select'  bind:value={dimVal}></select> 
                                </div> 
                            </div> 
        
                        </div> 
        
                        <div class='row mb-2'> 

                            <label for='fn' class='col-sm-2 col-form-label'>Default file name:</label> 
        
                            <div class='col-sm-5'> 
                                <div class='input-group'> 
                                    <input id='fn' type='text' class='form-control'  bind:value={currFileVal} disabled> 
        
                                </div> 
                            </div> 
        
                        </div> 
        
                        <hr class= 'mt-4 mb-4'>
                        
                        <div class='row mb-2'> 
        
                            <label for='act' class='col-sm-2 col-form-label'>Active:</label> 

                            <div class='col-sm-4 form-check form-switch'> 
                                <input id='act' type='checkbox' class='form-check-input' role='switch' bind:checked={activeVal}/> 
                            </div> 
                        </div> 
        
                    </form>
                </div>
            </div>


            <div class="card-footer p-4 bg-transparent">
                {#if !isUpdating}
                    <button class="btn btn-outline-dark mt-auto" bind:this={updBtn} on:click={updateArticle}>Edit</button>
                {:else}
                    <div class="spinner-border text-primary" role="status">
                        <span class="visually-hidden">Loading...</span>
                    </div>
                {/if}
                
            </div>

            <div class="mt-2">
                {#if showUpdateAlert}
                    <MyAlert txt={updateAlertText} isSuccess={isSuccessUpdateAlert}/> 
                {/if}
            </div>

        </div>
        {/if}
    </div>
</section>

<!-- New model section -->
<section class="py-5 bg-light">
    <div class="container px-4 px-lg-5 mt-5">
        {#if isFetching}
            <div class="col mb-5 d-flex justify-content-center">
                <div class="spinner-grow" role="status">
                    <span class="visually-hidden">Loading...</span>
                </div>
            </div>
        {:else}
            <h2 class="fw-bolder mb-4">Upload new default model:</h2>

            <form>
                <div class="row">
                    <div class="mb-3 col-md-6">
                        <label for="name" class="form-label">File name</label>
                        <input type="text" class="form-control" id="name" aria-describedby="name" bind:this={fileNameInput}>
                        <div id="text" class="form-text">Include the extention</div>
                        <div class="invalid-feedback">
                            Please enter a valid name (check the extention).
                        </div>
                    </div>

                    <div class="mb-3 col-md-6">
                        <label for="file" class="form-label">Model file</label>
                        <input class="form-control" type="file" id="file" bind:this={fileInput}>
                        <div id="text" class="form-text">File has to be a {ModelController.EXTENTIONS} file</div>
                        <div class="invalid-feedback" bind:this={fileErr}></div>
                    </div>
                </div>
                {#if !isUploading}
                    <button type="button" class="btn btn-primary" bind:this={btnInput} on:click={uploadDefModel} >Upload</button>
                {:else}
                    <div class="spinner-border text-primary" role="status">
                        <span class="visually-hidden">Loading...</span>
                    </div>
                {/if}
            </form>
            <div class="mt-2">
            {#if showFileAlert}
                <MyAlert txt={fileAlertText} isSuccess={isSuccessFileAlert}/> 
            {/if}
            </div>


        {/if}
        
    </div>
</section>



<!-- Related items section-->
<section class="py-5 bg-light">
    <div class="container px-4 px-lg-5 mt-5">
        {#if isFetching}
            <div class="col mb-5 d-flex justify-content-center">
                <div class="spinner-grow" role="status">
                    <span class="visually-hidden">Loading...</span>
                </div>
            </div>
        {:else if models.length == 0}
            <h2 class="fw-bolder mb-4">No ads for this article</h2>
        {:else}
            <h2 class="fw-bolder mb-4">Current possible ads</h2>
        {/if}
        
        <div class="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center">

            {#each models as {c01, c02} ,i}
                <div class="col mb-5">
                    <div class="card h-100">
                        
                        <!-- Product image-->
                        <MyImg id={c01} isArticle={false}/>
                        <!-- Product details-->
                        <div class="card-body p-4">
                            <div class="text-center">
                                <!-- Product name-->
                                <h5 class="fw-bolder">{c02}</h5>

                            </div>
                        </div>
                        <!-- Product actions-->
                        <div class="card-footer p-4 pt-0 border-top-0 bg-transparent">
                            <div class="text-center"><a class="btn btn-outline-dark mt-auto" href="{Enviroment.ROOT_URL}/modeledit/{c01}">Edit</a></div>
                        </div>
                    </div>
                </div>
            {/each}
        </div>
    </div>
</section>






